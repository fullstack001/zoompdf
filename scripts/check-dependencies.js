#!/usr/bin/env node

/**
 * Check for suspicious or potentially malicious dependencies
 */

const fs = require('fs');
const path = require('path');

console.log('Checking dependencies for suspicious packages...\n');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

const nodeModulesPath = path.join(process.cwd(), 'node_modules');

const suspicious = [];
for (const [name, version] of Object.entries(dependencies)) {
  const packagePath = path.join(nodeModulesPath, name);

  if (fs.existsSync(packagePath)) {
    const packageJsonPath = path.join(packagePath, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        if (pkg.scripts) {
          const scripts = Object.values(pkg.scripts);
          const hasSuspiciousScript = scripts.some(script =>
            script.includes('writeFile') ||
            script.includes('fs.write') ||
            script.includes('child_process') ||
            script.includes('exec') ||
            script.includes('spawn')
          );

          if (hasSuspiciousScript) {
            suspicious.push({
              name,
              version,
              reason: 'Suspicious scripts found',
              scripts: pkg.scripts
            });
          }
        }

        if (pkg.scripts && pkg.scripts.postinstall) {
          suspicious.push({
            name,
            version,
            reason: 'Has postinstall script',
            script: pkg.scripts.postinstall
          });
        }
      } catch (error) {
        console.warn(`Warning: Could not read package.json for ${name}`);
      }
    }
  }
}

if (suspicious.length > 0) {
  console.log('⚠️  Suspicious packages found:\n');
  suspicious.forEach(pkg => {
    console.log(`Package: ${pkg.name}@${pkg.version}`);
    console.log(`Reason: ${pkg.reason}`);
    if (pkg.scripts) {
      console.log('Scripts:', JSON.stringify(pkg.scripts, null, 2));
    }
    if (pkg.script) {
      console.log('Postinstall:', pkg.script);
    }
    console.log('');
  });
} else {
  console.log('✅ No obviously suspicious packages found.');
  console.log('\nNote: This is a basic check. Review dependencies manually for security.');
}

console.log('\nAll dependencies:');
Object.entries(dependencies).forEach(([name, version]) => {
  console.log(`  ${name}@${version}`);
});
