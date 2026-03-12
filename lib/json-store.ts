import { promises as fs } from "fs";
import path from "path";

export async function readJsonFile<T>(relativePath: string): Promise<T> {
  const filePath = path.join(process.cwd(), relativePath);
  const file = await fs.readFile(filePath, "utf8");
  return JSON.parse(file) as T;
}

export async function writeJsonFile<T>(relativePath: string, data: T) {
  const filePath = path.join(process.cwd(), relativePath);
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
