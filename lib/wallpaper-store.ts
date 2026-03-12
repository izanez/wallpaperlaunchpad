import { promises as fs } from "fs";
import path from "path";
import { readJsonFile, writeJsonFile } from "@/lib/json-store";
import { slugify, uniqueSlug } from "@/lib/slug";
import type { Wallpaper } from "@/lib/types";

const wallpaperDataPath = "data/wallpapers.json";

export async function readWallpaperData() {
  return readJsonFile<Wallpaper[]>(wallpaperDataPath);
}

export async function appendWallpapers(newWallpapers: Wallpaper[]) {
  const current = await readWallpaperData();
  await writeJsonFile(wallpaperDataPath, [...newWallpapers, ...current]);
}

export async function ensureWallpaperDirectory(categorySlug: string) {
  const folder = path.join(process.cwd(), "public", "wallpapers", categorySlug);
  await fs.mkdir(folder, { recursive: true });
  return folder;
}

export async function saveBase64Image(filePath: string, base64Data: string) {
  const buffer = Buffer.from(base64Data, "base64");
  await fs.writeFile(filePath, buffer);
}

export function createWallpaperRecord(
  partial: Omit<Wallpaper, "slug" | "createdAt">,
  existingSlugs: string[]
) {
  return {
    ...partial,
    slug: uniqueSlug(partial.title, existingSlugs),
    createdAt: new Date().toISOString()
  };
}

export function buildGeneratedFilename(title: string, extension = "png") {
  return `${slugify(title)}.${extension}`;
}
