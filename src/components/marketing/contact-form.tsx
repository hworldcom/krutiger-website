"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui";
import type { ContactPageCopy } from "@/i18n/dictionaries/types";

type ContactFormProps = Readonly<{
  copy: ContactPageCopy["form"];
  privacyHref: string;
  recipient: string;
}>;

type ContactFormValues = Readonly<{
  name: string;
  email: string;
  topic: string;
  message: string;
}>;

export function createContactMailto(
  recipient: string,
  copy: ContactPageCopy["form"],
  values: ContactFormValues,
) {
  const subject = `${copy.subjectPrefix}: ${values.topic}`;
  const body = [
    copy.mailGreeting,
    "",
    values.message,
    "",
    `${copy.nameLabel}: ${values.name}`,
    `${copy.emailLabel}: ${values.email}`,
  ].join("\n");

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-control border border-line bg-canvas px-4 py-3 text-base text-copy outline-none transition-colors placeholder:text-copy-muted focus:border-brand focus:ring-2 focus:ring-brand/25";

export function ContactForm({
  copy,
  privacyHref,
  recipient,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      topic: String(formData.get("topic") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setSubmitted(true);
    window.location.href = createContactMailto(recipient, copy, values);
  }

  return (
    <form
      className="border border-line bg-panel/75 p-5 sm:p-8"
      data-contact-form="true"
      onSubmit={handleSubmit}
    >
      <p className="font-display text-sm font-bold tracking-[0.22em] text-brand uppercase">
        {copy.eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-none font-extrabold uppercase sm:text-5xl">
        {copy.title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-copy-muted">
        {copy.description}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <label className="block font-display text-lg font-bold uppercase">
          {copy.nameLabel}
          <input
            autoComplete="name"
            className={fieldClassName}
            maxLength={120}
            name="name"
            placeholder={copy.namePlaceholder}
            required
            type="text"
          />
        </label>

        <label className="block font-display text-lg font-bold uppercase">
          {copy.emailLabel}
          <input
            autoComplete="email"
            className={fieldClassName}
            maxLength={254}
            name="email"
            placeholder={copy.emailPlaceholder}
            required
            type="email"
          />
        </label>
      </div>

      <label className="mt-6 block font-display text-lg font-bold uppercase">
        {copy.topicLabel}
        <select
          className={`${fieldClassName} [color-scheme:dark]`}
          name="topic"
          required
        >
          {copy.topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-6 block font-display text-lg font-bold uppercase">
        {copy.messageLabel}
        <textarea
          className={`${fieldClassName} min-h-48 resize-y font-sans leading-7 normal-case`}
          maxLength={3000}
          minLength={10}
          name="message"
          placeholder={copy.messagePlaceholder}
          required
          rows={7}
        />
      </label>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-copy-muted">
        <input
          className="mt-1 size-4 shrink-0 accent-brand"
          name="privacyAcknowledged"
          required
          type="checkbox"
        />
        <span>
          {copy.privacyPrefix}{" "}
          <Link
            className="text-copy underline hover:text-brand"
            href={privacyHref}
          >
            {copy.privacyLinkLabel}
          </Link>
          {copy.privacySuffix}
        </span>
      </label>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button type="submit">
          {copy.submitAction}
          <span aria-hidden="true">→</span>
        </Button>
        <p className="max-w-md text-sm leading-6 text-copy-muted">
          {copy.deliveryNotice}
        </p>
      </div>

      <p aria-live="polite" className="mt-5 text-sm leading-6 text-brand">
        {submitted ? copy.submittedNotice : ""}
      </p>
    </form>
  );
}
