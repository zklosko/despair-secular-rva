
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

type NextStepItem = {
  _key?: string;
  title: string;
  description?: string;
  linkText?: string;
  link?: string;
};

type NextStepsProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  items?: NextStepItem[] | null;
  tinaData?: any;
};

export function NextSteps({
  eyebrow,
  heading,
  description,
  items,
  tinaData,
}: NextStepsProps) {
  const safeItems = items || [];

  return (
    <Section background="muted" spacing="large">
      <Container>
        <div className="mb-14 max-w-2xl">
          {eyebrow && (
            <p
              data-tina-field={tinaField(tinaData, "eyebrow")}
              className="mb-4 text-sm font-medium text-primary"
            >
              {eyebrow}
            </p>
          )}

          <h2
            data-tina-field={tinaField(tinaData, "heading")}
            className="text-3xl font-medium tracking-tight md:text-5xl"
          >
            {heading}
          </h2>

          {description && (
            <p
              data-tina-field={tinaField(tinaData, "description")}
              className="mt-5 text-base leading-relaxed text-muted md:text-lg"
            >
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-x-12 md:grid-cols-3">
          {safeItems.map((step, index) => (
            <article
              key={step._key || index}
              className="border-t border-border py-8 md:py-10"
            >
              <p className="text-xs font-medium tracking-wider text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h3
                data-tina-field={tinaField(
                  tinaData,
                  `items.${index}.title`
                )}
                className="mt-6 text-2xl font-medium tracking-tight"
              >
                {step.title}
              </h3>

              {step.description && (
                <p
                  data-tina-field={tinaField(
                    tinaData,
                    `items.${index}.description`
                  )}
                  className="mt-4 text-base leading-relaxed text-muted"
                >
                  {step.description}
                </p>
              )}

              {step.link && step.linkText && (
                <Link
                  href={step.link}
                  data-tina-field={tinaField(
                    tinaData,
                    `items.${index}.link`
                  )}
                  className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <span
                    data-tina-field={tinaField(
                      tinaData,
                      `items.${index}.linkText`
                    )}
                  >
                    {step.linkText}
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
