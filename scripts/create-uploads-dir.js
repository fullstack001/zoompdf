const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(process.cwd(), "public", "uploads");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✅ Created uploads directory:", uploadsDir);
} else {
  console.log("✅ Uploads directory already exists:", uploadsDir);
}

// Create a .gitkeep file to ensure the directory is included in git
const gitkeepPath = path.join(uploadsDir, ".gitkeep");
if (!fs.existsSync(gitkeepPath)) {
  fs.writeFileSync(gitkeepPath, "");
  console.log("✅ Created .gitkeep file in uploads directory");
}
