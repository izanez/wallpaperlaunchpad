import type { Category, GenerateWallpaperInput, Orientation } from "@/lib/types";

const orientationMap: Record<
  Orientation,
  { width: number; height: number; label: string }
> = {
  desktop: {
    width: 1536,
    height: 1024,
    label: "wide desktop wallpaper"
  },
  mobile: {
    width: 1024,
    height: 1536,
    label: "vertical mobile wallpaper"
  }
};

const categoryPromptTemplates: Record<string, string> = {
  "fantasy-wallpapers":
    "Epic fantasy environment, grand worldbuilding, layered depth, legendary atmosphere",
  "dark-fantasy-wallpapers":
    "Dark fantasy environment, brooding ruins, ominous mood, gothic textures",
  "cyberpunk-wallpapers":
    "Cyberpunk cityscape, neon reflections, futuristic architecture, tech-noir energy",
  "space-wallpapers":
    "Expansive cosmic scene, interstellar scale, vivid nebula detail, atmospheric glow",
  "gaming-wallpapers":
    "High-intensity gaming-inspired scene, heroic scale, dynamic environment, cinematic action",
  "mobile-wallpapers":
    "Premium portrait wallpaper, clean focal point, striking gradients, polished OLED contrast"
};

export function getDimensionsForOrientation(orientation: Orientation) {
  return orientationMap[orientation];
}

export function buildWallpaperPrompt(
  input: GenerateWallpaperInput,
  category: Category,
  variationIndex: number
) {
  const baseTemplate = categoryPromptTemplates[input.category] ?? category.description;

  return [
    baseTemplate,
    `Theme: ${input.theme}`,
    `Mood: ${input.mood}`,
    `Style direction: ${input.style}`,
    `Variation cue: ${variationIndex}`,
    `Designed as a ${orientationMap[input.orientation].label}`,
    "wallpaper composition",
    "high detail",
    "cinematic lighting",
    "no text",
    "no watermark"
  ].join(", ");
}

export function buildWallpaperTitle(input: GenerateWallpaperInput, index: number) {
  const theme = input.theme
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const mood = input.mood.charAt(0).toUpperCase() + input.mood.slice(1);

  return `${theme} ${mood} ${index + 1}`;
}

export function buildWallpaperDescription(input: GenerateWallpaperInput, categoryName: string) {
  return `${categoryName} wallpaper focused on ${input.theme}, shaped by a ${input.mood} mood and ${input.style} styling with crisp composition for ${input.orientation} screens.`;
}
