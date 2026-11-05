
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { imageSrc } from "@/lib/image-src";

type HeroProps = {
  eyebrow?: string;
  heading: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  tinaData?: any;
};

export function Hero({
  eyebrow,
  heading,
  body,
  image,
  imageAlt,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  tinaData,
}: HeroProps) {
  const imageUrl = imageSrc(image);

  return (
    <section className="relative min-h-[620px] overflow-hidden bg-foreground md:min-h-[720px]">
      {imageUrl && (
        <div
          data-tina-field={tinaField(tinaData, "image")}
          className="absolute inset-0 bg-cover bg-center"
          role={imageAlt ? "img" : undefined}
          aria-label={imageAlt || undefined}
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      )}

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto flex min-h-[620px] max-w-site items-end px-6 pb-16 pt-32 md:min-h-[720px] md:pb-24 lg:px-8">
        <div className="max-w-2xl text-white">
          {eyebrow && (
            <p
              data-tina-field={tinaField(tinaData, "eyebrow")}
              className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-white/75"
            >
              {eyebrow}
            </p>
          )}

          <h1
            data-tina-field={tinaField(tinaData, "heading")}
            className="max-w-xl text-5xl font-medium leading-[1.08] tracking-tight md:text-7xl"
          >
            {heading}
          </h1>

          {body && (
            <p
              data-tina-field={tinaField(tinaData, "body")}
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/85 md:text-xl"
            >
              {body}
            </p>
          )}

          <div className="mt-9 flex flex-wrap gap-4">
            {primaryButtonText && primaryButtonLink && (
              <Link
                href={primaryButtonLink}
                data-tina-field={tinaField(tinaData, "primaryButtonText")}
                className="inline-flex items-center justify-center rounded-button bg-white px-7 py-4 text-sm font-semibold text-foreground! transition hover:bg-white/90"
              >
                {primaryButtonText}
              </Link>
            )}

            {secondaryButtonText && secondaryButtonLink && (
              <Link
                href={secondaryButtonLink}
                data-tina-field={tinaField(tinaData, "secondaryButtonText")}
                className="inline-flex items-center justify-center rounded-button border border-white/50 px-7 py-4 text-sm font-medium !text-white transition hover:bg-white/10"
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
