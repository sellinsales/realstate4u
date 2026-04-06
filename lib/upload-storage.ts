import os from "node:os";
import path from "node:path";

export const LOCAL_UPLOAD_COLLECTION = "listings";

export function getLocalUploadsRoot() {
  const customDirectory = process.env.LOCAL_UPLOADS_DIR?.trim();
  return customDirectory
    ? path.resolve(customDirectory)
    : path.join(os.homedir(), "realstate4u-storage");
}

export function getLocalUploadDirectory(collection = LOCAL_UPLOAD_COLLECTION) {
  return path.join(getLocalUploadsRoot(), collection);
}

export function getUploadsPublicBase() {
  const customBase = process.env.LOCAL_UPLOADS_PUBLIC_BASE?.trim();
  return customBase ? customBase.replace(/\/$/, "") : "/uploads";
}

export function buildUploadsPublicUrl(fileName: string, collection = LOCAL_UPLOAD_COLLECTION) {
  return `${getUploadsPublicBase()}/${collection}/${fileName}`;
}
