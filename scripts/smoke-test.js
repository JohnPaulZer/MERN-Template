const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const cliPath = path.resolve(__dirname, "..", "src", "index.js");
const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "mern-template-jpz-"));

try {
  execFileSync(process.execPath, [cliPath, targetDir], { stdio: "inherit" });

  const expectedFiles = [
    "README.md",
    path.join("backend", ".env.example"),
    path.join("backend", ".gitignore"),
    path.join("backend", "package.json"),
    path.join("backend", "src", "index.ts"),
    path.join("frontend", ".env.example"),
    path.join("frontend", ".gitignore"),
    path.join("frontend", "package.json"),
    path.join("frontend", "src", "App.tsx"),
  ];

  const missingFiles = expectedFiles.filter(
    (filePath) => !fs.existsSync(path.join(targetDir, filePath))
  );

  if (missingFiles.length > 0) {
    throw new Error("Missing scaffolded files: " + missingFiles.join(", "));
  }
} finally {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
