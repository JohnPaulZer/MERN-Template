#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const templateDir = path.resolve(__dirname, "..", "template");

function main() {
  const { target: parsedTarget, force, help } = parseArgs(process.argv.slice(2));

  if (help) {
    printHelp();
    return;
  }

  const target = parsedTarget || ".";
  const targetDir = path.resolve(process.cwd(), target);

  createProject(targetDir, force);

  const relativeTarget = path.relative(process.cwd(), targetDir) || ".";
  console.log("");
  console.log("Created MERN auth template in " + relativeTarget);
  console.log("");
  console.log("Next steps:");
  if (relativeTarget !== ".") {
    console.log("  cd " + relativeTarget);
  }
  console.log("  cd backend");
  console.log("  npm install");
  console.log("  Copy .env.example to .env and update it");
  console.log("  npm run dev");
  console.log("");
  console.log("In another terminal:");
  console.log("  cd " + path.join(relativeTarget, "frontend"));
  console.log("  npm install");
  console.log("  Copy .env.example to .env and update it");
  console.log("  npm run dev");
}

function parseArgs(args) {
  let target = "";
  let force = false;
  let help = false;

  for (const arg of args) {
    if (arg === "-h" || arg === "--help") {
      help = true;
    } else if (arg === "-f" || arg === "--force") {
      force = true;
    } else if (arg.startsWith("-")) {
      throw new Error("Unknown option: " + arg);
    } else if (!target) {
      target = arg;
    }
  }

  return { target, force, help };
}

function printHelp() {
  console.log(`
mern-template-jpz

Usage:
  mern-template-jpz
  mern-template-jpz [project-name]
  mern-template-jpz . --force

Examples:
  mern-template-jpz
  mern-template-jpz my-app

Options:
  -f, --force   Allow scaffolding into a non-empty directory
  -h, --help    Show this help message

No project name means the template will be created in the current directory.
`);
}

function createProject(targetDir, force) {
  ensureTemplateExists();
  ensureSafeTarget(targetDir, force);
  copyDirectory(templateDir, targetDir);
}

function ensureTemplateExists() {
  if (!fs.existsSync(templateDir)) {
    throw new Error("Template directory is missing: " + templateDir);
  }
}

function ensureSafeTarget(targetDir, force) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    return;
  }

  const existingFiles = fs.readdirSync(targetDir);
  if (existingFiles.length > 0 && !force) {
    throw new Error(
      "Target directory is not empty. Use --force to scaffold into it: " + targetDir
    );
  }
}

function copyDirectory(sourceDir, targetDir) {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const source = path.join(sourceDir, entry.name);
    const destinationName = entry.name === "_gitignore" ? ".gitignore" : entry.name;
    const destination = path.join(targetDir, destinationName);

    if (entry.isDirectory()) {
      fs.mkdirSync(destination, { recursive: true });
      copyDirectory(source, destination);
      continue;
    }

    if (entry.isFile()) {
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(source, destination);
    }
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
