const fs = require("fs");
const path = require("path");

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function getPrismaDeployStep() {
  const migrationsDir = path.join(process.cwd(), "prisma", "migrations");
  const hasMigrations =
    fs.existsSync(migrationsDir) &&
    fs.readdirSync(migrationsDir).some((entry) => {
      const fullPath = path.join(migrationsDir, entry);
      return fs.statSync(fullPath).isDirectory();
    });

  if (hasMigrations) {
    return {
      title: "Apply production migrations",
      command: npmCommand,
      args: ["run", "prisma:deploy"],
    };
  }

  return {
    title: "Push Prisma schema",
    command: npmCommand,
    args: ["run", "prisma:push"],
  };
}

module.exports = { getPrismaDeployStep, npmCommand };
