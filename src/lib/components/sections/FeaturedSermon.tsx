
import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

type Sermon = {
  title: string;
  description?: string;
  videoUrl?: string;
  date?: string;
  thumbnail?: string;
  speaker?: {
    name: string;
  };
  series?: {
    title: string;
  };
};

type FeaturedSermonProps = {
  eyebrow?: string;
  heading: string;
  sermon?: Sermon;
  buttonText?: string;
  buttonLink?: string | null;
  tinaData?: any;
};

export function FeaturedSermon({
  eyebrow,
  heading,
  sermon,
  buttonText = "Explore all messages",
  buttonLink,
  tinaData,
}: FeaturedSermonProps) {
  const thumbnailUrl = sermon?.thumbnail || undefined;
  const safeButtonLink = buttonLink || "/watch";
  const safeVideoUrl = sermon?.videoUrl || safeButtonLink;

  return (
    <section
      className="bg-background py-20 md:py-28"
      aria-labelledby="featured-sermon-heading"
    >
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            {eyebrow && (
              <p
                data-tina-field={tinaField(tinaData, "eyebrow")}
                className="mb-4 text-sm font-medium text-primary"
              >
                {eyebrow}
              </p>
            )}

            <h2
              id="featured-sermon-heading"
              data-tina-field={tinaField(tinaData, "heading")}
              className="text-3xl font-medium tracking-tight md:text-5xl"
            >
              {heading}
            </h2>
          </div>

          <Link
            href={safeButtonLink}
            data-tina-field={tinaField(tinaData, "buttonLink")}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            <span data-tina-field={tinaField(tinaData, "buttonText")}>
              {buttonText}
            </span>
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>

        {sermon && (
          <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr] md:gap-16">
            <Link
              href={safeVideoUrl}
              target={sermon.videoUrl ? "_blank" : undefined}
              rel={sermon.videoUrl ? "noopener noreferrer" : undefined}
              aria-label={`Watch ${sermon.title}`}
              data-tina-field={tinaField(tinaData, "sermon.videoUrl")}
              className="group relative block aspect-video overflow-hidden bg-muted-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {thumbnailUrl && (
                <div
                  data-tina-field={tinaField(tinaData, "sermon.thumbnail")}
                  className="absolute inset-0"
                >
                  <Image
                    src={thumbnailUrl}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 65vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/35">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-foreground shadow-lg">
                  <span className="ml-1" aria-hidden="true">▶</span>
                </span>
              </div>
            </Link>

            <div>
              <p
                data-tina-field={tinaField(tinaData, "sermon.series.title")}
                className="text-sm font-medium text-primary"
              >
                {sermon.series?.title || "Featured message"}
              </p>

              <h3
                data-tina-field={tinaField(tinaData, "sermon.title")}
                className="mt-4 text-3xl font-medium leading-tight tracking-tight md:text-4xl"
              >
                {sermon.title}
              </h3>

              {sermon.description && (
                <p
                  data-tina-field={tinaField(tinaData, "sermon.description")}
                  className="mt-5 text-muted leading-relaxed"
                >
                  {sermon.description}
                </p>
              )}

              <p className="mt-6 text-sm text-muted">
                {sermon.speaker?.name && (
                  <span
                    data-tina-field={tinaField(
                      tinaData,
                      "sermon.speaker.name"
                    )}
                  >
                    {sermon.speaker.name}
                  </span>
                )}

                {sermon.speaker?.name && sermon.date && " · "}

                {sermon.date && (
                  <span data-tina-field={tinaField(tinaData, "sermon.date")}>
                    {new Date(`${sermon.date}T12:00:00`).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                )}
              </p>

              {sermon.videoUrl && (
                <Link
                  href={sermon.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tina-field={tinaField(tinaData, "sermon.videoUrl")}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Watch the message
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
