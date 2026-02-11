# Deployment Security – Ubuntu Server

This guide helps prevent malware and CPU abuse (e.g. crypto miners) when running this app on Ubuntu.

## If Your Server Is Already Compromised (Do First)

1. **Stop the app and any suspicious processes**
   ```bash
   pm2 stop all   # or systemctl stop zoompdf, or kill the node process
   top            # or htop – note any process using high CPU
   kill -9 <PID>  # kill suspicious PIDs
   ```

2. **Check for malware and persistence**
   ```bash
   crontab -l
   sudo crontab -l
   ls -la /etc/cron.d/
   ls -la /var/spool/cron/
   # Remove any entries you don't recognize
   ```

3. **Find and remove unknown files in the project**
   ```bash
   cd /path/to/zoompdf
   ls -la
   # Remove random-looking files (e.g. long alphanumeric names with no extension)
   rm -f [a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]*
   # Or use the block-file-creation API (from localhost) to list suspicious files first
   ```

4. **Clean reinstall (recommended)**
   ```bash
   cd /path/to/zoompdf
   rm -rf node_modules .next
   rm -f package-lock.json
   npm install
   npm audit
   npm run build
   ```

5. **Restart the app only after applying the steps below.**

---

## Prevention – Hardening on Ubuntu

### 1. Run the app as a non-root user

Create a dedicated user and run the app under it:

```bash
sudo useradd -r -s /bin/false zoompdf
sudo chown -R zoompdf:zoompdf /path/to/zoompdf
# Then run with: sudo -u zoompdf npm start (or use systemd below)
```

### 2. Restrict upload directory permissions

Ensure the uploads directory is writable only by the app and **never executable**:

```bash
mkdir -p /path/to/zoompdf/public/uploads
chmod 750 /path/to/zoompdf/public/uploads
chown zoompdf:zoompdf /path/to/zoompdf/public/uploads
```

The app also sets each uploaded file to `644` (no execute) after write.

### 3. Firewall – only expose needed ports

```bash
sudo ufw default deny incoming
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 4. Put the app behind a reverse proxy (Nginx)

- Do **not** run the app on a public port (e.g. 3065) directly.
- Bind Next.js to `127.0.0.1:3065` and let Nginx listen on 80/443 and proxy to it.
- Nginx should serve `public/uploads` as static files **without** executing them (no `cgi` or script handlers for that path).

Example (Nginx) – proxy to app, serve uploads as static:

```nginx
location /uploads/ {
    alias /path/to/zoompdf/public/uploads/;
    # No script execution
}
location / {
    proxy_pass http://127.0.0.1:3065;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### 5. Bind Next.js to localhost only

Start the app so it only listens on loopback:

```bash
# In package.json or systemd:
next start -p 3065 -H 127.0.0.1
```

Or set in the start script: `"start": "next start -p 3065 -H 127.0.0.1"`

### 6. Environment variables

- **Authentication:** Ensure your auth API (`https://api.pdfezy.com/api/auth/validate-token`) is reachable from the server so uploads stay protected.
- **Optional:** Set `FILE_MONITOR_SECRET` to a long random string if you call `/api/block-file-creation` from a monitoring script; call it with header `x-file-monitor-secret: <secret>`.

### 7. Dependency and build hygiene

Before each deploy:

```bash
npm audit
npm audit fix
node scripts/check-dependencies.js
rm -rf .next && npm run build
```

### 8. Optional: systemd with limits

Example unit to run the app with memory and CPU limits:

```ini
[Unit]
Description=ZoomPDF
After=network.target

[Service]
Type=simple
User=zoompdf
WorkingDirectory=/path/to/zoompdf
ExecStart=/usr/bin/npm start
Restart=on-failure
LimitNOFILE=65536
MemoryMax=1G
CPUQuota=80%

[Install]
WantedBy=multi-user.target
```

Adjust `MemoryMax` and `CPUQuota` as needed. This can limit damage from runaway or malicious processes.

### 9. Optional: fail2ban for brute force / abuse

If you expose SSH or the app directly, consider fail2ban for repeated failed auth or excessive requests.

---

## Automatic file creation (malware without user action)

If files appear **without anyone uploading**, the app now has **runtime FS protection**:

- On server start, all `fs.writeFile` / `appendFile` / `createWriteStream` calls are intercepted.
- Writes are only allowed under `public/uploads`, `.next`, and `node_modules`, and filenames must not look suspicious (e.g. long random strings with no extension).
- Any other write throws and is logged, so malicious code (e.g. in a dependency) cannot create files on disk.

This is enabled via `instrumentation.ts` and `experimental.instrumentationHook: true` in `next.config.js`. Do not disable the instrumentation hook in production.

## Summary checklist

- [ ] App runs as non-root user
- [ ] `public/uploads` has permissions like `750`, owned by app user
- [ ] Uploaded files are non-executable (app sets `chmod 644`)
- [ ] Firewall allows only 22, 80, 443 (or your chosen ports)
- [ ] App listens on `127.0.0.1` only, behind Nginx (or similar)
- [ ] Auth is required for `/api/upload` (token validated against your API)
- [ ] No unknown cron jobs or processes
- [ ] `npm audit` and `check-dependencies.js` run before deploy
- [ ] Clean build (`rm -rf .next`, then `npm run build`) before starting

These steps reduce the risk of malware uploads and high CPU abuse on your Ubuntu server.
