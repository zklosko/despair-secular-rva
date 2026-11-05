
import Link from "next/link";
import { Container } from "@/lib/components/ui/Container";
import { Section } from "@/lib/components/ui/Section";

export default function NotFound() {
  return (
    <Section spacing="large">
      <Container>
        <div className="mx-auto max-w-3xl py-16 text-center md:py-24">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Despair Secular
          </p>

          <p className="mb-4 text-7xl font-semibold tracking-tight text-primary md:text-9xl">
            404
          </p>

          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Looks like you've taken a wrong turn.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
            Just like the meaning of life, the page you're looking for can't be found.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-button bg-primary px-7 py-3 text-sm font-medium text-primary-foreground! transition hover:opacity-90"
            >
              Back to Home
            </Link>

            <Link
              href="/visit"
              className="inline-flex min-h-12 items-center justify-center rounded-button border border-border px-7 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
