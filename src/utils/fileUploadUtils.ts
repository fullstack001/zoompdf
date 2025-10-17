import { v4 as uuidv4 } from "uuid";

export interface UploadedFile {
  id: string;
  originalName: string;
  fileName: string;
  filePath: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

class FileUploadManager {
  private uploadedFiles: Map<string, UploadedFile> = new Map();

  async uploadFile(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<UploadedFile> {
    const uploadStartTime = Date.now();
    const fileId = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${fileId}.${fileExtension}`;
    const filePath = `/uploads/${fileName}`;

    console.log(
      "╔═══════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║                     STARTING FILE UPLOAD                      ║"
    );
    console.log(
      "╚═══════════════════════════════════════════════════════════════╝"
    );
    console.log("[CLIENT] Upload initiated at:", new Date().toISOString());
    console.log("[CLIENT] File details:");
    console.log(`  ├─ Original name: ${file.name}`);
    console.log(`  ├─ File ID: ${fileId}`);
    console.log(`  ├─ Sanitized name: ${fileName}`);
    console.log(
      `  ├─ Size: ${(file.size / 1024 / 1024).toFixed(2)} MB (${
        file.size
      } bytes)`
    );
    console.log(`  ├─ Type: ${file.type}`);
    console.log(`  └─ Extension: ${fileExtension}`);

    // Create FormData to send file to server
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("fileId", fileId);

    console.log("[CLIENT] FormData prepared, initiating XMLHttpRequest...");

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let lastProgressLog = 0;
      let uploadSpeed = 0;
      let lastLoaded = 0;
      let lastTime = Date.now();

      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progressPercent = Math.round(
            (event.loaded / event.total) * 100
          );
          const currentTime = Date.now();
          const timeDiff = currentTime - lastTime;

          // Calculate upload speed (bytes per second)
          if (timeDiff > 0) {
            uploadSpeed = ((event.loaded - lastLoaded) / timeDiff) * 1000;
            lastLoaded = event.loaded;
            lastTime = currentTime;
          }

          // Call progress callback
          if (onProgress) {
            onProgress(progressPercent);
          }

          // Log progress every 1% or at completion
          if (
            progressPercent >= lastProgressLog + 1 ||
            progressPercent === 100
          ) {
            const uploadedMB = (event.loaded / 1024 / 1024).toFixed(2);
            const totalMB = (event.total / 1024 / 1024).toFixed(2);
            const speedMBps = (uploadSpeed / 1024 / 1024).toFixed(2);
            const elapsedTime = ((Date.now() - uploadStartTime) / 1000).toFixed(
              1
            );

            console.log(`[CLIENT] Upload progress: ${progressPercent}%`);
            console.log(`  ├─ Uploaded: ${uploadedMB} MB / ${totalMB} MB`);
            console.log(`  ├─ Speed: ${speedMBps} MB/s`);
            console.log(`  └─ Elapsed: ${elapsedTime}s`);

            lastProgressLog = progressPercent;
          }
        }
      });

      // Handle response
      xhr.addEventListener("load", () => {
        const totalUploadTime = Date.now() - uploadStartTime;

        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const responseData = JSON.parse(xhr.responseText);

            console.log(
              "╔═══════════════════════════════════════════════════════════════╗"
            );
            console.log(
              "║                     UPLOAD SUCCESSFUL                         ║"
            );
            console.log(
              "╚═══════════════════════════════════════════════════════════════╝"
            );
            console.log("[CLIENT] Server response:", responseData);
            console.log("[CLIENT] Upload statistics:");
            console.log(
              `  ├─ Total time: ${(totalUploadTime / 1000).toFixed(2)}s`
            );
            console.log(
              `  ├─ Average speed: ${(
                file.size /
                totalUploadTime /
                1024
              ).toFixed(2)} KB/ms`
            );
            console.log(
              `  ├─ Server processing time: ${responseData.processingTime}ms`
            );
            console.log(`  └─ File path: ${responseData.filePath}`);

            if (!responseData.success) {
              console.error(
                "[CLIENT ERROR] Server reported upload failure:",
                responseData
              );
              reject(
                new Error(responseData.error || "Upload failed on server")
              );
              return;
            }

            const uploadedFile: UploadedFile = {
              id: fileId,
              originalName: file.name,
              fileName,
              filePath,
              size: file.size,
              type: file.type,
              uploadedAt: new Date(),
            };

            this.uploadedFiles.set(fileId, uploadedFile);
            console.log("[CLIENT] File registered in upload manager");
            console.log(
              "═══════════════════════════════════════════════════════════════"
            );
            resolve(uploadedFile);
          } catch (error) {
            console.error(
              "[CLIENT ERROR] Failed to parse server response:",
              error
            );
            console.error("[CLIENT ERROR] Response text:", xhr.responseText);
            reject(new Error("Failed to parse upload response"));
          }
        } else {
          console.error(
            "╔═══════════════════════════════════════════════════════════════╗"
          );
          console.error(
            "║                      UPLOAD FAILED                            ║"
          );
          console.error(
            "╚═══════════════════════════════════════════════════════════════╝"
          );
          console.error("[CLIENT ERROR] HTTP Status:", xhr.status);
          console.error("[CLIENT ERROR] Response:", xhr.responseText);
          console.error(
            "[CLIENT ERROR] Time elapsed:",
            (totalUploadTime / 1000).toFixed(2),
            "s"
          );
          console.error(
            "═══════════════════════════════════════════════════════════════"
          );
          reject(
            new Error(
              `Failed to upload file: ${xhr.status} - ${xhr.responseText}`
            )
          );
        }
      });

      // Handle errors
      xhr.addEventListener("error", () => {
        const totalUploadTime = Date.now() - uploadStartTime;
        console.error(
          "╔═══════════════════════════════════════════════════════════════╗"
        );
        console.error(
          "║                    NETWORK ERROR                              ║"
        );
        console.error(
          "╚═══════════════════════════════════════════════════════════════╝"
        );
        console.error("[CLIENT ERROR] Network error occurred");
        console.error("[CLIENT ERROR] Status text:", xhr.statusText);
        console.error(
          "[CLIENT ERROR] Time elapsed:",
          (totalUploadTime / 1000).toFixed(2),
          "s"
        );
        console.error(
          "═══════════════════════════════════════════════════════════════"
        );
        reject(new Error("Network error during upload"));
      });

      xhr.addEventListener("abort", () => {
        const totalUploadTime = Date.now() - uploadStartTime;
        console.error(
          "╔═══════════════════════════════════════════════════════════════╗"
        );
        console.error(
          "║                    UPLOAD ABORTED                             ║"
        );
        console.error(
          "╚═══════════════════════════════════════════════════════════════╝"
        );
        console.error("[CLIENT ERROR] Upload was aborted by user or system");
        console.error(
          "[CLIENT ERROR] Time elapsed:",
          (totalUploadTime / 1000).toFixed(2),
          "s"
        );
        console.error(
          "═══════════════════════════════════════════════════════════════"
        );
        reject(new Error("Upload was aborted"));
      });

      // Send the request
      console.log("[CLIENT] Sending request to /api/upload...");
      xhr.open("POST", "/api/upload");
      xhr.send(formData);
    });
  }

  getFile(fileId: string): UploadedFile | undefined {
    return this.uploadedFiles.get(fileId);
  }

  async deleteFile(fileId: string): Promise<void> {
    console.log("[CLIENT DELETE] Attempting to delete file:", fileId);

    const file = this.uploadedFiles.get(fileId);
    if (!file) {
      console.log("[CLIENT DELETE] File not found in manager:", fileId);
      return;
    }

    console.log("[CLIENT DELETE] File details:");
    console.log(`  ├─ File ID: ${fileId}`);
    console.log(`  ├─ File name: ${file.fileName}`);
    console.log(`  └─ Original name: ${file.originalName}`);

    try {
      const deleteStartTime = Date.now();
      const response = await fetch("/api/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: file.fileName }),
      });

      const deleteTime = Date.now() - deleteStartTime;

      if (!response.ok) {
        console.error(
          "[CLIENT DELETE ERROR] Failed to delete file from server"
        );
        console.error(`  ├─ HTTP Status: ${response.status}`);
        console.error(`  └─ Time elapsed: ${deleteTime}ms`);
      } else {
        console.log("[CLIENT DELETE] File deleted from server successfully");
        console.log(`  └─ Time taken: ${deleteTime}ms`);
      }

      this.uploadedFiles.delete(fileId);
      console.log("[CLIENT DELETE] File removed from upload manager");
    } catch (error) {
      console.error("[CLIENT DELETE ERROR] Error deleting file:", error);
    }
  }

  cleanupAllFiles(): Promise<void[]> {
    const fileCount = this.uploadedFiles.size;
    console.log(`[CLIENT CLEANUP] Starting cleanup of ${fileCount} file(s)...`);

    const deletePromises = Array.from(this.uploadedFiles.keys()).map((fileId) =>
      this.deleteFile(fileId)
    );

    return Promise.all(deletePromises).then((results) => {
      console.log(
        `[CLIENT CLEANUP] Cleanup completed for ${fileCount} file(s)`
      );
      return results;
    });
  }

  getAllFiles(): UploadedFile[] {
    return Array.from(this.uploadedFiles.values());
  }
}

export const fileUploadManager = new FileUploadManager();
