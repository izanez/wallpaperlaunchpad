import { UpgradeCTA } from "@/components/upgrade-cta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Pricing | WallpaperLaunchpad",
  description:
    "Preview example free and premium wallpaper access plans prepared for future monetization.",
  pathname: "/pricing"
});

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Open access to free wallpapers, basic browsing, and public collections.",
    features: [
      "Free wallpaper downloads",
      "Browse categories and collections",
      "Save favorites locally"
    ],
    accent: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
  },
  {
    name: "Premium",
    price: "$12/mo",
    description: "Placeholder plan for premium wallpapers, exclusive packs, and future gated drops.",
    features: [
      "Premium wallpaper downloads",
      "Premium collection pack access",
      "Future exclusive releases"
    ],
    accent: "border-amber-300/20 bg-amber-300/10 text-amber-100"
  },
  {
    name: "Studio",
    price: "$29/mo",
    description: "Placeholder higher-tier plan for creators, teams, or commercial wallpaper libraries.",
    features: [
      "Everything in Premium",
      "Priority premium pack releases",
      "Future commercial-ready entitlements"
    ],
    accent: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
  }
];

export default function PricingPage() {
  return (
    <div className="space-y-10">
      <section className="max-w-4xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Pricing Preview</p>
        <h1 className="text-4xl font-semibold text-white">Future-ready plans without payment wiring yet</h1>
        <p className="text-base leading-8 text-slate-300">
          This page prepares the UI and structure for monetization later. No Stripe, auth, or
          entitlement system is connected yet, but the site can now distinguish free and premium
          wallpaper access levels.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="glass-panel rounded-[2rem] p-6">
            <div className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${plan.accent}`}>
              {plan.name}
            </div>
            <p className="mt-5 text-4xl font-semibold text-white">{plan.price}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{plan.description}</p>
            <div className="mt-6 grid gap-3">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200"
                >
                  {feature}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-300/30 hover:bg-white/5"
            >
              Coming Soon
            </button>
          </div>
        ))}
      </section>

      <section>
        <UpgradeCTA
          title="Upgrade flow placeholder"
          description="Later, this section can connect to checkout, entitlement syncing, and access control. For now, it provides the future monetization destination for locked premium states across the site."
        />
      </section>
    </div>
  );
}
