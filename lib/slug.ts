export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function uniqueSlug(baseValue: string, existingSlugs: string[]) {
  const base = slugify(baseValue);

  if (!existingSlugs.includes(base)) {
    return base;
  }

  let index = 2;
  while (existingSlugs.includes(`${base}-${index}`)) {
    index += 1;
  }

  return `${base}-${index}`;
}
