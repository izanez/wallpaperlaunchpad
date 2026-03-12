"use client";

import { useState } from "react";

type CategoryOption = {
  slug: string;
  name: string;
};

type GenerateResponse = {
  message: string;
  wallpapers: Array<{ title: string; slug: string; image: string }>;
};

const starterThemes = ["dragons", "castles", "neon cities", "galaxies", "warriors", "ruins"];

export function AdminGeneratorForm({ categories }: { categories: CategoryOption[] }) {
  const [category, setCategory] = useState(categories[0]?.slug ?? "");
  const [theme, setTheme] = useState(starterThemes[0]);
  const [mood, setMood] = useState("cinematic");
  const [style, setStyle] = useState("ultra detailed concept art");
  const [outputCount, setOutputCount] = useState(1);
  const [orientation, setOrientation] = useState<"desktop" | "mobile">("desktop");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/admin/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category,
          theme,
          mood,
          style,
          outputCount,
          orientation
        })
      });

      const payload = (await response.json()) as GenerateResponse & { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Generation failed");
      }

      setResult(payload);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unexpected generation error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form className="glass-panel rounded-[2rem] p-6" onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              {categories.map((option) => (
                <option key={option.slug} value={option.slug} className="bg-slate-950">
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Theme</span>
            <input
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              placeholder="dragons"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Mood</span>
            <input
              value={mood}
              onChange={(event) => setMood(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              placeholder="cinematic"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Style</span>
            <input
              value={style}
              onChange={(event) => setStyle(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              placeholder="ultra detailed concept art"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Output count</span>
            <input
              type="number"
              min={1}
              max={4}
              value={outputCount}
              onChange={(event) => setOutputCount(Number(event.target.value))}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Format</span>
            <select
              value={orientation}
              onChange={(event) => setOrientation(event.target.value as "desktop" | "mobile")}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              <option value="desktop" className="bg-slate-950">
                desktop
              </option>
              <option value="mobile" className="bg-slate-950">
                mobile
              </option>
            </select>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Wallpapers"}
          </button>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        </div>
      </form>

      <div className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-xl font-semibold text-white">Generation Notes</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          The generator writes image files into <code>/public/wallpapers/{"{category}"}/</code>
          and prepends matching metadata into <code>/data/wallpapers.json</code>. It requires
          <code> OPENAI_API_KEY </code> in the environment.
        </p>
        <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm text-slate-200">Suggested starter themes</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {starterThemes.map((starterTheme) => (
              <button
                type="button"
                key={starterTheme}
                onClick={() => setTheme(starterTheme)}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
              >
                {starterTheme}
              </button>
            ))}
          </div>
        </div>
        {result ? (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-cyan-100">{result.message}</p>
            {result.wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.slug}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
              >
                <p className="font-medium text-white">{wallpaper.title}</p>
                <p>{wallpaper.slug}</p>
                <p>{wallpaper.image}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
