import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";

const root = process.cwd();
const wallpapersPath = path.join(root, "data", "wallpapers.json");

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const imageModel = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1-mini";

const specs = [
  {
    title: "Castle of Aurora Peaks",
    category: "fantasy-wallpapers",
    mood: "majestic",
    style: "cinematic fantasy",
    description:
      "A luminous mountain citadel glows above a sea of clouds while aurora light cuts across icy battlements.",
    tags: ["castles", "kingdoms", "mountains", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "free"
  },
  {
    title: "Dragon Shrine Falls",
    category: "fantasy-wallpapers",
    mood: "mythic",
    style: "epic fantasy art",
    description:
      "Ancient dragon statues tower over a cliffside shrine with bright waterfalls and storm-washed stone bridges.",
    tags: ["dragons", "temples", "waterfalls", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "free"
  },
  {
    title: "Emerald Spellwoods",
    category: "fantasy-wallpapers",
    mood: "enchanted",
    style: "luminous fantasy",
    description:
      "Glowing green mist winds through a deep magical forest where rune-lit trees and floating spores frame the path.",
    tags: ["magic", "forests", "runes", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "premium"
  },
  {
    title: "Cathedral of Black Rain",
    category: "dark-fantasy-wallpapers",
    mood: "ominous",
    style: "gothic dark fantasy",
    description:
      "A ruined cathedral rises through black rain and pale lightning with towering arches and cold fire at its gates.",
    tags: ["cathedrals", "ruins", "storm", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "premium"
  },
  {
    title: "Hollow Crown Procession",
    category: "dark-fantasy-wallpapers",
    mood: "ritualistic",
    style: "dark fantasy concept art",
    description:
      "Shadowed figures march beneath a skeletal crown monument through ash, fog, and moonlit banners.",
    tags: ["cursed", "moonlight", "ritual", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "premium"
  },
  {
    title: "Bone Lantern Marsh",
    category: "dark-fantasy-wallpapers",
    mood: "haunting",
    style: "grim atmospheric art",
    description:
      "Ghostly lanterns and crooked bones illuminate a drowned marsh where ruined idols emerge from the mist.",
    tags: ["spectral", "swamp", "fog", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "free"
  },
  {
    title: "Signal Tower Skyline",
    category: "cyberpunk-wallpapers",
    mood: "charged",
    style: "tech-noir",
    description:
      "A giant signal spire pierces a neon skyline while monorails, holograms, and rain streak across the district.",
    tags: ["neon", "megacity", "skylines", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "free"
  },
  {
    title: "Chrome Market Rush",
    category: "cyberpunk-wallpapers",
    mood: "kinetic",
    style: "cyberpunk concept art",
    description:
      "Crowded chrome bazaars glow with magenta ads, wet pavement reflections, and rushing silhouettes in the foreground.",
    tags: ["cities", "rain", "holograms", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "free"
  },
  {
    title: "Midnight Monorail Echoes",
    category: "cyberpunk-wallpapers",
    mood: "restless",
    style: "futuristic noir",
    description:
      "Suspended monorails cut through a midnight city canyon filled with cyan glow, layered signs, and electric fog.",
    tags: ["monorail", "neon", "night", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "premium"
  },
  {
    title: "Vertical Neon Signal",
    category: "cyberpunk-wallpapers",
    mood: "sleek",
    style: "amoled cyberpunk",
    description:
      "A portrait alley of razor-sharp neon symbols, dark reflective surfaces, and layered light built for OLED phones.",
    tags: ["portrait", "amoled", "neon", "mobile"],
    width: 1024,
    height: 1536,
    accessLevel: "premium"
  },
  {
    title: "Sapphire Rift Voyager",
    category: "space-wallpapers",
    mood: "awe",
    style: "cinematic space art",
    description:
      "A lone exploration ship glides toward a brilliant sapphire rift opening between clouds of stars and dust.",
    tags: ["cosmos", "stars", "ships", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "free"
  },
  {
    title: "Moons of Velara",
    category: "space-wallpapers",
    mood: "serene",
    style: "planetary concept art",
    description:
      "Twin moons hover over a cobalt planet horizon while distant rings and soft starfields create layered depth.",
    tags: ["planets", "moons", "galaxies", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "free"
  },
  {
    title: "Eclipse Over Ion Sea",
    category: "space-wallpapers",
    mood: "mysterious",
    style: "cosmic surrealism",
    description:
      "A violet eclipse pours light over a reflective alien sea with luminous atmosphere and distant orbital debris.",
    tags: ["eclipse", "nebula", "planets", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "premium"
  },
  {
    title: "Boss Gate Awakening",
    category: "gaming-wallpapers",
    mood: "intense",
    style: "gaming key art",
    description:
      "A colossal raid gate opens beneath red energy as armored players face a giant silhouette and falling sparks.",
    tags: ["bosses", "arenas", "raids", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "free"
  },
  {
    title: "Arcane Loot Vault",
    category: "gaming-wallpapers",
    mood: "rewarding",
    style: "stylized adventure art",
    description:
      "A treasure chamber of glowing loot, magical seals, and polished armor bursts with radiant color and depth.",
    tags: ["loot", "quests", "magic", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "free"
  },
  {
    title: "Neon Arena Clash",
    category: "gaming-wallpapers",
    mood: "competitive",
    style: "esports sci-fi art",
    description:
      "Fast-moving fighters collide in a neon arena framed by giant displays, smoke, and dramatic side lighting.",
    tags: ["arenas", "esports", "action", "desktop"],
    width: 1536,
    height: 1024,
    accessLevel: "premium"
  },
  {
    title: "Obsidian Bloom Screen",
    category: "mobile-wallpapers",
    mood: "minimal",
    style: "amoled floral abstract",
    description:
      "A dark portrait wallpaper with obsidian petals, soft glow, and clean negative space for icons and widgets.",
    tags: ["portrait", "amoled", "minimal", "lockscreen"],
    width: 1024,
    height: 1536,
    accessLevel: "free"
  },
  {
    title: "Prism Pulse Drift",
    category: "mobile-wallpapers",
    mood: "vibrant",
    style: "gradient glass abstract",
    description:
      "Vertical ribbons of prism light drift across deep shadow with glossy gradients and a crisp premium phone composition.",
    tags: ["portrait", "glow", "gradient", "mobile"],
    width: 1024,
    height: 1536,
    accessLevel: "free"
  },
  {
    title: "Moon Sigil Lock Screen",
    category: "mobile-wallpapers",
    mood: "calm",
    style: "mystic minimalism",
    description:
      "A silver moon sigil floats over dark velvet tones with subtle runic detail and space for lock-screen widgets.",
    tags: ["portrait", "moonlight", "minimal", "vertical"],
    width: 1024,
    height: 1536,
    accessLevel: "premium"
  },
  {
    title: "Crimson Circuit Vertical",
    category: "mobile-wallpapers",
    mood: "bold",
    style: "futuristic abstract",
    description:
      "Deep crimson circuitry glows through a vertical black field with sharp highlights and dense OLED contrast.",
    tags: ["portrait", "amoled", "futuristic", "mobile"],
    width: 1024,
    height: 1536,
    accessLevel: "free"
  }
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function uniqueSlug(title, existingSlugs) {
  const base = slugify(title);
  let candidate = base;
  let counter = 2;

  while (existingSlugs.has(candidate)) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }

  existingSlugs.add(candidate);
  return candidate;
}

function buildPrompt(spec) {
  const categoryLabel = spec.category.replace(/-wallpapers$/, "").replace(/-/g, " ");
  const orientation = spec.width >= spec.height ? "desktop" : "mobile";

  return [
    `${spec.title}, ${categoryLabel} wallpaper scene`,
    spec.description,
    `mood: ${spec.mood}`,
    `style: ${spec.style}`,
    `tags: ${spec.tags.join(", ")}`,
    `composition optimized for ${orientation} wallpaper`,
    "wallpaper composition",
    "high detail",
    "cinematic lighting",
    "no text",
    "no watermark"
  ].join(", ");
}

async function main() {
  const wallpapers = JSON.parse(await fs.readFile(wallpapersPath, "utf8"));
  const existingSlugs = new Set(wallpapers.map((wallpaper) => wallpaper.slug));
  const createdAt = new Date().toISOString();
  const generated = [];

  for (const spec of specs) {
    const slug = uniqueSlug(spec.title, existingSlugs);
    const size = `${spec.width}x${spec.height}`;
    const prompt = buildPrompt(spec);
    const response = await client.images.generate({
      model: imageModel,
      size,
      prompt
    });
    const base64 = response.data?.[0]?.b64_json;

    if (!base64) {
      throw new Error(`No image data returned for ${spec.title}`);
    }

    const fileName = `${slug}.png`;
    const outputDir = path.join(root, "public", "wallpapers", spec.category);
    const outputPath = path.join(outputDir, fileName);

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputPath, Buffer.from(base64, "base64"));

    generated.push({
      title: spec.title,
      slug,
      category: spec.category,
      image: `/wallpapers/${spec.category}/${fileName}`,
      tags: spec.tags,
      mood: spec.mood,
      style: spec.style,
      description: spec.description,
      width: spec.width,
      height: spec.height,
      createdAt,
      accessLevel: spec.accessLevel
    });
  }

  await fs.writeFile(
    wallpapersPath,
    `${JSON.stringify([...generated, ...wallpapers], null, 2)}\n`,
    "utf8"
  );

  console.log(`Generated ${generated.length} wallpapers using ${imageModel}.`);
}

await main();
