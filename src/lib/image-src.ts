
export function imageSrc(image?: string | null): string | undefined {
  if (!image) return undefined;

  const cleaned = image.replace(/^public\//, "");

  if (
    cleaned.startsWith("/") ||
    cleaned.startsWith("http://") ||
    cleaned.startsWith("https://")
  ) {
    return cleaned;
  }

  return `/${cleaned}`;
}
