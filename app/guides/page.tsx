import Link from "next/link";
import { getSeoGuides } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Wallpaper Guides | WallpaperLaunchpad",
  description:
    "Read AI wallpaper guides for desktop setups, mobile screens, fantasy themes, cyberpunk styles, and more.",
  pathname: "/guides"
});

export default function GuidesPage() {
  const guides = getSeoGuides();

  return (
    <div className="space-y-8">
      <section className="max-w-4xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Guides</p>
        <h1 className="text-4xl font-semibold text-white">Wallpaper guides and inspiration hubs</h1>
        <p className="text-base leading-8 text-slate-300">
          Explore curated AI wallpaper guides for desktop, mobile, fantasy, cyberpunk, space, and
          AMOLED setups with internal links to the strongest related collections and categories.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Guide</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{guide.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
