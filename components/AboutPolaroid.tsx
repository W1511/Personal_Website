"use client";

import {
  CoffeeCup,
  MatchaCup,
  PeekingCat,
  SketchArrow,
  SketchCurve,
  SketchStar,
  VintageCamera,
} from "@/components/AboutDoodles";
import NextSceneButton from "@/components/NextSceneButton";
import { about } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutPolaroid({ onNext }: { onNext: () => void }) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const reduce = hydrated ? Boolean(reduceMotion) : false;

  return (
    <section className="relative overflow-x-hidden bg-charcoal px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-28 lg:px-10 lg:pt-[5.75rem]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 16% 18%, rgba(232,90,50,0.16), transparent 44%), radial-gradient(ellipse at 86% 12%, rgba(18,168,159,0.08), transparent 38%), radial-gradient(ellipse at 50% 108%, rgba(0,0,0,0.45), transparent 48%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:items-center lg:gap-8 xl:gap-10">
        <div className="relative mx-auto w-full max-w-[25.5rem] lg:justify-self-center">
          <div
            className="grid w-full items-center gap-x-1 gap-y-1 sm:gap-x-2"
            style={{ gridTemplateColumns: "5.2rem minmax(0, 1fr) 5.4rem", gridTemplateRows: "auto minmax(0, 1fr) auto" }}
          >
            <div className="col-start-1 row-start-1 self-end pb-1">
              <SketchStar className="ml-4 h-3 w-3 rotate-[18deg] sm:h-3.5 sm:w-3.5" />
            </div>

            <div className="col-start-3 row-start-1 mb-0.5 flex flex-col items-end">
              <p className="hand w-[6.6rem] rotate-[8deg] text-right text-[0.88rem] leading-tight text-teal sm:w-[7.4rem] sm:text-[0.98rem]">
                {about.annotations.camera}
              </p>
              <SketchArrow className="mt-0.5 h-3.5 w-9 rotate-[28deg]" />
            </div>

            <div className="col-start-1 row-start-2 flex flex-col items-center gap-1 self-center">
              <p className="hand -rotate-[10deg] text-center text-[0.88rem] leading-tight text-teal sm:text-[0.98rem]">
                {about.annotations.caffeine}
              </p>
              <SketchCurve className="h-4 w-8 rotate-[12deg]" />
              <div className="flex items-end gap-0.5">
                <motion.span
                  className="about-float inline-flex"
                  whileHover={reduce ? undefined : { rotate: -8, y: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <MatchaCup className="h-9 w-7 sm:h-10 sm:w-8" />
                </motion.span>
                <motion.span
                  className="about-float-late inline-flex"
                  whileHover={reduce ? undefined : { rotate: 8, y: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <CoffeeCup className="h-9 w-8 sm:h-10 sm:w-9" />
                </motion.span>
              </div>
            </div>

            <div className="relative col-start-2 row-start-2 min-w-0">
              <motion.button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="relative z-10 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                whileHover={reduce ? undefined : { y: -4 }}
                animate={expanded ? { scale: 1.03 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                aria-expanded={expanded}
                aria-label="Expand portrait"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-ink shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                  <Image
                    src={about.polaroidSrc}
                    alt="Wardah among tall grass, looking at a yellow flower"
                    fill
                    className="object-cover object-[center_32%]"
                    sizes="(min-width: 1024px) 26vw, 58vw"
                    quality={95}
                    priority
                  />
                </div>
              </motion.button>
              <PeekingCat className="pointer-events-none absolute -bottom-[20%] -right-[30%] z-20 h-[4.4rem] w-[6.2rem] sm:h-[4.9rem] sm:w-[7rem]" />
            </div>

            <div className="col-start-3 row-start-2 flex justify-center self-start pt-[18%]">
              <VintageCamera className="h-8 w-[3.2rem] sm:h-9 sm:w-14" />
            </div>

            <p className="hand col-start-3 row-start-3 max-w-[6.4rem] rotate-[6deg] text-right text-[0.88rem] leading-tight text-teal sm:text-[0.98rem]">
              {about.annotations.cat}
            </p>
          </div>
        </div>

        <article className="min-w-0">
          <p className="hand text-[2rem] leading-none text-teal sm:text-[2.35rem]">{about.greeting}</p>
          <h2 className="display mt-2 text-[1.3rem] leading-snug tracking-tight text-cream sm:text-[1.5rem]">
            {about.heading}
          </h2>
          <div className="mt-4 max-w-[38rem] space-y-3.5 text-[1.02rem] leading-[1.7] text-cream/72 sm:mt-5 sm:space-y-4 sm:text-[1.05rem] sm:leading-[1.75]">
            {about.paragraphs.map((paragraph, index) => (
              <p key={paragraph.slice(0, 32)} className={index === 0 ? "text-cream/88" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
          <p className="hand mt-5 text-[1.55rem] leading-snug text-teal sm:text-[1.7rem]">{about.closer}</p>
          <NextSceneButton onNext={onNext} dark />
        </article>
      </div>
    </section>
  );
}
