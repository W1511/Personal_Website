"use client";

import { stillsBottomRoll, stillsTopRoll, type PhotoFrame } from "@/lib/content";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

export default function ContactSheet({ onNext: _onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<PhotoFrame | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section ref={scrollerRef} className="h-[100svh] overflow-x-hidden overflow-y-auto bg-charcoal">
      {reduce ? (
        <StaticFilmTable hovered={hovered} setHovered={setHovered} onOpen={setActive} />
      ) : (
        <ScrollFilmTable
          scrollerRef={scrollerRef}
          hovered={hovered}
          setHovered={setHovered}
          onOpen={setActive}
        />
      )}
      <Lightbox photo={active} onClose={() => setActive(null)} />
    </section>
  );
}

function Intro() {
  return (
    <div className="relative z-20 px-4 pt-24 sm:px-8">
      <p className="hand text-2xl text-tungsten-hot">contact sheet · roll 01</p>
      <h2 className="display text-4xl text-cream sm:text-5xl">Photography</h2>
      <p className="mt-2 max-w-md text-sm text-cream/55 sm:text-base">
        a collection of moments, one frame at a time
      </p>
    </div>
  );
}

function ScrollFilmTable({
  scrollerRef,
  hovered,
  setHovered,
  onOpen,
}: {
  scrollerRef: RefObject<HTMLElement | null>;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  onOpen: (photo: PhotoFrame) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState({
    topFrom: 80,
    topTo: -1800,
    botFrom: -1800,
    botTo: 80,
  });

  const { scrollYProgress } = useScroll({
    container: scrollerRef,
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const topX = useTransform(scrollYProgress, [0, 1], [travel.topFrom, travel.topTo]);
  const botX = useTransform(scrollYProgress, [0, 1], [travel.botFrom, travel.botTo]);

  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const top = topRef.current;
      const bottom = bottomRef.current;
      if (!stage || !top || !bottom) return;
      const vw = stage.clientWidth;
      const topW = top.scrollWidth;
      const botW = bottom.scrollWidth;
      setTravel({
        topFrom: Math.round(vw * 0.06),
        topTo: Math.round(-(Math.max(topW - vw * 0.55, vw * 1.4))),
        botFrom: Math.round(-(Math.max(botW - vw * 0.55, vw * 1.4))),
        botTo: Math.round(vw * 0.1),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    if (topRef.current) ro.observe(topRef.current);
    if (bottomRef.current) ro.observe(bottomRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={trackRef} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-x-hidden">
        <Intro />
        <div ref={stageRef} className="relative mt-3 min-h-0 flex-1 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-charcoal to-transparent sm:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-charcoal to-transparent sm:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-8 top-[18%] h-36 w-36 rounded-full bg-tungsten/12 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 bottom-[18%] h-36 w-36 rounded-full bg-teal/10 blur-3xl"
            aria-hidden
          />

          <div className="flex h-full flex-col justify-center gap-[3vh] py-2">
            <motion.div
              data-film="top"
              style={{ x: topX }}
              className="origin-left will-change-transform"
            >
              <div className="-rotate-[1.4deg] scale-[1.02]">
                <FilmStrip
                  stripRef={topRef}
                  items={stillsTopRoll}
                  label="ROLL 01 · A"
                  hovered={hovered}
                  setHovered={setHovered}
                  onOpen={onOpen}
                />
              </div>
            </motion.div>

            <motion.div
              data-film="bottom"
              style={{ x: botX }}
              className="origin-left will-change-transform"
            >
              <div className="ml-[-12%] rotate-[1.35deg] scale-[0.98]">
                <FilmStrip
                  stripRef={bottomRef}
                  items={stillsBottomRoll}
                  label="ROLL 01 · B"
                  hovered={hovered}
                  setHovered={setHovered}
                  onOpen={onOpen}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticFilmTable({
  hovered,
  setHovered,
  onOpen,
}: {
  hovered: string | null;
  setHovered: (id: string | null) => void;
  onOpen: (photo: PhotoFrame) => void;
}) {
  return (
    <div className="pb-16">
      <Intro />
      <div className="mt-8 flex flex-col gap-8 overflow-hidden py-4">
        <div className="-rotate-1">
          <FilmStrip
            items={stillsTopRoll}
            label="ROLL 01 · A"
            hovered={hovered}
            setHovered={setHovered}
            onOpen={onOpen}
          />
        </div>
        <div className="ml-[-8%] rotate-1">
          <FilmStrip
            items={stillsBottomRoll}
            label="ROLL 01 · B"
            hovered={hovered}
            setHovered={setHovered}
            onOpen={onOpen}
          />
        </div>
      </div>
    </div>
  );
}

function FilmStrip({
  stripRef,
  items,
  label,
  hovered,
  setHovered,
  onOpen,
}: {
  stripRef?: RefObject<HTMLDivElement | null>;
  items: PhotoFrame[];
  label: string;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  onOpen: (photo: PhotoFrame) => void;
}) {
  return (
    <div
      ref={stripRef}
      className="inline-flex flex-col"
      style={{
        background: "linear-gradient(180deg, #1c1814 0%, #100e0c 50%, #1a1612 100%)",
        boxShadow: "inset 0 0 0 1px rgba(250,246,238,0.06), 0 28px 50px rgba(0,0,0,0.5)",
      }}
    >
      <SprocketBar />
      <div className="flex items-end gap-4 px-5 py-2">
        <FilmLeader label={label} />
        {items.map((photo) => (
          <FilmFrame
            key={photo.id}
            photo={photo}
            dimmed={Boolean(hovered && hovered !== photo.id)}
            onHover={setHovered}
            onOpen={onOpen}
          />
        ))}
        <FilmLeader label="END · 35mm" />
      </div>
      <SprocketBar />
    </div>
  );
}

function FilmLeader({ label }: { label: string }) {
  return (
    <div className="flex h-[min(22vw,200px)] min-h-[150px] w-14 items-center justify-center sm:w-16" aria-hidden>
      <p
        className="font-mono text-[9px] tracking-[0.28em] text-tungsten/80 uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        {label}
      </p>
    </div>
  );
}

function FilmFrame({
  photo,
  dimmed,
  onHover,
  onOpen,
}: {
  photo: PhotoFrame;
  dimmed: boolean;
  onHover: (id: string | null) => void;
  onOpen: (photo: PhotoFrame) => void;
}) {
  const landscape = photo.orientation === "landscape";

  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      onMouseEnter={() => onHover(photo.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(photo.id)}
      onBlur={() => onHover(null)}
      aria-label={`Open ${photo.caption}`}
      className="group relative shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
    >
      <div
        className={`overflow-hidden bg-black p-[6px] transition duration-300 ${
          dimmed ? "opacity-45" : "opacity-100"
        } group-hover:scale-[1.03] group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)]`}
      >
        <div
          className="relative h-[min(22vw,200px)] min-h-[150px] w-auto overflow-hidden"
          style={{ aspectRatio: landscape ? "3 / 2" : "2 / 3" }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition duration-300 group-hover:brightness-110"
            sizes={landscape ? "420px" : "280px"}
          />
        </div>
      </div>
      <div className="mt-1.5 flex items-baseline justify-between gap-2 px-0.5">
        <span className="font-mono text-[9px] tracking-[0.18em] text-cream/40">{photo.frameNumber}A</span>
        <span className="hand text-sm text-teal-soft opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {photo.caption}
        </span>
      </div>
    </button>
  );
}

function SprocketBar() {
  return (
    <div className="flex h-7 w-full items-center gap-[13px] overflow-hidden px-3" aria-hidden>
      {Array.from({ length: 96 }).map((_, i) => (
        <span
          key={i}
          className="h-[11px] w-[8px] shrink-0 rounded-[1.5px]"
          style={{
            background: "#0b0907",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 0 0 1px #2c261f",
          }}
        />
      ))}
    </div>
  );
}

function Lightbox({ photo, onClose }: { photo: PhotoFrame | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0a0806]/92 p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption}
        >
          <motion.figure
            className="relative max-h-[90vh] w-full max-w-4xl"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto max-h-[78vh] overflow-hidden bg-black">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={1500}
                className="mx-auto max-h-[78vh] w-auto object-contain"
              />
            </div>
            <figcaption className="mt-4 flex items-end justify-between gap-4">
              <p className="hand text-2xl text-cream sm:text-3xl">{photo.caption}</p>
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-[10px] tracking-[0.22em] text-cream/50 uppercase hover:text-tungsten-hot"
              >
                Close
              </button>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
