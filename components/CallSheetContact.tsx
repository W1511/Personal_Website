"use client";

import { site } from "@/lib/content";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CallSheetContact(_props: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    if (!open || reduce) {
      if (!open) setTimecode("00:00:00:00");
      return;
    }

    const started = Date.now();
    const tick = () => {
      const elapsed = Date.now() - started;
      const totalFrames = Math.floor((elapsed / 1000) * 24);
      const frames = totalFrames % 24;
      const totalSeconds = Math.floor(totalFrames / 24);
      const seconds = totalSeconds % 60;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const hours = Math.floor(totalSeconds / 3600);
      setTimecode(
        [hours, minutes, seconds, frames].map((n) => String(n).padStart(2, "0")).join(":"),
      );
    };

    tick();
    const id = window.setInterval(tick, 42);
    return () => window.clearInterval(id);
  }, [open, reduce]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-charcoal px-4 pt-24 pb-16 sm:px-8 sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 18%, rgba(232,90,50,0.12), transparent 46%), radial-gradient(ellipse at 50% 108%, rgba(0,0,0,0.62), transparent 50%), #140f0c",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] max-w-3xl flex-col">
        <h2 className="display text-3xl leading-[0.95] text-cream sm:text-5xl">
          GET IN TOUCH
        </h2>
        <p className="mt-3 max-w-xl text-sm text-cream/55 sm:text-base">
          Have a question, opportunity, or just want to say hello? I&apos;d love to hear from you.
        </p>

        <div className="flex flex-1 flex-col items-center justify-center py-10 sm:py-12">
          <motion.div
            layout
            className="relative w-full max-w-lg overflow-hidden"
            style={{
              borderRadius: "10px 12px 9px 11px",
              boxShadow: open
                ? "0 0 42px rgba(232,90,50,0.16), 0 22px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(250,246,238,0.08)"
                : "0 22px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(250,246,238,0.06)",
            }}
            transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative border border-cream/15 bg-[#1a1612]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(250,246,238,0.04), transparent 28%), linear-gradient(90deg, rgba(0,0,0,0.18), transparent 18%, transparent 82%, rgba(0,0,0,0.22))",
              }}
            >
              <div className="flex items-center justify-between border-b border-cream/10 px-4 py-2.5 sm:px-5">
                <p className="font-mono text-[9px] tracking-[0.28em] text-cream/40 uppercase">
                  Field recorder · Ch. 1
                </p>
                <p className="font-mono text-[10px] tabular-nums tracking-[0.18em] text-cream/55">
                  {timecode}
                </p>
              </div>

              <div className="flex items-start gap-4 px-4 pt-5 sm:px-5">
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <span
                    className={`rec-led inline-block h-2 w-2 rounded-full ${open ? "rec-led-live" : ""}`}
                    style={{
                      background: open ? "#e85a32" : "rgba(232,90,50,0.45)",
                      boxShadow: open ? "0 0 10px rgba(232,90,50,0.85)" : "0 0 6px rgba(232,90,50,0.25)",
                    }}
                    aria-hidden
                  />
                  <span
                    className={`font-mono text-[11px] tracking-[0.32em] uppercase ${
                      open ? "text-tungsten-hot" : "text-tungsten/80"
                    }`}
                  >
                    ● REC
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.22em] text-cream/30 uppercase">
                    {open ? "recording" : "standby"}
                  </span>
                </div>
                <LevelMeter active={open} reduce={Boolean(reduce)} />
              </div>

              <div className="px-4 pb-5 sm:px-5">
                <AnimatePresence initial={false} mode="wait">
                  {!open ? (
                    <motion.div
                      key="cue"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex min-h-[11.5rem] flex-col items-center justify-center text-center"
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-expanded={false}
                        className="group display text-2xl text-cream transition sm:text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
                      >
                        <span className="border-b border-cream/25 pb-1 transition group-hover:border-tungsten group-hover:text-cream">
                          LEAVE A MESSAGE
                        </span>
                      </button>
                      <p className="mt-4 font-mono text-[9px] tracking-[0.28em] text-cream/35 uppercase">
                        Press to roll · written note
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-5 space-y-4"
                      aria-expanded
                      onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.currentTarget);
                        const name = String(data.get("name") || "");
                        const email = String(data.get("email") || "");
                        const message = String(data.get("message") || "");
                        const subject = encodeURIComponent(`Portfolio note from ${name || "someone"}`);
                        const body = encodeURIComponent(
                          [`Name: ${name || "—"}`, `Email: ${email || "—"}`, "", message].join("\n"),
                        );
                        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
                      }}
                    >
                      <label className="block">
                        <span className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">
                          Your name
                        </span>
                        <input
                          name="name"
                          autoComplete="name"
                          autoFocus
                          className="mt-1.5 w-full border-0 border-b border-cream/20 bg-transparent px-0 py-2 text-sm text-cream outline-none transition placeholder:text-cream/25 focus:border-tungsten"
                          placeholder="Your name"
                        />
                      </label>
                      <label className="block">
                        <span className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">
                          Your email
                        </span>
                        <input
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="mt-1.5 w-full border-0 border-b border-cream/20 bg-transparent px-0 py-2 text-sm text-cream outline-none transition placeholder:text-cream/25 focus:border-tungsten"
                          placeholder="Your email"
                        />
                      </label>
                      <label className="block">
                        <span className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">
                          Your message
                        </span>
                        <textarea
                          name="message"
                          rows={4}
                          required
                          className="mt-1.5 w-full resize-y border-0 border-b border-cream/20 bg-transparent px-0 py-2 text-sm leading-relaxed text-cream outline-none transition placeholder:text-cream/25 focus:border-tungsten"
                          placeholder="Write your message here..."
                        />
                      </label>
                      <button
                        type="submit"
                        className="pt-2 font-mono text-[11px] tracking-[0.28em] text-tungsten uppercase transition hover:text-tungsten-hot focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
                      >
                        Send message →
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <nav
            aria-label="Production credits"
            className="mt-8 flex w-full max-w-2xl flex-col items-center gap-6 sm:mt-9 sm:flex-row sm:items-start sm:justify-evenly sm:gap-x-4"
          >
            <ContactCreditLink
              href={`mailto:${site.email}`}
              label="Email"
              detail="wardahbasil2004@gmail.com"
            />
            <span className="mt-1 hidden display text-lg text-cream/50 sm:block sm:text-xl" aria-hidden>
              ·
            </span>
            <ContactCreditLink
              href={site.socials.instagram}
              label="Instagram"
              detail="wardaheck._"
              external
            />
            <span className="mt-1 hidden display text-lg text-cream/50 sm:block sm:text-xl" aria-hidden>
              ·
            </span>
            <ContactCreditLink
              href={site.socials.linkedin}
              label="LinkedIn"
              detail="wardahbasil"
              external
            />
          </nav>
        </div>

        <p className="hand mt-auto pt-8 text-center text-base text-cream/28 sm:text-lg">
          end of reel · thanks for watching
        </p>
      </div>
    </section>
  );
}

function ContactCreditLink({
  href,
  label,
  detail,
  external = false,
}: {
  href: string;
  label: string;
  detail: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={`${label}: ${detail}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative inline-flex min-w-[9.5rem] cursor-pointer flex-col items-center px-2 pb-2 text-center transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.04] focus:outline-none"
    >
      <span className="font-mono text-[15px] tracking-[0.28em] text-cream uppercase transition duration-300 ease-out group-hover:text-tungsten group-hover:drop-shadow-[0_0_14px_rgba(232,90,50,0.45)] group-focus-visible:text-tungsten sm:text-[17px] sm:tracking-[0.32em]">
        {label}
      </span>
      <span className="mt-1.5 font-mono text-[11px] tracking-[0.04em] text-cream/45 transition duration-300 ease-out group-hover:text-cream/85 group-focus-visible:text-cream/85 sm:text-xs">
        {detail}
      </span>
      <span
        className="pointer-events-none absolute inset-x-4 bottom-0 mx-auto h-[1.5px] origin-center scale-x-0 rounded-full bg-tungsten transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        aria-hidden
      />
    </a>
  );
}

function LevelMeter({ active, reduce }: { active: boolean; reduce: boolean }) {
  const bars = [18, 34, 22, 48, 28, 40, 16, 30];

  return (
    <div className="flex h-8 items-end gap-[3px]" aria-hidden>
      {bars.map((height, i) => (
        <span
          key={i}
          className={active && !reduce ? "rec-meter-bar" : ""}
          style={{
            width: 3,
            height: active ? height : Math.max(8, height * 0.35),
            background: i > 5 ? "rgba(232,90,50,0.55)" : "rgba(18,168,159,0.45)",
            opacity: active ? 1 : 0.35,
            animationDelay: `${i * 90}ms`,
          }}
        />
      ))}
    </div>
  );
}
