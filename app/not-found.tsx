import Link from "next/link";

export default function NotFound() {
  return (
    <div className="glass-panel rounded-[2rem] p-10 text-center">
      <h1 className="text-3xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 text-slate-300">The requested wallpaper page does not exist.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950"
      >
        Return home
      </Link>
    </div>
  );
}
