/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

process.chdir(__dirname);
require("dotenv").config({ path: path.join(__dirname, ".env") });

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function getArgValue(flag) {
  const match = process.argv.find((arg) => arg.startsWith(`${flag}=`));
  return match ? match.slice(flag.length + 1) : undefined;
}

const baseUrl = (getArgValue("--base-url") || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
const runRegister = !process.argv.includes("--skip-register");

const results = [];

function addResult(name, status, detail) {
  results.push({ name, status, detail });
  const marker = status === "pass" ? "PASS" : status === "warn" ? "WARN" : "FAIL";
  console.log(`[${marker}] ${name}${detail ? ` - ${detail}` : ""}`);
}

async function httpJson(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const text = await response.text();
    let json = null;

    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    return {
      ok: response.ok,
      status: response.status,
      text,
      json,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function checkDatabase() {
  try {
    const dbResult = await prisma.$queryRawUnsafe("SELECT 1");
    addResult("Database connection", "pass", JSON.stringify(dbResult));
  } catch (error) {
    addResult("Database connection", "fail", error instanceof Error ? error.message : "Unknown database error");
  }
}

async function checkPage(route) {
  try {
    const response = await fetch(`${baseUrl}${route}`);
    addResult(`GET ${route}`, response.ok ? "pass" : "fail", `HTTP ${response.status}`);
  } catch (error) {
    addResult(`GET ${route}`, "fail", error instanceof Error ? error.message : "Request failed");
  }
}

async function checkRuntimeDebug() {
  if (!process.env.NEXTAUTH_SECRET) {
    addResult("Runtime debug route", "warn", "Skipped because NEXTAUTH_SECRET is not available");
    return;
  }

  try {
    const response = await httpJson(`${baseUrl}/api/debug/runtime-db`, {
      method: "GET",
      headers: {
        "x-debug-token": process.env.NEXTAUTH_SECRET,
      },
    });

    if (response.ok) {
      const details = [];

      if (response.json?.databaseUrlPreview) {
        details.push(`env=${response.json.databaseUrlPreview}`);
      }
      if (response.json?.dbPingError) {
        details.push(`dbPingError=${response.json.dbPingError}`);
      } else {
        details.push("dbPing=ok");
      }
      if (response.json?.userLookupError) {
        details.push(`userLookupError=${response.json.userLookupError}`);
      } else {
        details.push("userLookup=ok");
      }

      addResult("Runtime debug route", "pass", details.join(" | "));
      return;
    }

    addResult("Runtime debug route", "fail", response.json?.error || response.text || `HTTP ${response.status}`);
  } catch (error) {
    addResult("Runtime debug route", "fail", error instanceof Error ? error.message : "Request failed");
  }
}

async function checkAuthPreflight() {
  try {
    const response = await httpJson(`${baseUrl}/api/auth/preflight`, {
      method: "POST",
      body: JSON.stringify({
        email: "missing-user@realstate4u.com",
        password: "invalidpass123",
      }),
    });

    if (response.status === 401) {
      addResult("Auth preflight invalid-user check", "pass", "Returns 401 for invalid credentials");
      return;
    }

    addResult(
      "Auth preflight invalid-user check",
      response.ok ? "warn" : "fail",
      response.json?.error || response.text || `HTTP ${response.status}`,
    );
  } catch (error) {
    addResult("Auth preflight invalid-user check", "fail", error instanceof Error ? error.message : "Request failed");
  }
}

async function checkRegister() {
  const email = `smoke-${Date.now()}@realstate4u.com`;

  try {
    const response = await httpJson(`${baseUrl}/api/register`, {
      method: "POST",
      body: JSON.stringify({
        name: "Smoke Test User",
        email,
        phone: "03001234567",
        country: "Pakistan",
        password: "testpass123",
      }),
    });

    if (response.status === 201) {
      addResult("Register API", "pass", response.json?.message || "Account created");
      return;
    }

    addResult("Register API", "fail", response.json?.error || response.text || `HTTP ${response.status}`);
  } catch (error) {
    addResult("Register API", "fail", error instanceof Error ? error.message : "Request failed");
  }
}

async function checkForgotPassword() {
  try {
    const response = await httpJson(`${baseUrl}/api/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify({
        email: "smoke-check@realstate4u.com",
      }),
    });

    if (response.status === 200) {
      addResult("Forgot-password API", "pass", response.json?.message || "Reset flow available");
      return;
    }

    if (response.status === 503) {
      addResult("Forgot-password API", "warn", response.json?.error || "Feature not active yet");
      return;
    }

    addResult("Forgot-password API", "fail", response.json?.error || response.text || `HTTP ${response.status}`);
  } catch (error) {
    addResult("Forgot-password API", "fail", error instanceof Error ? error.message : "Request failed");
  }
}

async function main() {
  console.log(`Smoke test target: ${baseUrl}`);

  if (!process.env.DATABASE_URL) {
    addResult("DATABASE_URL present", "fail", "Missing DATABASE_URL");
  } else {
    addResult("DATABASE_URL present", "pass", "Loaded");
  }

  if (!process.env.NEXTAUTH_SECRET) {
    addResult("NEXTAUTH_SECRET present", "warn", "Missing NEXTAUTH_SECRET");
  } else {
    addResult("NEXTAUTH_SECRET present", "pass", "Loaded");
  }

  await checkDatabase();
  await checkPage("/");
  await checkPage("/login");
  await checkPage("/register");
  await checkPage("/forgot-password");
  await checkRuntimeDebug();
  await checkAuthPreflight();

  if (runRegister) {
    await checkRegister();
  } else {
    addResult("Register API", "warn", "Skipped by --skip-register");
  }

  await checkForgotPassword();

  const failCount = results.filter((result) => result.status === "fail").length;
  const warnCount = results.filter((result) => result.status === "warn").length;

  console.log(`\nSummary: ${results.length - failCount - warnCount} passed, ${warnCount} warnings, ${failCount} failed.`);

  await prisma.$disconnect();

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch(async (error) => {
  console.error("Smoke test crashed", error);
  await prisma.$disconnect();
  process.exit(1);
});
