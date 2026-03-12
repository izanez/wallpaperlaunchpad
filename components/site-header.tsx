import Link from "next/link";
import { FavoritesLink } from "@/components/favorites-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/collections", label: "Collections" },
  { href: "/pricing", label: "Pricing" },
  { href: "/categories/fantasy-wallpapers", label: "Categories" },
  { href: "/admin/generate", label: "Admin" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold tracking-[0.18em] text-cyan-100">
            WL
          </span>
          <span className="text-lg font-semibold tracking-[0.18em] text-white">
            WallpaperLaunchpad
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <nav className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <FavoritesLink />
          <Link
            href="/browse"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-100"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </header>
  );
}
