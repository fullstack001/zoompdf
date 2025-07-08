export const downloadFile = async (
  fileName: string,
  action: string,
  token: string,
  navigate: (path: string) => void // Pass a navigation callback
) => {
  try {
    const response = await fetch(`https://api.pdfezy.com/api/pdf/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fileName, action }),
    });

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // Remove _time from the filename
    const sanitizedFileName = fileName.replace(/_\d+/, "");
    a.download = sanitizedFileName;

    document.body.appendChild(a);
    a.click();
    a.remove();
    navigate("/files"); // Use the navigation callback instead of window.location.href
  } catch (err) {
    console.error("Error downloading file:", err);
    window.alert("Failed to download file.");
  }
};
