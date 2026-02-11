# Security Fix - Preventing Malware File Uploads

## Problem
Unknown/malware files were appearing in your project directory when running the application. The `/api/upload` endpoint was open and unprotected, allowing attackers to upload any files.

## Solution Implemented

### 1. Authentication Required ✅
- All upload requests now require a valid JWT authentication token
- Token is validated against your API: `https://api.pdfezy.com/api/auth/validate-token`
- Unauthorized requests are rejected with 401 status

### 2. File Type Validation ✅
- Only allowed file types: PDF, Word (.doc, .docx), Excel (.xls, .xlsx), PowerPoint (.ppt, .pptx), Images (.jpg, .jpeg, .png)
- Invalid file types are rejected with 400 status

### 3. File Size Limits ✅
- Maximum file size: **100MB**
- Files exceeding this limit are rejected

### 4. Rate Limiting ✅
- Maximum **5 uploads per minute** per IP address
- Prevents automated attacks and abuse (429 when exceeded)

### 5. Filename Sanitization ✅
- Prevents path traversal attacks (`../`, `..\`, etc.)
- Only allows alphanumeric characters, dots, hyphens, and underscores
- Filenames must match UUID pattern (from fileId)
- Path validation ensures files stay within uploads directory

### 6. Uploaded Files Non-Executable ✅
- After writing, files are set to `chmod 644` on Linux so they can never be executed

### 7. Client-Side Updates ✅
- Frontend includes authentication token in upload and delete requests from `localStorage.getItem("authToken")`

## Files Involved
- `src/app/api/upload/route.ts` – auth, validation, rate limit, chmod
- `src/utils/fileUploadUtils.ts` – auth headers on upload/delete
- `src/middleware/file-protection.ts` – allowed paths and suspicious filename checks
- `src/app/api/block-file-creation/route.ts` – monitoring (localhost or secret only)

## Testing
- Unauthenticated uploads should return 401
- Invalid file types (e.g. .exe, .sh) should return 400
- More than 5 uploads per minute per IP should return 429

## Important
The upload endpoint **requires authentication**. Ensure users are logged in and `authToken` is in localStorage before uploading.
