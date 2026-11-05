import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { imageSrc } from "@/lib/image-src";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

type Ministry = {
  _sys?: {
    filename?: string;
  };
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  linkText?: string;
  link?: string;
  order?: number;
  isActive?: boolean;
};

type MinistryGridProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  columns?: 2 | 3 | 4 | string;
  ministries?: Ministry[];
  tinaData?: any;
};

export function MinistryGrid({
  eyebrow,
  heading,
  description,
  columns = 3,
  ministries,
  tinaData,
}: MinistryGridProps) {
  const safeMinistries = (ministries ?? []).filter(
    (ministry) => ministry && ministry.isActive !== false
  );

  const columnCount = [2, 3, 4].includes(Number(columns))
    ? (Number(columns) as 2 | 3 | 4)
    : 3;

  const columnStyles = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <Section spacing="large">
      <Container>
        <div className="mb-12 max-w-2xl">
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
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {heading}
          </h2>

          {description && (
            <p
              data-tina-field={tinaField(tinaData, "description")}
              className="mt-5 text-lg leading-relaxed text-foreground/70"
            >
              {description}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 gap-8 ${columnStyles[columnCount]}`}>
          {safeMinistries.map((ministry, index) => {
            const ministryImage = imageSrc(ministry.image);

            const ministryLink =
              ministry.link || `/ministries/${ministry._sys?.filename || ""}`;

            return (
              <article
                key={ministry._sys?.filename || index}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background"
              >
                {ministryImage && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={ministryImage}
                      alt={ministry.imageAlt || ministry.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {ministry.title}
                  </h3>

                  {ministry.description && (
                    <p className="mt-3 leading-relaxed text-foreground/70">
                      {ministry.description}
                    </p>
                  )}

                  {ministryLink && (
                    <div className="mt-auto pt-6">
                      {ministryLink.startsWith("/") ? (
                        <Link
                          href={ministryLink}
                          className="inline-flex font-medium text-primary transition hover:opacity-75"
                        >
                          {ministry.linkText || "Learn More"} →
                        </Link>
                      ) : (
                        <a
                          href={ministryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex font-medium text-primary transition hover:opacity-75"
                        >
                          {ministry.linkText || "Learn More"} →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}