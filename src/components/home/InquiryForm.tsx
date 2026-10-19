"use client";

import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { validateInquiry, type InquiryInput } from "@/lib/validation";

const INTERESTS = ["Buying", "Selling", "Leasing", "General enquiry"];

type InquiryFormProps = {
  fixedInterest?: string;
  compact?: boolean;
};

export function InquiryForm({ fixedInterest, compact = false }: InquiryFormProps) {
  const [form, setForm] = useState<InquiryInput>({
    name: "",
    email: "",
    phone: "",
    interest: fixedInterest ?? "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof InquiryInput) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateInquiry(form);
    setErrors(result as Record<string, string>);
    if (Object.keys(result).length > 0) return;

    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-white px-5 py-6 text-center"
      >
        <p className="font-display text-xl">Thank you — we&apos;ll be in touch.</p>
        <p className="mt-2 text-sm text-ink/65">
          A Haven advisor will reply within one business day.
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted">
          Demo form — enquiries are simulated.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? "" : "mt-6"}>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          error={errors.phone}
          autoComplete="tel"
          required
        />

        {!fixedInterest ? (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              I&apos;m interested in
            </span>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  aria-pressed={form.interest === interest}
                  onClick={() => setForm({ ...form, interest })}
                  className={`min-h-11 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    form.interest === interest
                      ? "border-clay bg-clay text-white"
                      : "border-line text-ink/70 hover:border-clay/50"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            {errors.interest ? (
              <p role="alert" className="text-xs text-clay-dark">
                {errors.interest}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className={compact ? "" : "sm:col-span-2"}>
          <Field
            label="Message"
            name="message"
            as="textarea"
            value={form.message}
            onChange={set("message")}
            error={errors.message}
            rows={compact ? 3 : 5}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-clay disabled:opacity-60"
      >
        {sending
          ? "Sending…"
          : fixedInterest
            ? "Request a viewing"
            : "Send enquiry"}
      </button>
      <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-muted">
        Demo form — enquiries are simulated.
      </p>
    </form>
  );
}
