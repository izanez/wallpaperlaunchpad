import Link from "next/link";

export function UpgradeCTA({
  title = "Unlock premium wallpaper access",
  description = "Premium access will later include exclusive wallpaper drops, higher-value packs, and members-only collections. This page is ready for future monetization wiring.",
  compact = false
}: {
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  return (
    <div className="rounded-[1.75rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/10 via-white/5 to-transparent p-6">
      <p className="text-sm uppercase tracking-[0.24em] text-amber-100/80">Upgrade Placeholder</p>
      <h3 className={`mt-3 font-semibold text-white ${compact ? "text-xl" : "text-2xl"}`}>
        {title}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/pricing"
          className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-amber-100"
        >
          View Pricing
        </Link>
        <Link
          href="/collections"
          className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-amber-300/30 hover:bg-white/5"
        >
          Explore Packs
        </Link>
      </div>
    </div>
  );
}
