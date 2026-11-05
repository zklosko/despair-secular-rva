
"use client";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";

type RichTextContentProps = {
  eyebrow?: string;
  heading?: string;
  content?: any;
  background?: "default" | "muted" | "dark";
  tinaData?: any;
};

export function RichTextContent({
  eyebrow,
  heading,
  content,
  background = "default",
  tinaData,
}: RichTextContentProps) {
  const backgroundStyles = {
    default: "bg-background text-foreground",
    muted: "bg-muted text-foreground",
    dark: "bg-foreground text-background",
  };

  const textStyles = {
    default: "prose-headings:text-foreground prose-p:text-foreground/80",
    muted: "prose-headings:text-foreground prose-p:text-foreground/80",
    dark: "prose-headings:text-background prose-p:text-background/80",
  };

  return (
    <section className={`py-16 md:py-24 ${backgroundStyles[background]}`}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {eyebrow && (
          <p
            data-tina-field={tinaField(tinaData, "eyebrow")}
            className="mb-4 text-sm font-medium uppercase tracking-wide text-primary"
          >
            {eyebrow}
          </p>
        )}

        {heading && (
          <h2
            data-tina-field={tinaField(tinaData, "heading")}
            className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {heading}
          </h2>
        )}

        {content && (
          <div
            data-tina-field={tinaField(tinaData, "content")}
            className={`prose max-w-none prose-lg ${textStyles[background]}`}
          >
            <TinaMarkdown content={content} />
          </div>
        )}
      </div>
    </section>
  );
}
