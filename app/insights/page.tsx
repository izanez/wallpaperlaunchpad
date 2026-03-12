import Link from "next/link";
import { getIntentPages } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Wallpaper Insights | WallpaperLaunchpad",
  description:
    "Comparison and intent pages for choosing the best AI wallpapers for desktop, mobile, OLED, and gaming setups.",
  pathname: "/insights"
});

export default function InsightsPage() {
  const pages = getIntentPages();

  return (
    <div className="space-y-8">
      <section className="max-w-4xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Insights</p>
        <h1 className="text-4xl font-semibold text-white">Comparison and intent pages</h1>
        <p className="text-base leading-8 text-slate-300">
          Browse decision-focused wallpaper pages for desktop vs mobile, OLED screens, gaming
          setups, and other high-intent searches.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/insights/${page.slug}`}
            className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Insight</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{page.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
