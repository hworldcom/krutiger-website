import type { Metadata } from "next";

import { NotFoundContent } from "@/components/layout/not-found-content";
import { bodyFont, headingFont } from "@/styles/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "404 | KRUTIGER",
  description: "The requested KRUTIGER page could not be found.",
};

export default function GlobalNotFound() {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="de"
      className={`${bodyFont.variable} ${headingFont.variable}`}
    >
      <body>
        <main>
          <NotFoundContent />
        </main>
      </body>
    </html>
  );
}
