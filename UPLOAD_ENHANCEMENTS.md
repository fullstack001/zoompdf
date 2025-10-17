# Large File Upload with Progress Logging - Implementation Summary

## Overview

Enhanced the project to support large file uploads (>200MB) with detailed progress logging in the console across all upload functions.

## Changes Made

### 1. Next.js Configuration (`next.config.js`)

- **Added**: `experimental.bodySizeLimit: '500mb'` to support files up to 500MB
- This allows the Next.js server to accept larger payloads

### 2. API Utilities Configuration (`src/utils/apiUtils.ts`)

Enhanced axios configuration and upload functions with comprehensive logging:

#### Axios Configuration:

- **Added**: `maxContentLength: 500MB` - Supports large request bodies
- **Added**: `maxBodyLength: 500MB` - Supports large file uploads
- **Added**: `timeout: 300000ms` (5 minutes) - Prevents timeout for large uploads

#### Enhanced Upload Functions:

**A. `uploadEditedPDF()` Function:**

- Detailed logging for PDF edit uploads
- Real-time progress tracking every 1%
- Upload speed calculation (MB/s)
- Total time and statistics logging
- Visual box headers for easy identification
- Logs endpoint and file details

**B. `convertFile()` Function:**
Used by ALL conversion functions with enhanced logging:

- Comprehensive file details logging
- Progress tracking with speed metrics
- Endpoint and additional data logging
- Success/failure with detailed error information

This enhancement automatically applies to:

- `convertJpgToPdf()`
- `convertWordToPdf()`
- `convertPdfToWord()`
- `convertPdfToPng()`
- `convertPngToPdf()`
- `convertPdfToPptx()`
- `convertPdfToJpg()`
- `convertPdfToExcel()`
- `convertPdfToEpub()`
- `convertEpubToPdf()`
- `compressPdf()`

### 3. Server-Side Upload API (`src/app/api/upload/route.ts`)

Enhanced the POST endpoint with comprehensive logging:

#### Features:

- **Upload Start Logging**: Logs request receipt time and file metadata
- **File Details**: Logs filename, file ID, size (in MB and bytes), and type
- **Progress Stages**:
  - Directory creation/verification
  - File reading time
  - Buffer conversion
  - Disk write speed calculation
- **Upload Statistics**: Total processing time, write speed, average speed
- **Success/Error Logging**: Clear visual separators for easy log reading

#### Enhanced DELETE endpoint:

- Logs deletion attempts with file paths
- Tracks deletion time
- Clear success/failure messages

#### Console Output Format:

```
[UPLOAD] ========== New Upload Request ==========
[UPLOAD] Request received at: 2025-10-16T...
[UPLOAD] File Details:
  - Name: large-document.pdf
  - Sanitized Name: abc-123.pdf
  - File ID: abc-123
  - Size: 250.50 MB (262,668,800 bytes)
  - Type: application/pdf
[UPLOAD] Reading file data...
[UPLOAD] File read completed in 1250ms
[UPLOAD] Converting to buffer...
[UPLOAD] Buffer created (262668800 bytes)
[UPLOAD] Writing file to disk: /path/to/uploads/abc-123.pdf
[UPLOAD] File write completed in 850ms
[UPLOAD] Write speed: 308.98 KB/ms
[UPLOAD] File verification: SUCCESS
[UPLOAD] ========== Upload Complete ==========
[UPLOAD] Total processing time: 2100ms (2.10s)
[UPLOAD] Average speed: 125.08 KB/ms
[UPLOAD] File saved: abc-123.pdf
[UPLOAD] ==========================================
```

### 4. Client-Side Upload Utilities (`src/utils/fileUploadUtils.ts`)

Enhanced the FileUploadManager class with detailed progress tracking:

#### Features:

- **Visual Progress Headers**: Box-drawn headers for easy log identification
- **Upload Speed Calculation**: Real-time MB/s speed tracking
- **Progress Intervals**: Logs every 1% progress with:
  - Uploaded/Total size in MB
  - Current upload speed
  - Elapsed time
- **Statistics on Completion**:
  - Total upload time
  - Average speed
  - Server processing time
- **Enhanced Error Handling**: Detailed error logging for network issues, aborts, and failures

#### Console Output Format:

```
╔═══════════════════════════════════════════════════════════════╗
║                     STARTING FILE UPLOAD                      ║
╚═══════════════════════════════════════════════════════════════╝
[CLIENT] Upload initiated at: 2025-10-16T...
[CLIENT] File details:
  ├─ Original name: large-document.pdf
  ├─ File ID: abc-123
  ├─ Sanitized name: abc-123.pdf
  ├─ Size: 250.50 MB (262668800 bytes)
  ├─ Type: application/pdf
  └─ Extension: pdf
[CLIENT] FormData prepared, initiating XMLHttpRequest...
[CLIENT] Sending request to /api/upload...
[CLIENT] Upload progress: 10%
  ├─ Uploaded: 25.05 MB / 250.50 MB
  ├─ Speed: 12.50 MB/s
  └─ Elapsed: 2.0s
[CLIENT] Upload progress: 20%
  ├─ Uploaded: 50.10 MB / 250.50 MB
  ├─ Speed: 13.20 MB/s
  └─ Elapsed: 4.1s
...
[CLIENT] Upload progress: 100%
  ├─ Uploaded: 250.50 MB / 250.50 MB
  ├─ Speed: 12.85 MB/s
  └─ Elapsed: 19.5s
╔═══════════════════════════════════════════════════════════════╗
║                     UPLOAD SUCCESSFUL                         ║
╚═══════════════════════════════════════════════════════════════╝
[CLIENT] Server response: {...}
[CLIENT] Upload statistics:
  ├─ Total time: 19.50s
  ├─ Average speed: 13.46 KB/ms
  ├─ Server processing time: 2100ms
  └─ File path: /uploads/abc-123.pdf
[CLIENT] File registered in upload manager
═══════════════════════════════════════════════════════════════
```

## API Utils Console Output Examples

### PDF Edit Upload:

```
╔═══════════════════════════════════════════════════════════════╗
║              STARTING PDF UPLOAD (Edit Mode)                 ║
╚═══════════════════════════════════════════════════════════════╝
[API UPLOAD] Upload initiated at: 2025-10-16T...
[API UPLOAD] File details:
  ├─ Name: document.pdf
  ├─ Size: 150.25 MB (157589504 bytes)
  ├─ Type: application/pdf
  └─ Endpoint: /pdf/pdf_upload
[API UPLOAD] Upload progress: 10%
  ├─ Uploaded: 15.03 MB / 150.25 MB
  ├─ Speed: 10.25 MB/s
  └─ Elapsed: 1.5s
...
╔═══════════════════════════════════════════════════════════════╗
║              PDF UPLOAD SUCCESSFUL (Edit Mode)               ║
╚═══════════════════════════════════════════════════════════════╝
[API UPLOAD] Upload statistics:
  ├─ Total time: 14.67s
  ├─ Average speed: 10.24 KB/ms
  └─ Response: {...}
═══════════════════════════════════════════════════════════════
```

### File Conversion Upload:

```
╔═══════════════════════════════════════════════════════════════╗
║              STARTING FILE CONVERSION UPLOAD                  ║
╚═══════════════════════════════════════════════════════════════╝
[CONVERSION] Upload initiated at: 2025-10-16T...
[CONVERSION] File details:
  ├─ Name: document.pdf
  ├─ Size: 250.50 MB (262668800 bytes)
  ├─ Type: application/pdf
  ├─ Endpoint: /pdf/pdf_to_word
  └─ No additional data
[CONVERSION] Upload progress: 10%
  ├─ Uploaded: 25.05 MB / 250.50 MB
  ├─ Speed: 12.50 MB/s
  └─ Elapsed: 2.0s
...
╔═══════════════════════════════════════════════════════════════╗
║          FILE CONVERSION UPLOAD SUCCESSFUL                    ║
╚═══════════════════════════════════════════════════════════════╝
[CONVERSION] Upload statistics:
  ├─ Total time: 19.50s
  ├─ Average speed: 13.46 KB/ms
  └─ Response data: {...}
═══════════════════════════════════════════════════════════════
```

## How to Use

### 1. Upload a Large File

Simply use any of the existing upload functions. The enhanced logging will automatically appear in:

- **Browser Console**: Client-side progress and statistics
- **Server Console** (terminal): Server-side processing details (for local API routes only)

### Supported Upload Functions:

- **Local uploads**: Via `fileUploadManager.uploadFile()`
- **PDF editing**: Via `uploadEditedPDF()`
- **File conversions**: Via any conversion function (e.g., `convertPdfToWord()`, `convertJpgToPdf()`, etc.)
- **All conversion types**: JPG, PNG, Word, Excel, PPTX, EPUB ↔ PDF
- **PDF compression**: Via `compressPdf()`

### 2. Monitor Progress

Open your browser's developer console (F12) to see:

- Upload progress updates every 1% (1%, 2%, 3%, etc.)
- Real-time upload speed
- Elapsed time
- Success/failure status
- Detailed error information if upload fails

### 3. Check Server Logs (for local API)

In your terminal where Next.js is running, you'll see:

- Request receipts
- File metadata
- Processing stages
- Write speeds
- Total processing time

## Technical Details

### File Size Limits

- **Local API (Next.js)**: 500MB (configured in `next.config.js`)
- **External API (axios)**: 500MB (configured in `apiUtils.ts`)
- **Timeout**: 5 minutes (300 seconds) for large uploads
- **Recommendation**: For files larger than 500MB, consider implementing chunked uploads

### Upload Methods

- **fileUploadUtils.ts**: Uses `XMLHttpRequest` for progress tracking (not Fetch API)
- **apiUtils.ts**: Uses `axios` with `onUploadProgress` callback
- Both provide real-time progress events
- Both calculate upload speed dynamically

### Performance Metrics

The logs track:

1. **Client → Server**: Network transfer time and speed
2. **Server Processing**: File read, buffer conversion, and disk write time (local API only)
3. **Total Time**: End-to-end upload duration
4. **Upload Speed**: Real-time MB/s calculation

### Request Size Limits by Function

| Function                          | Max Size | Timeout | Library        |
| --------------------------------- | -------- | ------- | -------------- |
| `fileUploadManager.uploadFile()`  | 500MB    | N/A     | XMLHttpRequest |
| `uploadEditedPDF()`               | 500MB    | 5 min   | axios          |
| `convertFile()` (all conversions) | 500MB    | 5 min   | axios          |
| Local API `/api/upload`           | 500MB    | N/A     | Next.js        |

## Browser Compatibility

- Works in all modern browsers that support XMLHttpRequest and FormData
- Progress tracking works in IE10+, Chrome, Firefox, Safari, Edge
- Axios supported in all major browsers

## Troubleshooting

### If uploads fail for large files:

1. Check server memory limits
2. Verify disk space availability
3. Check browser's available memory
4. Review server/proxy timeout settings (especially if using external API)
5. Check detailed error logs in browser console
6. For external API uploads, verify the backend server supports large files

### Log Locations:

- **Client logs (apiUtils.ts)**: Browser Developer Console - Look for `[API UPLOAD]` or `[CONVERSION]`
- **Client logs (fileUploadUtils.ts)**: Browser Developer Console - Look for `[CLIENT]`
- **Server logs**: Terminal where `npm run dev` or `npm start` is running - Look for `[UPLOAD]`

### Common Errors:

**"Request Entity Too Large" (413)**:

- Increase server-side limits (nginx, apache, or application server)
- Check `next.config.js` configuration

**"Network Error"**:

- Check internet connectivity
- Verify API endpoint is accessible
- Check CORS settings for external APIs

**"Timeout"**:

- Increase timeout in `apiUtils.ts` (currently 5 minutes)
- Check if file is too large for available bandwidth

## Future Enhancements (Optional)

If you need even larger files or better efficiency:

1. Implement chunked uploads (split large files into smaller pieces)
2. Add resume capability for interrupted uploads
3. Implement file compression before upload
4. Add server-side streaming for memory efficiency
5. Add parallel chunk uploads for faster transfer
6. Implement retry logic for failed chunks

## Testing Recommendations

1. **Small files (< 10MB)**: Test basic functionality
2. **Medium files (10-50MB)**: Test progress logging intervals
3. **Large files (50-200MB)**: Test speed calculations and statistics
4. **Very large files (200-500MB)**: Test timeout handling and memory management
5. **Network throttling**: Test with simulated slow connections (in Chrome DevTools)

## Summary

All upload functions in your application now support:

- ✅ Large files up to 500MB
- ✅ Detailed progress logging every 1% (1%, 2%, 3%...)
- ✅ Real-time upload speed calculation
- ✅ Comprehensive success/error logging
- ✅ Visual formatting for easy log reading
- ✅ Performance statistics and metrics
