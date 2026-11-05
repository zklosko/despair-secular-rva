
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

type ClosingInvitationProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  buttonText?: string | null;
  buttonLink?: string | null;
  tinaData?: any;
};

export function ClosingInvitation({
  eyebrow,
  heading,
  description,
  buttonText,
  buttonLink,
  tinaData,
}: ClosingInvitationProps) {
  const safeButtonText = buttonText || "Plan your visit";
  const safeButtonLink = buttonLink || "/visit";

  return (
    <Section background="dark" spacing="large">
      <Container>
        <div className="mx-auto max-w-3xl py-8 text-center">
          {eyebrow && (
            <p
              data-tina-field={tinaField(tinaData, "eyebrow")}
              className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-white/60"
            >
              {eyebrow}
            </p>
          )}

          <h2
            data-tina-field={tinaField(tinaData, "heading")}
            className="text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl"
          >
            {heading}
          </h2>

          {description && (
            <p
              data-tina-field={tinaField(tinaData, "description")}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
            >
              {description}
            </p>
          )}

          {safeButtonText && (
            <Link
              href={safeButtonLink}
              data-tina-field={tinaField(tinaData, "buttonLink")}
              className="mt-9 inline-flex min-h-12 items-center justify-center rounded-button bg-white px-7 py-4 text-sm font-semibold text-foreground! transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span data-tina-field={tinaField(tinaData, "buttonText")}>
                {safeButtonText}
              </span>
            </Link>
          )}
        </div>
      </Container>
    </Section>
  );
}
