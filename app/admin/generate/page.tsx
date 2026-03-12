import { AdminGeneratorForm } from "@/components/admin-generator-form";
import { getCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Admin Generator | WallpaperLaunchpad",
  description: "Internal admin tool for generating AI wallpapers and persisting them locally.",
  pathname: "/admin/generate"
});

export default function AdminGeneratePage() {
  const categories = getCategories().map((category) => ({
    slug: category.slug,
    name: category.name
  }));

  return (
    <div className="space-y-8">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Internal Tool</p>
        <h1 className="text-4xl font-semibold text-white">Generate new wallpaper batches</h1>
        <p className="text-base leading-8 text-slate-300">
          Use prompt templates per category, generate desktop or mobile assets with the OpenAI
          image generation API, and persist files plus metadata directly into the repository.
        </p>
      </section>
      <AdminGeneratorForm categories={categories} />
    </div>
  );
}
