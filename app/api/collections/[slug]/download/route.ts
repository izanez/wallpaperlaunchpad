import { promises as fs } from "fs";
import path from "path";
import JSZip from "jszip";
import { NextResponse } from "next/server";
import { getCollectionBySlug, getWallpapersBySlugs } from "@/lib/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return NextResponse.json({ error: "Collection not found." }, { status: 404 });
  }

  const wallpapers = getWallpapersBySlugs(collection.wallpapers);
  const zip = new JSZip();

  await Promise.all(
    wallpapers.map(async (wallpaper) => {
      const filePath = path.join(process.cwd(), "public", wallpaper.image.replace(/^\//, ""));
      const file = await fs.readFile(filePath);
      zip.file(path.basename(filePath), file);
    })
  );

  const archive = await zip.generateAsync({ type: "arraybuffer" });

  return new NextResponse(archive, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${collection.slug}.zip"`
    }
  });
}
