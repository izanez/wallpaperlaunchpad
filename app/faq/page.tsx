import Link from "next/link";
import { getFaqPages } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Wallpaper FAQ | WallpaperLaunchpad",
  description:
    "Read common questions about fantasy wallpapers, cyberpunk backgrounds, mobile wallpapers, and more.",
  pathname: "/faq"
});

export default function FaqIndexPage() {
  const pages = getFaqPages();

  return (
    <div className="space-y-8">
      <section className="max-w-4xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">FAQ</p>
        <h1 className="text-4xl font-semibold text-white">Wallpaper questions answered</h1>
        <p className="text-base leading-8 text-slate-300">
          Explore FAQ pages around wallpaper types, category differences, and device-specific use
          cases.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/faq/${page.slug}`}
            className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">FAQ Page</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{page.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
