"use client";

import { selectedWorks, type SelectedWork } from "@/lib/content";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cover = selectedWorks[0];
const spread = selectedWorks[1];
const room = selectedWorks[2];
const packaging = selectedWorks[3];
const pizza = selectedWorks[4];

export default function ProjectStickies(_props: { onNext: () => void }) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const reduce = hydrated ? Boolean(reduceMotion) : false;

  return (
    <section className="relative min-h-[100svh] overflow-x-hidden bg-charcoal px-4 pb-16 pt-[5.25rem] sm:px-7 sm:pb-20 sm:pt-[5.5rem] lg:px-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 18% 12%, rgba(232,90,50,0.13), transparent 42%), radial-gradient(ellipse at 88% 8%, rgba(232,90,50,0.06), transparent 36%), radial-gradient(ellipse at 50% 120%, rgba(0,0,0,0.55), transparent 48%)",
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

      <div className="relative z-10 mx-auto w-full max-w-[72rem]">
        <header className="mb-6 sm:mb-7">
          <h2 className="display text-[1.85rem] leading-none tracking-[0.08em] text-cream uppercase sm:text-[2.35rem]">
            Projects
          </h2>
          <p className="hand mt-1 text-[1.35rem] leading-tight text-tungsten-hot sm:text-[1.55rem]">
            designs, experiments &amp; other things I&apos;ve made
          </p>
        </header>

        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-9">
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-9 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] md:gap-x-7 lg:gap-x-8">
            <Exhibit
              work={cover}
              index={0}
              reduce={reduce}
              onOpen={() => setLightboxIndex(0)}
              imgClass="max-h-[min(42vh,24rem)] w-auto max-w-full md:max-h-[min(48vh,26rem)] lg:max-h-[min(50vh,27rem)]"
            />
            <div className="md:pt-6">
              <Exhibit
                work={spread}
                index={1}
                reduce={reduce}
                onOpen={() => setLightboxIndex(1)}
                imgClass="max-h-[min(28vh,16rem)] w-auto max-w-full md:max-h-[min(40vh,22rem)] lg:max-h-[min(46vh,25rem)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,1.2fr)] lg:gap-x-9 lg:gap-y-0">
            <Exhibit
              work={room}
              index={2}
              reduce={reduce}
              onOpen={() => setLightboxIndex(2)}
              imgClass="max-h-[min(28vh,16.5rem)] w-auto max-w-full"
            />
            <div className="sm:pt-10 lg:pt-14">
              <Exhibit
                work={packaging}
                index={3}
                reduce={reduce}
                onOpen={() => setLightboxIndex(3)}
                imgClass="max-h-[min(22vh,13.5rem)] w-auto max-w-full"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1 lg:pt-4">
              <Exhibit
                work={pizza}
                index={4}
                reduce={reduce}
                onOpen={() => setLightboxIndex(4)}
                imgClass="max-h-[min(26vh,15.5rem)] w-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {hydrated
        ? createPortal(
            <AnimatePresence>
              {lightboxIndex !== null ? (
                <Lightbox
                  index={lightboxIndex}
                  reduce={reduce}
                  onClose={() => setLightboxIndex(null)}
                  onPrev={() =>
                    setLightboxIndex((current) =>
                      current === null
                        ? current
                        : (current - 1 + selectedWorks.length) % selectedWorks.length,
                    )
                  }
                  onNext={() =>
                    setLightboxIndex((current) =>
                      current === null ? current : (current + 1) % selectedWorks.length,
                    )
                  }
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}

function Exhibit({
  work,
  index,
  reduce,
  onOpen,
  imgClass,
}: {
  work: SelectedWork;
  index: number;
  reduce: boolean;
  onOpen: () => void;
  imgClass: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="group w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.12 : 0.42, delay: reduce ? 0 : 0.05 + index * 0.05, ease: EASE }}
      whileHover={reduce ? undefined : { y: -5 }}
    >
      <span className="block w-full shadow-[0_16px_34px_rgba(0,0,0,0.42)] transition-[box-shadow] duration-300 group-hover:shadow-[0_22px_40px_rgba(0,0,0,0.5)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={work.src} alt={work.title} className={`block h-auto ${imgClass} object-contain`} />
      </span>
      <span className="mt-2 block font-mono text-[9px] tracking-[0.2em] text-cream/55 uppercase sm:text-[10px]">
        {work.title}
      </span>
    </motion.button>
  );
}

function Lightbox({
  index,
  reduce,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  reduce: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const work = selectedWorks[index];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        onClose();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopImmediatePropagation();
        onPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopImmediatePropagation();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close artwork"
        onClick={onClose}
        className="absolute inset-0 bg-[#0c0908]/92"
      />
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-20 font-mono text-[11px] tracking-[0.22em] text-cream/70 uppercase transition hover:text-cream"
      >
        Close
      </button>
      <motion.figure
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.24, ease: EASE }}
        className="relative z-10 flex max-h-[90vh] w-full max-w-[94vw] flex-col items-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={work.src}
          alt={work.title}
          className="max-h-[78vh] w-auto max-w-full object-contain"
        />
        <figcaption className="mt-4 font-mono text-[10px] tracking-[0.18em] text-cream/55 uppercase">
          {work.title}
        </figcaption>
        <div className="mt-4 flex w-full max-w-md items-center justify-between font-mono text-[10px] tracking-[0.22em] text-cream/55 uppercase">
          <button
            type="button"
            onClick={onPrev}
            className="transition hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
          >
            ← Prev
          </button>
          <span>
            {index + 1} / {selectedWorks.length}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="transition hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
          >
            Next →
          </button>
        </div>
      </motion.figure>
    </motion.div>
  );
}
