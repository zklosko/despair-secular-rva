
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { imageSrc } from "@/lib/image-src";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

type CallToActionProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  buttonText?: string | null;
  buttonLink?: string | null;
  backgroundImage?: string;
  style?: "dark" | "muted" | "primary" | "image";
  tinaData?: any;
};

export function CallToAction({
  eyebrow,
  heading,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
  style = "dark",
  tinaData,
}: CallToActionProps) {
  const safeButtonText = buttonText || "Learn more";
  const safeButtonLink = buttonLink || "/";

  const isExternal = safeButtonLink.startsWith("http");
  const imageUrl = imageSrc(backgroundImage);

  const styles = {
    dark: "bg-foreground text-background",
    muted: "bg-muted text-foreground",
    primary: "bg-primary text-primary-foreground",
    image: "bg-foreground text-background",
  };

  return (
    <Section spacing="large" className={styles[style]}>
      <Container>
        <div className="relative overflow-hidden rounded-2xl px-8 py-16 text-center md:px-16 md:py-24">
          {style === "image" && imageUrl && (
            <>
              <div data-tina-field={tinaField(tinaData, "backgroundImage")}>
                <Image
                  src={imageUrl}
                  alt=""
                  fill
                  unoptimized
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60" />
            </>
          )}

          <div className="relative z-10 mx-auto max-w-3xl">
            {eyebrow && (
              <p
                data-tina-field={tinaField(tinaData, "eyebrow")}
                className="mb-4 text-sm font-medium uppercase tracking-wide text-primary"
              >
                {eyebrow}
              </p>
            )}

            <h2
              data-tina-field={tinaField(tinaData, "heading")}
              className="text-3xl font-semibold tracking-tight md:text-5xl"
            >
              {heading}
            </h2>

            {description && (
              <p
                data-tina-field={tinaField(tinaData, "description")}
                className="mx-auto mt-6 max-w-2xl text-lg opacity-80"
              >
                {description}
              </p>
            )}

            <a
              href={safeButtonLink}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              data-tina-field={tinaField(tinaData, "buttonLink")}
              className="mt-9 inline-flex min-h-12 items-center justify-center rounded-button bg-background px-7 py-3 text-sm font-semibold text-foreground! transition hover:opacity-90"
            >
              <span data-tina-field={tinaField(tinaData, "buttonText")}>
                {safeButtonText}
              </span>
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
