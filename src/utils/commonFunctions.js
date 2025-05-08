import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getUrlPath(fileName) {
  return `uploads/${fileName}`;
}

export function deleteFileFromServer(filePath) {
  if (filePath) {
    const serverFilePath = path.join(__dirname, "../..", filePath);

    fs.unlink(serverFilePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${filePath}`, err);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  }
}
