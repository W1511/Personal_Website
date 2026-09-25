"use client";

import { about } from "@/lib/content";
import NextSceneButton from "@/components/NextSceneButton";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function AboutPolaroid({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="paper-surface relative min-h-[100svh] overflow-x-hidden px-4 py-24 sm:px-8">
      <div className="paper-grain absolute inset-0" aria-hidden />
      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="relative mx-auto w-full max-w-xs cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          style={{ rotate: "-3deg" }}
          whileHover={reduce ? undefined : { rotate: -1, y: -6 }}
          animate={expanded ? { scale: 1.04, rotate: 0 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          aria-expanded={expanded}
          aria-label="Expand polaroid"
        >
          <span className="tape absolute -top-3 left-1/2 z-20 h-7 w-24 -translate-x-1/2 -rotate-2" />
          <span className="tape-blue absolute -left-2 top-10 z-20 h-6 w-14 -rotate-45" />
          <span className="tape absolute -right-1 bottom-16 z-20 h-6 w-16 rotate-12" />
          <div className="bg-cream p-3 pb-12 shadow-[0_18px_40px_rgba(26,22,18,0.25)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <Image
                src={about.polaroidSrc}
                alt="Placeholder portrait polaroid"
                fill
                className="object-cover"
                sizes="320px"
                priority
              />
            </div>
            <p className="hand mt-4 text-center text-2xl text-ink-soft">{about.polaroidCaption}</p>
          </div>
        </motion.button>

        <div className="relative">
          <span className="tape absolute -top-2 right-8 h-8 w-28 rotate-3" aria-hidden />
          <article
            className="relative bg-cream/90 px-6 py-8 shadow-[0_12px_30px_rgba(26,22,18,0.15)] sm:px-10 sm:py-11"
            style={{ rotate: "1deg" }}
          >
            <p className="hand text-[2rem] leading-none text-teal sm:text-[2.6rem]">{about.greeting}</p>
            <h2 className="display mt-2 text-[1.2rem] leading-snug tracking-tight text-ink sm:mt-2.5 sm:whitespace-nowrap sm:text-[1.45rem]">
              {about.heading}
            </h2>
            <span className="tape mt-5 block h-3 w-16 -rotate-2" aria-hidden />
            <div className="mt-7 max-w-[40rem] space-y-6 text-[1.05rem] leading-[1.8] text-ink-soft sm:mt-8 sm:space-y-7 sm:text-[1.125rem] sm:leading-[1.85]">
              {about.paragraphs.map((paragraph, index) => (
                <p key={paragraph.slice(0, 32)} className={index === 0 ? "text-ink" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="hand mt-10 -rotate-1 text-[1.7rem] leading-snug text-teal sm:mt-12 sm:text-3xl">
              {about.closer}
            </p>
          </article>
          <NextSceneButton onNext={onNext} />
        </div>
      </div>
    </section>
  );
}
