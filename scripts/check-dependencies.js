#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const lockPath = path.join(process.cwd(), "package-lock.json");

if (!fs.existsSync(lockPath)) {
  console.error("package-lock.json not found. Run npm install first.");
  process.exit(1);
}

const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
const packages = lock.packages || {};

const suspicious = [];
for (const [pkgPath, meta] of Object.entries(packages)) {
  const resolved = meta && meta.resolved;
  if (!resolved) continue;

  const isNpmRegistry =
    resolved.startsWith("https://registry.npmjs.org/") ||
    resolved.startsWith("http://registry.npmjs.org/");

  if (!isNpmRegistry) {
    suspicious.push({ pkgPath: pkgPath || "(root)", resolved });
  }
}

if (suspicious.length > 0) {
  console.error("Potentially risky package sources found:");
  for (const item of suspicious) {
    console.error(`- ${item.pkgPath}: ${item.resolved}`);
  }
  process.exit(2);
}

console.log("Dependency source check passed: all resolved URLs are npm registry.");
