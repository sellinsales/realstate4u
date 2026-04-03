import { Prisma } from "@prisma/client";

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return "That email is already registered.";
    }

    if (error.code === "P2021" || error.code === "P2022") {
      return "The live database schema is outdated. Apply the latest SQL update and restart the app.";
    }

    if (error.code === "P2003") {
      return "A related account record could not be created. Check the live database schema.";
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return "The app could not connect to the database. Check DATABASE_URL and restart the app.";
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return "The account payload could not be saved because the database schema does not match the app.";
  }

  if (error instanceof Error) {
    if (error.message.includes("Unknown authentication plugin")) {
      return "The database user authentication plugin is not supported by Prisma on this host.";
    }

    if (error.message.includes("does not exist")) {
      return "A required auth table or column is missing in the live database.";
    }
  }

  return fallback;
}
