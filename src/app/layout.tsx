import type { Metadata } from "next";
import "@/app/globals.css"
import { Header } from "@/lib/components/layout/Header";
import { Footer } from "@/lib/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Despair | Richmond, VA",
    template: "%s | Despire",
  },
  description: "There is no hope, only despair."
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}