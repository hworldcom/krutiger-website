"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { Button, Container } from "@/components/ui";
import { defaultLocale, isLocale } from "@/i18n/config";
import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

const clientDictionaries = { de, en } as const;

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  retry: () => void;
}>;

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  const params = useParams<{ locale?: string }>();
  const activeLocale =
    params.locale && isLocale(params.locale) ? params.locale : defaultLocale;
  const content = clientDictionaries[activeLocale].error;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-screen items-center py-section">
      <Container>
        <p className="font-display text-sm font-bold tracking-[0.22em] text-signal uppercase">
          {content.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl">
          {content.title}
        </h1>
        <p className="mt-8 max-w-copy text-lg leading-8 text-copy-muted">
          {content.description}
        </p>
        <div className="mt-10">
          <Button onClick={retry}>{content.retryAction}</Button>
        </div>
      </Container>
    </section>
  );
}
