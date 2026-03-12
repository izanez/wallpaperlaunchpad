"use client";

import { useMemo, useState } from "react";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import { getWallpaperOrientation } from "@/lib/wallpaper";
import type { Wallpaper } from "@/lib/types";

type CategoryOption = {
  slug: string;
  name: string;
};

type FilterOptions = {
  categories: CategoryOption[];
  formats: string[];
  moods: string[];
  styles: string[];
  tags: string[];
};

type SortOption = "newest" | "alphabetical" | "random";

function shuffle<T>(items: T[]) {
  const clone = [...items];

  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }

  return clone;
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  disabled = false,
  allLabel = "All"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
  allLabel?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-80"
      >
        <option value="" className="bg-slate-950">
          {allLabel}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-950">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function WallpaperBrowser({
  wallpapers,
  filterOptions,
  title,
  description,
  lockedCategorySlug
}: {
  wallpapers: Wallpaper[];
  filterOptions: FilterOptions;
  title?: string;
  description?: string;
  lockedCategorySlug?: string;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(lockedCategorySlug ?? "");
  const [format, setFormat] = useState("");
  const [mood, setMood] = useState("");
  const [style, setStyle] = useState("");
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const filteredWallpapers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = wallpapers.filter((wallpaper) => {
      const categoryName =
        filterOptions.categories.find((item) => item.slug === wallpaper.category)?.name ?? "";
      const matchesSearch =
        !query ||
        wallpaper.title.toLowerCase().includes(query) ||
        wallpaper.tags.some((item) => item.toLowerCase().includes(query)) ||
        wallpaper.category.toLowerCase().includes(query) ||
        categoryName.toLowerCase().includes(query);

      const matchesCategory = !category || wallpaper.category === category;
      const matchesFormat = !format || getWallpaperOrientation(wallpaper) === format;
      const matchesMood = !mood || wallpaper.mood === mood;
      const matchesStyle = !style || wallpaper.style === style;
      const matchesTag = !tag || wallpaper.tags.includes(tag);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFormat &&
        matchesMood &&
        matchesStyle &&
        matchesTag
      );
    });

    if (sort === "alphabetical") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "random") {
      return shuffle(filtered);
    }

    return [...filtered].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [category, filterOptions.categories, format, mood, search, sort, style, tag, wallpapers]);

  const hasActiveFilters = Boolean(search || category || format || mood || style || tag);

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {title ? <h2 className="text-2xl font-semibold text-white">{title}</h2> : null}
            {description ? (
              <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
            ) : null}
          </div>
          <p className="text-sm text-slate-400">
            {filteredWallpapers.length} result{filteredWallpapers.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
          <label className="grid gap-2 lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Search</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, tag, or category"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500"
            />
          </label>
          <FilterSelect
            label="Sort"
            value={sort}
            onChange={(value) => setSort(value as SortOption)}
            options={[
              { value: "newest", label: "Newest" },
              { value: "alphabetical", label: "Alphabetical" },
              { value: "random", label: "Random" }
            ]}
            allLabel="Newest"
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
            disabled={Boolean(lockedCategorySlug)}
            allLabel="All categories"
            options={filterOptions.categories.map((item) => ({
              value: item.slug,
              label: item.name
            }))}
          />
          <FilterSelect
            label="Format"
            value={format}
            onChange={setFormat}
            allLabel="All formats"
            options={filterOptions.formats.map((item) => ({
              value: item,
              label: item.charAt(0).toUpperCase() + item.slice(1)
            }))}
          />
          <FilterSelect
            label="Mood"
            value={mood}
            onChange={setMood}
            allLabel="All moods"
            options={filterOptions.moods.map((item) => ({
              value: item,
              label: item
            }))}
          />
          <FilterSelect
            label="Style"
            value={style}
            onChange={setStyle}
            allLabel="All styles"
            options={filterOptions.styles.map((item) => ({
              value: item,
              label: item
            }))}
          />
          <FilterSelect
            label="Tag"
            value={tag}
            onChange={setTag}
            allLabel="All tags"
            options={filterOptions.tags.map((item) => ({
              value: item,
              label: item
            }))}
          />
        </div>

        {hasActiveFilters ? (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-sm text-slate-300">Filters applied to the current wallpaper set.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory(lockedCategorySlug ?? "");
                setFormat("");
                setMood("");
                setStyle("");
                setTag("");
                setSort("newest");
              }}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-cyan-300/30 hover:bg-white/5"
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </section>

      {filteredWallpapers.length > 0 ? (
        <WallpaperGrid wallpapers={filteredWallpapers} />
      ) : (
        <div className="glass-panel rounded-[2rem] px-6 py-14 text-center">
          <h3 className="text-2xl font-semibold text-white">No wallpapers matched</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Try a different search term or clear one of the filters to broaden the results.
          </p>
        </div>
      )}
    </div>
  );
}
