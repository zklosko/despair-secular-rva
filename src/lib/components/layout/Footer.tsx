import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-foreground text-white">
            <div className="mx-auto max-w-site px-6 py-16 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2">
                    {/* Identity */}
                    <div>
                        <Link href="/" className="text-3xl font-semibold tracking-tight">DESPAIR.</Link>
                            <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                                A community of people finding awefulness.
                            </p>
                    </div>
                    {/* Contact */}
                    <div className="md:text-right">
                        <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
                            Connect
                        </p>
                        <div className="mt-4 flex flex-col gap-3 text-sm md:items-end">
                            <Link href="/visit" className="hover:text-white/70">Plan your visit</Link>
                            <Link href="/watch" className="hover:text-white/70">Watch online</Link>
                            <Link href="/about" className="hover:text-white/70">About Despair</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/15 pt-6 text-xs text-white/45">
                    {/* © {new Date().getFullYear()} Despair Secular. All rights reserved. */}
                    © 2026 Despair Secular. All rights reserved.
                </div>
            </div>
        </footer>
    )
}