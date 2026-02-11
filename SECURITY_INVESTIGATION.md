# Security Investigation - Automatic File Creation

## Problem
Malware files were being created when running the app (or from external uploads before the fix).

## Possible Causes

### 1. Malicious Dependency
A compromised npm package could create files on startup.

**Check:**
```bash
node scripts/check-dependencies.js
npm audit
```

### 2. Compromised Build Output
The `.next` directory might contain malicious code.

**Check:**
```bash
rm -rf .next
npm run build
npm start
```

### 3. Malicious Code in Source
Search for automatic file creation:
```bash
grep -r "writeFile" src/
grep -r "fs.write" src/
```

## Immediate Actions
1. Run `npm audit` and `npm audit fix`
2. Run `node scripts/check-dependencies.js`
3. Clean reinstall: `rm -rf node_modules .next && rm -f package-lock.json && npm install && npm run build`
4. Monitor file creation (e.g. `GET /api/block-file-creation` from localhost with optional `FILE_MONITOR_SECRET`)

## File Protection Added
- **Runtime FS patch (automatic file creation):** At server startup, Node’s `fs.writeFile`, `fs.appendFile`, and `fs.createWriteStream` are patched. Any code (including dependencies) that tries to write a file is blocked unless:
  - The path is under `public/uploads`, `.next`, or `node_modules`, and
  - The filename is not suspicious (no extension-less random alphanumeric or long hex names).
- This stops malware files from appearing **automatically** (e.g. from a malicious npm package or script) without any user action.
- Middleware helpers still used by the upload route for path and filename checks.

## If Files Still Appear
- Check cron: `crontab -l`, `sudo crontab -l`, `/etc/cron.d/`
- Check system services and EC2/instance logs
- Review `next.config.js` and build output

See **DEPLOYMENT_SECURITY.md** for full Ubuntu hardening and recovery steps.
