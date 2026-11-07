"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { contact, person } from "@content/site";
import { Check, Copy, Linkedin, Mail, Phone, Pin } from "../ui/Icons";
import { Magnetic } from "../ui/Magnetic";
import { Reveal, RevealLines } from "../ui/Reveal";
import { EASE } from "../ui/motion";

/**
 * Formulier: als NEXT_PUBLIC_FORM_ENDPOINT is ingesteld (bv. Formspree
 * "https://formspree.io/f/xxxx"), wordt het bericht daar echt naartoe gestuurd.
 * Zonder endpoint opent de knop eerlijk je eigen e-mailapp met het bericht ingevuld.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [topic, setTopic] = useState(contact.topics[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Record<string, string> = {};
    if (name.length < 2) next.name = "Vul je naam in.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Vul een geldig e-mailadres in.";
    if (message.length < 10) next.message = "Schrijf een bericht van minimaal 10 tekens.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`${topic} — kennismaking via website`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, onderwerp: topic }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const field =
    "peer w-full border-b border-line-strong bg-transparent pt-7 pb-3 text-lg text-ink outline-none transition-colors placeholder:text-transparent focus:border-gold";
  const label =
    "pointer-events-none absolute top-7 left-0 text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-60" />
      <div className="container-x">
        <p className="eyebrow mb-6">09 — {contact.eyebrow}</p>
        <h2 id="contact-title" className="font-display text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.92] font-light">
          <RevealLines lines={[contact.title, <em key="a">{contact.titleAccent}</em>]} />
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-lg text-muted">{contact.intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-10 divide-y divide-line border-y border-line">
                <li className="flex items-center justify-between gap-4 py-5">
                  <a href={`mailto:${person.email}`} className="group flex min-w-0 items-center gap-4">
                    <Mail className="size-5 shrink-0 text-gold" />
                    <span className="truncate text-lg transition-colors group-hover:text-gold">{person.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="relative inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-xs text-muted transition-colors hover:border-gold hover:text-gold"
                    aria-label="Kopieer e-mailadres"
                  >
                    {copied ? <Check className="size-4 text-gold" /> : <Copy className="size-4" />}
                    {copied ? "Gekopieerd" : "Kopieer"}
                  </button>
                </li>
                <li className="py-5">
                  <a href={`tel:${person.phoneHref}`} className="group flex items-center gap-4">
                    <Phone className="size-5 text-gold" />
                    <span className="text-lg transition-colors group-hover:text-gold">{person.phoneDisplay}</span>
                  </a>
                </li>
                <li className="flex items-center gap-4 py-5">
                  <Pin className="size-5 text-gold" />
                  <span className="text-lg">{person.region}</span>
                </li>
                {person.linkedin && (
                  <li className="py-5">
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                      <Linkedin className="size-5 text-gold" />
                      <span className="text-lg transition-colors group-hover:text-gold">LinkedIn</span>
                    </a>
                  </li>
                )}
              </ul>
            </Reveal>
            <p className="mt-6 text-xs text-muted">{contact.privacy}</p>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.15}>
            <form onSubmit={submit} noValidate className="rounded-[2rem] border border-line bg-surface/70 p-6 backdrop-blur md:p-10">
              <fieldset>
                <legend className="eyebrow mb-4">Waar gaat het over?</legend>
                <div className="flex flex-wrap gap-2">
                  {contact.topics.map((t) => (
                    <label
                      key={t}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${
                        topic === t ? "border-gold bg-gold text-on-gold" : "border-line-strong text-muted hover:border-gold hover:text-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={t}
                        checked={topic === t}
                        onChange={() => setTopic(t)}
                        className="sr-only"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {(
                  [
                    ["name", "Je naam", "text", "name"],
                    ["email", "Je e-mailadres", "email", "email"],
                  ] as const
                ).map(([n, l, type, ac]) => (
                  <div key={n} className="relative">
                    <input
                      id={`f-${n}`}
                      name={n}
                      type={type}
                      autoComplete={ac}
                      placeholder={l}
                      aria-invalid={!!errors[n]}
                      aria-describedby={errors[n] ? `e-${n}` : undefined}
                      className={field}
                    />
                    <label htmlFor={`f-${n}`} className={label}>
                      {l}
                    </label>
                    {errors[n] && (
                      <p id={`e-${n}`} className="mt-2 text-sm text-red-400">
                        {errors[n]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="relative mt-6">
                <textarea
                  id="f-message"
                  name="message"
                  rows={4}
                  placeholder="Je bericht"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "e-message" : undefined}
                  className={`${field} resize-none`}
                />
                <label htmlFor="f-message" className={label}>
                  Je bericht
                </label>
                {errors.message && (
                  <p id="e-message" className="mt-2 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-gold px-8 font-medium text-on-gold transition-colors hover:bg-gold-2 disabled:opacity-60"
                  >
                    {status === "sending" ? "Versturen…" : ENDPOINT ? "Verstuur bericht" : "Verstuur via je e-mailapp"}
                    <Mail className="size-5 transition-transform duration-500 group-hover:-rotate-12" />
                  </button>
                </Magnetic>
                <AnimatePresence>
                  {(status === "sent" || status === "error") && (
                    <motion.p
                      role="status"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: EASE }}
                      className={`text-sm ${status === "sent" ? "text-gold" : "text-red-400"}`}
                    >
                      {status === "sent"
                        ? "Bedankt! Je bericht is verstuurd. Ik reageer zo snel mogelijk."
                        : `Er ging iets mis. Mail me direct op ${person.email}.`}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
