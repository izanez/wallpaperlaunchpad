import Link from "next/link";
import { getTagSlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Wallpaper Tags | WallpaperLaunchpad",
  description:
    "Browse wallpaper tags like dragons, neon, galaxies, warriors, ruins, portrait, and more.",
  pathname: "/tags"
});

export default function TagsPage() {
  const tags = getTagSlugs();

  return (
    <div className="space-y-8">
      <section className="max-w-4xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Tags</p>
        <h1 className="text-4xl font-semibold text-white">Browse wallpaper tags and search terms</h1>
        <p className="text-base leading-8 text-slate-300">
          Explore keyword-focused wallpaper pages for common themes and visual motifs across the
          catalog.
        </p>
      </section>

      <div className="glass-panel rounded-[2rem] p-8">
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
