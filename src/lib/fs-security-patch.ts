/**
 * Runtime FS security patch – blocks file creation outside allowed directories
 * and with suspicious names. Stops malware from writing files even when
 * triggered automatically (e.g. by a malicious dependency).
 * Loaded once at Node startup via instrumentation.ts.
 */

import * as fs from "fs";
import * as path from "path";
import { isAllowedPath, isSuspiciousFilename } from "@/middleware/file-protection";

function getPathForCheck(firstArg: unknown): string | null {
  if (typeof firstArg === "string") return firstArg;
  if (Buffer.isBuffer(firstArg)) return firstArg.toString();
  if (firstArg && typeof firstArg === "object" && "href" in firstArg) return (firstArg as URL).href;
  return null;
}

function checkPathAndThrow(filePath: string): void {
  const resolved = path.resolve(filePath);
  const name = path.basename(resolved);
  if (!isAllowedPath(resolved)) {
    const err = new Error(
      `[SECURITY] File write blocked: path not in allowed directory: ${resolved}`
    );
    (err as Error & { code: string }).code = "EFORBIDDEN";
    throw err;
  }
  if (isSuspiciousFilename(name)) {
    const err = new Error(
      `[SECURITY] File write blocked: suspicious filename: ${name}`
    );
    (err as Error & { code: string }).code = "EFORBIDDEN";
    throw err;
  }
}

export function installFsSecurityPatch(): void {
  const _writeFile = fs.writeFile;
  const _writeFileSync = fs.writeFileSync;
  const _appendFile = fs.appendFile;
  const _appendFileSync = fs.appendFileSync;
  const _createWriteStream = fs.createWriteStream;

  (fs as typeof fs & { writeFile: typeof fs.writeFile }).writeFile = function (
    pathOrFd: fs.PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView,
    optionsOrCb:
      | fs.WriteFileOptions
      | ((err: NodeJS.ErrnoException | null) => void),
    cb?: (err: NodeJS.ErrnoException | null) => void
  ) {
    if (typeof pathOrFd === "number") {
      return _writeFile.call(fs, pathOrFd, data, optionsOrCb as any, cb);
    }
    const p = getPathForCheck(pathOrFd);
    if (p) {
      try {
        checkPathAndThrow(p);
      } catch (e) {
        if (typeof optionsOrCb === "function") {
          return (optionsOrCb as (err: NodeJS.ErrnoException | null) => void)(e as NodeJS.ErrnoException);
        }
        return (cb!)(e as NodeJS.ErrnoException);
      }
    }
    return _writeFile.call(fs, pathOrFd, data, optionsOrCb as any, cb);
  };

  (fs as typeof fs & { writeFileSync: typeof fs.writeFileSync }).writeFileSync = function (
    pathOrFd: fs.PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView,
    options?: fs.WriteFileOptions
  ) {
    if (typeof pathOrFd === "number") return _writeFileSync.call(fs, pathOrFd, data, options);
    const p = getPathForCheck(pathOrFd);
    if (p) checkPathAndThrow(p);
    return _writeFileSync.call(fs, pathOrFd, data, options);
  };

  (fs as typeof fs & { appendFile: typeof fs.appendFile }).appendFile = function (
    pathOrFd: fs.PathOrFileDescriptor,
    data: string | Uint8Array,
    optionsOrCb: fs.AppendFileOptions | ((err: NodeJS.ErrnoException | null) => void),
    cb?: (err: NodeJS.ErrnoException | null) => void
  ) {
    if (typeof pathOrFd === "number") {
      return _appendFile.call(fs, pathOrFd, data, optionsOrCb as any, cb);
    }
    const p = getPathForCheck(pathOrFd);
    if (p) {
      try {
        checkPathAndThrow(p);
      } catch (e) {
        if (typeof optionsOrCb === "function") {
          return (optionsOrCb as (err: NodeJS.ErrnoException | null) => void)(e as NodeJS.ErrnoException);
        }
        return (cb!)(e as NodeJS.ErrnoException);
      }
    }
    return _appendFile.call(fs, pathOrFd, data, optionsOrCb as any, cb);
  };

  (fs as typeof fs & { appendFileSync: typeof fs.appendFileSync }).appendFileSync = function (
    pathOrFd: fs.PathOrFileDescriptor,
    data: string | Uint8Array,
    options?: fs.AppendFileOptions
  ) {
    if (typeof pathOrFd === "number") return _appendFileSync.call(fs, pathOrFd, data, options);
    const p = getPathForCheck(pathOrFd);
    if (p) checkPathAndThrow(p);
    return _appendFileSync.call(fs, pathOrFd, data, options);
  };

  (fs as typeof fs & { createWriteStream: typeof fs.createWriteStream }).createWriteStream = function (
    pathOrFd: string | number | Buffer | URL,
    options?: fs.CreateWriteStreamOptions
  ) {
    if (typeof pathOrFd !== "number") {
      const p = getPathForCheck(pathOrFd);
      if (p) checkPathAndThrow(p);
    }
    return _createWriteStream.call(fs, pathOrFd, options);
  };

  const prom = fs.promises;
  if (prom) {
    const _pWriteFile = prom.writeFile.bind(prom);
    const _pAppendFile = prom.appendFile.bind(prom);
    prom.writeFile = function (pathOrFd: fs.PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, options?: fs.WriteFileOptions) {
      if (typeof pathOrFd === "number") return _pWriteFile(pathOrFd, data, options as any);
      const p = getPathForCheck(pathOrFd);
      if (p) checkPathAndThrow(p);
      return _pWriteFile(pathOrFd, data, options as any);
    };
    prom.appendFile = function (pathOrFd: fs.PathOrFileDescriptor, data: string | Uint8Array, options?: fs.AppendFileOptions) {
      if (typeof pathOrFd === "number") return _pAppendFile(pathOrFd, data, options as any);
      const p = getPathForCheck(pathOrFd);
      if (p) checkPathAndThrow(p);
      return _pAppendFile(pathOrFd, data, options as any);
    };
  }

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "test") {
    console.log("[SECURITY] FS write protection installed – only allowed directories and safe filenames can be written.");
  }
}
