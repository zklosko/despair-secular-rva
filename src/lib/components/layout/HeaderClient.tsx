
"use client";

import { useState } from "react";
import Link from "next/link";

type NavigationItem = {
  label: string;
  href: string;
};

type HeaderClientProps = {
  navigation: NavigationItem[];
  visitButtonText: string;
  visitButtonLink: string;
};

export function HeaderClient({
  navigation,
  visitButtonText,
  visitButtonLink,
}: HeaderClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-20 max-w-site items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight"
          aria-label="Hope Church home"
          onClick={() => setMenuOpen(false)}
        >
          DESPAIR<span className="text-primary">.</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={visitButtonLink}
            className="hidden min-h-11 items-center justify-center rounded-button bg-primary px-5 py-3 text-sm font-medium text-primary-foreground! transition hover:opacity-90 md:inline-flex"
          >
            {visitButtonText}
          </Link>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-button border border-border text-foreground md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full border-b border-border bg-background px-6 pb-6 pt-3 shadow-lg md:hidden"
        >
          <div className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-12 items-center border-b border-border text-base font-medium text-foreground transition hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href={visitButtonLink}
              onClick={() => setMenuOpen(false)}
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-button bg-primary px-5 py-3 text-sm font-medium text-primary-foreground! transition hover:opacity-90"
            >
              {visitButtonText}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
