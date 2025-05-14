import fs from "fs";
import path from "path";

export function ensureDir(...segments: string[]): string {
  const dir = path.resolve(__dirname, "../../", ...segments);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}
