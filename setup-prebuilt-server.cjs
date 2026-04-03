/* eslint-disable @typescript-eslint/no-require-imports */
const { spawnSync } = require("child_process");
const { getPrismaDeployStep, npmCommand } = require("./server-prisma-step.cjs");

const steps = [
  {
    title: "Install dependencies",
    command: npmCommand,
    args: ["install", "--include=dev"],
  },
  {
    title: "Generate Prisma client",
    command: npmCommand,
    args: ["run", "prisma:generate"],
  },
  getPrismaDeployStep(),
];

const requiredEnv = ["DATABASE_URL"];
const recommendedEnv = ["NEXTAUTH_URL", "NEXTAUTH_SECRET"];

const missingRequired = requiredEnv.filter((key) => !process.env[key]);
const missingRecommended = recommendedEnv.filter((key) => !process.env[key]);

if (missingRequired.length) {
  console.error(`Missing required environment variables: ${missingRequired.join(", ")}`);
  process.exit(1);
}

if (missingRecommended.length) {
  console.warn(`Warning: missing recommended environment variables: ${missingRecommended.join(", ")}`);
}

for (const step of steps) {
  console.log(`\n=== ${step.title} ===`);

  const result = spawnSync(step.command, step.args, {
    stdio: "inherit",
    shell: false,
    env: process.env,
  });

  if (result.status !== 0) {
    console.error(`\nPrebuilt server setup failed during: ${step.title}`);
    process.exit(result.status || 1);
  }
}

console.log("\nPrebuilt server setup completed successfully.");
console.log("Upload a built .next folder if you have not already, then restart the Passenger/CloudLinux app.");
