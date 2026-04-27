const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const templateDir = path.resolve(__dirname, "..", "template");
const templateRepoUrl = process.env.MERN_TEMPLATE_REPO_URL;

function ensureTemplate() {
  if (hasTemplate()) {
    return;
  }

  if (!templateRepoUrl) {
    throw new Error(
      "Template directory is missing and MERN_TEMPLATE_REPO_URL is not set."
    );
  }

  const cloneDir = fs.mkdtempSync(path.join(os.tmpdir(), "mern-template-source-"));

  try {
    fs.rmSync(templateDir, { recursive: true, force: true });
    execFileSync("git", ["clone", "--depth", "1", templateRepoUrl, cloneDir], {
      stdio: "inherit",
    });
    copyDirectory(cloneDir, templateDir);
  } finally {
    fs.rmSync(cloneDir, { recursive: true, force: true });
  }
}

function hasTemplate() {
  return [
    "README.md",
    path.join("backend", "package.json"),
    path.join("backend", "src", "index.ts"),
    path.join("frontend", "package.json"),
    path.join("frontend", "src", "App.tsx"),
  ].every((filePath) => fs.existsSync(path.join(templateDir, filePath)));
}

function copyDirectory(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    if (entry.name === ".git") {
      continue;
    }

    const source = path.join(sourceDir, entry.name);
    const destinationName = entry.name === ".gitignore" ? "_gitignore" : entry.name;
    const destination = path.join(targetDir, destinationName);

    if (entry.isDirectory()) {
      copyDirectory(source, destination);
      continue;
    }

    if (entry.isFile()) {
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(source, destination);
    }
  }
}

if (require.main === module) {
  ensureTemplate();
}

module.exports = { ensureTemplate };
