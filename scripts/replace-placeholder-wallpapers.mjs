import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";

const root = process.cwd();
const wallpapersPath = path.join(root, "data", "wallpapers.json");

const defaultSelectedSlugs = [
  "dragon-over-ember-keep",
  "moonlit-crystal-forest",
  "crown-of-hollow-ruins",
  "ashen-knight-vigil",
  "neon-storm-district",
  "hologram-alley-runner",
  "orbit-above-andara",
  "nebula-diver",
  "arena-of-mech-giants",
  "quest-board-at-dawn"
];

const cliSelectedSlugs = process.argv.slice(2);
const selectedSlugs = cliSelectedSlugs.length > 0 ? cliSelectedSlugs : defaultSelectedSlugs;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const imageModel = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1-mini";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}

const orientationSizes = {
  desktop: { width: 1536, height: 1024, size: "1536x1024" },
  mobile: { width: 1024, height: 1536, size: "1024x1536" }
};

function getOrientation(wallpaper) {
  return wallpaper.width >= wallpaper.height ? "desktop" : "mobile";
}

function buildPrompt(wallpaper) {
  const orientation = getOrientation(wallpaper);
  const categoryLabel = wallpaper.category.replace(/-wallpapers$/, "").replace(/-/g, " ");

  return [
    `${wallpaper.title}, ${categoryLabel} wallpaper scene`,
    wallpaper.description,
    `mood: ${wallpaper.mood}`,
    `style: ${wallpaper.style}`,
    `tags: ${wallpaper.tags.join(", ")}`,
    `composition optimized for ${orientation} wallpaper`,
    "high detail",
    "cinematic lighting",
    "premium wallpaper artwork",
    "no text",
    "no watermark"
  ].join(", ");
}

async function main() {
  const wallpapers = JSON.parse(await fs.readFile(wallpapersPath, "utf8"));
  const targets = wallpapers.filter((wallpaper) => selectedSlugs.includes(wallpaper.slug));

  for (const wallpaper of targets) {
    const orientation = getOrientation(wallpaper);
    const { size } = orientationSizes[orientation];
    const prompt = buildPrompt(wallpaper);
    const response = await client.images.generate({
      model: imageModel,
      size,
      prompt
    });

    const base64 = response.data?.[0]?.b64_json;
    if (!base64) {
      throw new Error(`No image data returned for ${wallpaper.slug}`);
    }

    const outputDir = path.join(root, "public", "wallpapers", wallpaper.category);
    const filename = `${wallpaper.slug}.png`;
    const outputPath = path.join(outputDir, filename);

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputPath, Buffer.from(base64, "base64"));

    wallpaper.image = `/wallpapers/${wallpaper.category}/${filename}`;
  }

  await fs.writeFile(wallpapersPath, `${JSON.stringify(wallpapers, null, 2)}\n`, "utf8");
}

await main();
