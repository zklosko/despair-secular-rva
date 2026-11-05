
import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { imageSrc } from "@/lib/image-src";

type ImageTextProps = {
  eyebrow?: string;
  heading: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: string;
  tinaData?: any;
};

export function ImageText({
  eyebrow,
  heading,
  body,
  image,
  imageAlt,
  buttonText,
  buttonLink,
  tinaData,
}: ImageTextProps) {
  const imageUrl = imageSrc(image);

  return (
    <section className="bg-muted-background py-20 md:py-28">
      <div
        className={`mx-auto grid max-w-site items-center gap-12 px-6 md:gap-16 lg:px-8 ${
          imageUrl ? "md:grid-cols-2" : ""
        }`}
      >
        {imageUrl && (
          <div
            data-tina-field={tinaField(tinaData, "image")}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src={imageUrl}
              alt={imageAlt || ""}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="max-w-lg">
          {eyebrow && (
            <p
              data-tina-field={tinaField(tinaData, "eyebrow")}
              className="mb-5 text-sm font-medium text-primary"
            >
              {eyebrow}
            </p>
          )}

          <h2
            data-tina-field={tinaField(tinaData, "heading")}
            className="text-3xl font-medium leading-tight tracking-tight md:text-5xl"
          >
            {heading}
          </h2>

          {body && (
            <p
              data-tina-field={tinaField(tinaData, "body")}
              className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted md:text-lg"
            >
              {body}
            </p>
          )}

          {buttonText && buttonLink && (
            <Link
              href={buttonLink}
              data-tina-field={tinaField(tinaData, "buttonText")}
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {buttonText}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
