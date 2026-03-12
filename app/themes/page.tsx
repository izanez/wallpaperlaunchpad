import Link from "next/link";
import { getThemeHubs } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Wallpaper Themes | WallpaperLaunchpad",
  description:
    "Browse themed wallpaper hubs for dragons, castles, neon cities, galaxies, warriors, and ruins.",
  pathname: "/themes"
});

export default function ThemesPage() {
  const themeHubs = getThemeHubs();

  return (
    <div className="space-y-8">
      <section className="max-w-4xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Themes</p>
        <h1 className="text-4xl font-semibold text-white">Wallpaper themes people search for</h1>
        <p className="text-base leading-8 text-slate-300">
          Jump into specific wallpaper themes like dragons, galaxies, neon cities, warriors, and
          ruins with curated links to relevant categories, packs, and visual recommendations.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {themeHubs.map((theme) => (
          <Link
            key={theme.slug}
            href={`/themes/${theme.slug}`}
            className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Theme Hub</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{theme.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{theme.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
