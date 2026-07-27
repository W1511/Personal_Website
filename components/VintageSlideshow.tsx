"use client";

import type { Ticket } from "@/lib/content";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {
  slides: Ticket[];
  eyebrow: string;
  title: string;
  blurb: string;
};

export default function VintageSlideshow({ slides, eyebrow, title, blurb }: Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const active = slides[index] ?? slides[0];
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (reduce || paused || count < 2) return;
    const id = window.setInterval(() => go(index + 1), 5200);
    return () => window.clearInterval(id);
  }, [index, go, reduce, paused, count]);

  if (!active) return null;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-10 max-w-2xl">
        <p className="hand text-2xl text-tungsten sm:text-3xl">{eyebrow}</p>
        <h2 className="display text-4xl text-ink sm:text-6xl">{title}</h2>
        <p className="mt-3 text-ink-soft sm:text-lg">{blurb}</p>
      </div>

      <div
        className="grid items-stretch gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:gap-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Vintage frame — content first, not a full TV */}
        <div className="relative">
          <span className="tape absolute -top-3 left-10 z-20 h-7 w-24 -rotate-2" aria-hidden />
          <span className="tape-blue absolute top-8 -right-2 z-20 h-6 w-14 rotate-12" aria-hidden />

          <div className="relative overflow-hidden rounded-sm bg-[#1a1612] shadow-[0_28px_60px_rgba(26,22,18,0.28)]">
            {/* Film sprocket rails */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 sprocket-edge opacity-90 sm:w-6" aria-hidden />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 sprocket-edge opacity-90 sm:w-6" aria-hidden />

            <div className="relative aspect-[16/10] bg-ink sm:aspect-[3/2]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {active.posterSrc && (
                    <Image
                      src={active.posterSrc}
                      alt={active.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 720px"
                      priority={index === 0}
                    />
                  )}
                  {/* Warm vintage grade + vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 40%, rgba(18,16,14,0.55) 100%), linear-gradient(180deg, rgba(232,90,50,0.16), transparent 35%, rgba(18,168,159,0.12) 70%, rgba(26,22,18,0.35))",
                      mixBlendMode: "multiply",
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent 0 3px, rgba(0,0,0,0.35) 3px 4px)",
                    }}
                    aria-hidden
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-3 left-8 right-8 z-10 flex items-center justify-between gap-3 sm:left-10 sm:right-10">
                <p className="font-mono text-[10px] tracking-[0.28em] text-cream/70 uppercase">
                  Frame {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    className="border border-cream/30 bg-black/40 px-3 py-1 font-mono text-[10px] tracking-widest text-cream uppercase backdrop-blur-sm hover:bg-black/60"
                    aria-label="Previous slide"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    className="border border-cream/30 bg-black/40 px-3 py-1 font-mono text-[10px] tracking-widest text-cream uppercase backdrop-blur-sm hover:bg-black/60"
                    aria-label="Next slide"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content focus */}
        <div className="relative flex flex-col justify-center">
          <span className="tape absolute -top-1 left-0 h-6 w-20 rotate-1" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="relative bg-cream/90 p-6 shadow-[0_14px_36px_rgba(26,22,18,0.12)] sm:p-8"
              style={{ rotate: "0.6deg" }}
            >
              <p className="font-mono text-[11px] tracking-[0.22em] text-teal uppercase">
                {active.year} · {active.role}
              </p>
              <h3 className="display mt-3 text-3xl leading-tight text-ink sm:text-5xl">{active.title}</h3>
              <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">{active.synopsis}</p>
              {active.videoSrc && (
                <a
                  href={active.videoSrc}
                  className="mt-6 inline-flex border border-ink bg-ink px-4 py-2 text-xs tracking-[0.18em] text-cream uppercase transition hover:border-tungsten hover:bg-tungsten"
                >
                  Watch cut
                </a>
              )}
              {!active.videoSrc && (
                <p className="hand mt-6 text-xl text-tungsten">placeholder still — swap media anytime</p>
              )}
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Short film slides">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${slide.title}`}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-tungsten" : "w-2.5 bg-ink/25 hover:bg-ink/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
