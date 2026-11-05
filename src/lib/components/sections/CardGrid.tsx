
import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { imageSrc } from "@/lib/image-src";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

type Card = {
  _key?: string;
  image?: string;
  imageAlt?: string;
  heading: string;
  description?: string;
  linkText?: string;
  link?: string;
};

type CardGridProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  columns?: 2 | 3 | 4 | string;
  cards?: Card[] | null;
  tinaData?: any;
};

export function CardGrid({
  eyebrow,
  heading,
  description,
  columns = 3,
  cards,
  tinaData,
}: CardGridProps) {
  const safeCards = cards || [];

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
          {safeCards.map((card, index) => {
            const cardImage = imageSrc(card.image);

            return (
              <article
                key={card._key || index}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background"
              >
                {cardImage && (
                  <div
                    data-tina-field={tinaField(tinaData, `cards.${index}.image`)}
                    className="relative aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={cardImage}
                      alt={card.imageAlt || card.heading}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <h3
                    data-tina-field={tinaField(tinaData, `cards.${index}.heading`)}
                    className="text-xl font-semibold tracking-tight"
                  >
                    {card.heading}
                  </h3>

                  {card.description && (
                    <p
                      data-tina-field={tinaField(tinaData, `cards.${index}.description`)}
                      className="mt-3 leading-relaxed text-foreground/70"
                    >
                      {card.description}
                    </p>
                  )}

                  {card.link && card.linkText && (
                    <div className="mt-auto pt-6">
                      {card.link.startsWith("/") ? (
                        <Link
                          href={card.link}
                          data-tina-field={tinaField(tinaData, `cards.${index}.link`)}
                          className="inline-flex font-medium text-primary transition hover:opacity-75"
                        >
                          <span data-tina-field={tinaField(tinaData, `cards.${index}.linkText`)}>
                            {card.linkText}
                          </span>{" "}
                          →
                        </Link>
                      ) : (
                        <a
                          href={card.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-tina-field={tinaField(tinaData, `cards.${index}.link`)}
                          className="inline-flex font-medium text-primary transition hover:opacity-75"
                        >
                          <span data-tina-field={tinaField(tinaData, `cards.${index}.linkText`)}>
                            {card.linkText}
                          </span>{" "}
                          →
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
