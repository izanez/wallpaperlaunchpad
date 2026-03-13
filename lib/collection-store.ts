import { readJsonFile, writeJsonFile } from "@/lib/json-store";
import type { Collection } from "@/lib/types";

const collectionDataPath = "data/collections.json";

export async function readCollectionData() {
  return readJsonFile<Collection[]>(collectionDataPath);
}

export async function appendWallpapersToCollection(collectionSlug: string, wallpaperSlugs: string[]) {
  const collections = await readCollectionData();
  const updatedCollections = collections.map((collection) => {
    if (collection.slug !== collectionSlug) {
      return collection;
    }

    return {
      ...collection,
      wallpapers: Array.from(new Set([...collection.wallpapers, ...wallpaperSlugs]))
    };
  });

  await writeJsonFile(collectionDataPath, updatedCollections);
}
