import path from "path";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getCategoryBySlug } from "@/lib/content";
import {
  buildWallpaperDescription,
  buildWallpaperPrompt,
  buildWallpaperTitle,
  getDimensionsForOrientation
} from "@/lib/prompts";
import {
  appendWallpapers,
  buildGeneratedFilename,
  createWallpaperRecord,
  ensureWallpaperDirectory,
  readWallpaperData,
  saveBase64Image
} from "@/lib/wallpaper-store";
import type { GenerateWallpaperInput, Orientation, Wallpaper } from "@/lib/types";

function isOrientation(value: string): value is Orientation {
  return value === "desktop" || value === "mobile";
}

function parseRequestBody(body: unknown): GenerateWallpaperInput | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const candidate = body as Partial<GenerateWallpaperInput>;

  if (
    typeof candidate.category !== "string" ||
    typeof candidate.theme !== "string" ||
    typeof candidate.mood !== "string" ||
    typeof candidate.style !== "string" ||
    typeof candidate.outputCount !== "number" ||
    typeof candidate.orientation !== "string" ||
    !isOrientation(candidate.orientation)
  ) {
    return null;
  }

  return {
    category: candidate.category,
    theme: candidate.theme,
    mood: candidate.mood,
    style: candidate.style,
    outputCount: Math.min(Math.max(candidate.outputCount, 1), 4),
    orientation: candidate.orientation
  };
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY in the environment." },
      { status: 500 }
    );
  }

  const payload = parseRequestBody(await request.json());

  if (!payload) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const category = getCategoryBySlug(payload.category);

  if (!category) {
    return NextResponse.json({ error: "Unknown category." }, { status: 400 });
  }

  const existingWallpapers = await readWallpaperData();
  const existingSlugs = existingWallpapers.map((wallpaper) => wallpaper.slug);
  const categoryDirectory = await ensureWallpaperDirectory(category.slug);
  const dimensions = getDimensionsForOrientation(payload.orientation);
  const createdWallpapers: Wallpaper[] = [];
  const imageModel = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1-mini";
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  for (let index = 0; index < payload.outputCount; index += 1) {
    const prompt = buildWallpaperPrompt(payload, category, index + 1);
    const title = buildWallpaperTitle(payload, index);
    const fileName = buildGeneratedFilename(title);
    const filePath = path.join(categoryDirectory, fileName);
    const response = await client.images.generate({
      model: imageModel,
      size: `${dimensions.width}x${dimensions.height}` as "1024x1024" | "1536x1024" | "1024x1536" | "auto",
      prompt
    });
    const imageBase64 = response.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json(
        { error: `OpenAI did not return image data for item ${index + 1}.` },
        { status: 502 }
      );
    }

    await saveBase64Image(filePath, imageBase64);

    const wallpaper = createWallpaperRecord(
      {
        title,
        category: category.slug,
        image: `/wallpapers/${category.slug}/${fileName}`,
        tags: [payload.theme, payload.mood, payload.style, payload.orientation].map((tag) =>
          tag.toLowerCase()
        ),
        mood: payload.mood.toLowerCase(),
        style: payload.style.toLowerCase(),
        description: buildWallpaperDescription(payload, category.name),
        width: dimensions.width,
        height: dimensions.height,
        accessLevel: "free"
      },
      [...existingSlugs, ...createdWallpapers.map((item) => item.slug)]
    );

    createdWallpapers.push(wallpaper);
  }

  await appendWallpapers(createdWallpapers);

  return NextResponse.json({
    message: `Generated ${createdWallpapers.length} wallpaper${createdWallpapers.length === 1 ? "" : "s"} for ${category.name}.`,
    wallpapers: createdWallpapers.map((wallpaper) => ({
      title: wallpaper.title,
      slug: wallpaper.slug,
      image: wallpaper.image
    }))
  });
}
