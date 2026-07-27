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
    <section className="paper-surface relative min-h-[100svh] overflow-hidden px-4 py-24 sm:px-8">
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
            className="relative bg-cream/90 p-6 shadow-[0_12px_30px_rgba(26,22,18,0.15)] sm:p-8"
            style={{ rotate: "1deg" }}
          >
            <p className="hand text-3xl text-teal sm:text-4xl">{about.greeting}</p>
            <h2 className="display mt-2 text-3xl text-ink sm:text-4xl">About the maker</h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">
              {about.body}
            </p>
            <p className="hand mt-6 text-xl text-tungsten">— taped into this journal, 2026</p>
          </article>
          <NextSceneButton onNext={onNext} />
        </div>
      </div>
    </section>
  );
}
