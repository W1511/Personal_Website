"use client";

import { stillsBottomRoll, stillsTopRoll, type PhotoFrame } from "@/lib/content";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";

export default function ContactSheet({ onNext: _onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const hostRef = useRef<HTMLElement>(null);
  const [scroller, setScroller] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState<PhotoFrame | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useLayoutEffect(() => {
    let el: HTMLElement | null = hostRef.current?.parentElement ?? null;
    while (el) {
      const overflowY = getComputedStyle(el).overflowY;
      if (overflowY === "auto" || overflowY === "scroll") {
        setScroller(el);
        return;
      }
      el = el.parentElement;
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section ref={hostRef} className="w-full max-w-[100vw] overflow-x-clip overscroll-x-none bg-charcoal">
      {reduce || !scroller ? (
        <StaticFilmTable hovered={hovered} setHovered={setHovered} onOpen={setActive} />
      ) : (
        <ScrollFilmTable
          scroller={scroller}
          lightboxOpen={Boolean(active)}
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
    <div className="relative z-20 shrink-0 px-4 pt-[6.5rem] pb-3 sm:px-6 sm:pt-28 sm:pb-4">
      <p className="hand text-xl leading-none text-tungsten-hot sm:text-[1.45rem]">contact sheet · roll 01</p>
      <h2 className="display text-[2.1rem] leading-none text-cream sm:text-[2.65rem]">Photography</h2>
      <p className="mt-0.5 max-w-md text-xs text-cream/55 sm:text-sm">
        a collection of moments, one frame at a time
      </p>
    </div>
  );
}

function ScrollFilmTable({
  scroller,
  lightboxOpen,
  hovered,
  setHovered,
  onOpen,
}: {
  scroller: HTMLElement;
  lightboxOpen: boolean;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  onOpen: (photo: PhotoFrame) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topGateRef = useRef<HTMLDivElement>(null);
  const botGateRef = useRef<HTMLDivElement>(null);
  const topMoveRef = useRef<HTMLDivElement>(null);
  const botMoveRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef({
        topFrom: 0,
        topTo: -2200,
        botFrom: -2200,
        botTo: 0,
  });
  const [spin, setSpin] = useState(0);

  const progress = useMotionValue(0);
  const reelRotate = useTransform(progress, [0, 1], [0, 720]);

  const applyFilm = useCallback((p: number) => {
    const t = travelRef.current;
    const clamped = Math.max(0, Math.min(1, p));
    progress.set(clamped);
    if (topMoveRef.current) {
      topMoveRef.current.style.transform = `translate3d(${t.topFrom + clamped * (t.topTo - t.topFrom)}px,0,0)`;
    }
    if (botMoveRef.current) {
      botMoveRef.current.style.transform = `translate3d(${t.botFrom + clamped * (t.botTo - t.botFrom)}px,0,0)`;
    }
  }, [progress]);

  const syncFromScroll = useCallback(() => {
    if (scroller.scrollLeft !== 0) scroller.scrollLeft = 0;
    const max = scroller.scrollHeight - scroller.clientHeight;
    applyFilm(max <= 0 ? 0 : scroller.scrollTop / max);
  }, [applyFilm, scroller]);

  useEffect(() => {
    syncFromScroll();
    scroller.addEventListener("scroll", syncFromScroll, { passive: true });
    document.addEventListener("scroll", syncFromScroll, { capture: true, passive: true });
    return () => {
      scroller.removeEventListener("scroll", syncFromScroll);
      document.removeEventListener("scroll", syncFromScroll, { capture: true });
    };
  }, [scroller, syncFromScroll]);

  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const top = topRef.current;
      const bottom = bottomRef.current;
      const gate = topGateRef.current;
      if (!stage || !gate || !top || !bottom) return;
      const vw = gate.clientWidth;
      if (vw < 80) return;
      const topTravel = Math.max(top.scrollWidth - vw, 1);
      const botTravel = Math.max(bottom.scrollWidth - vw, 1);
      travelRef.current = {
        topFrom: 0,
        topTo: Math.round(-topTravel),
        botFrom: Math.round(-botTravel),
        botTo: 0,
      };
      syncFromScroll();
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    if (topGateRef.current) ro.observe(topGateRef.current);
    if (botGateRef.current) ro.observe(botGateRef.current);
    if (topRef.current) ro.observe(topRef.current);
    if (bottomRef.current) ro.observe(bottomRef.current);
    return () => ro.disconnect();
  }, [syncFromScroll]);

  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaX !== 0 || e.deltaY !== 0) e.preventDefault();
      if (e.deltaY === 0) return;
      scroller.scrollTop += e.deltaY;
    };
    sticky.addEventListener("wheel", onWheel, { passive: false });
    return () => sticky.removeEventListener("wheel", onWheel);
  }, [scroller]);

  const wind = useCallback(
    (direction: 1 | -1) => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      const step = Math.max(max / 8, 160);
      const next = Math.max(0, Math.min(max, scroller.scrollTop + direction * step));
      scroller.scrollTo({ top: next, behavior: "smooth" });
      setSpin((n) => n + direction * 90);
    },
    [scroller],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      e.stopImmediatePropagation();
      wind(e.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [lightboxOpen, wind]);

  return (
    <div ref={trackRef} className="relative h-[300vh] w-full max-w-full min-w-0 overflow-x-clip">
      <div ref={stickyRef} className="sticky top-0 flex h-[100svh] w-full min-w-0 flex-col overflow-x-clip overflow-y-hidden overscroll-x-none [touch-action:pan-y]">
        <Intro />
        <div ref={stageRef} className="relative flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-x-clip overflow-y-hidden">
          <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col justify-start gap-2 py-0 sm:gap-2.5">
            <FilmViewport gateRef={topGateRef} className="min-h-0 flex-1">
              <div ref={topMoveRef} data-film="top" className="h-full w-max max-w-none will-change-transform">
                <div className="h-full -rotate-[1.2deg]">
                  <FilmStrip
                    stripRef={topRef}
                    items={stillsTopRoll}
                    label="ROLL 01 · A"
                    hovered={hovered}
                    setHovered={setHovered}
                    onOpen={onOpen}
                  />
                </div>
              </div>
            </FilmViewport>

            <DevelopSticker reelRotate={reelRotate} spin={spin} onWind={() => wind(1)} />

            <FilmViewport gateRef={botGateRef} className="min-h-0 flex-1">
              <div ref={botMoveRef} data-film="bottom" className="h-full w-max max-w-none will-change-transform">
                <div className="h-full rotate-[1.15deg]">
                  <FilmStrip
                    stripRef={bottomRef}
                    items={stillsBottomRoll}
                    label="ROLL 01 · B"
                    hovered={hovered}
                    setHovered={setHovered}
                    onOpen={onOpen}
                  />
                </div>
              </div>
            </FilmViewport>
          </div>
        </div>
      </div>
    </div>
  );
}

function DevelopSticker({
  reelRotate,
  spin,
  onWind,
}: {
  reelRotate: MotionValue<number>;
  spin: number;
  onWind: () => void;
}) {
  return (
    <div className="relative z-20 flex justify-center py-1">
      <motion.button
        type="button"
        onClick={onWind}
        aria-label="Scroll to develop"
        whileHover={{ scale: 1.04, rotate: -3 }}
        whileTap={{ scale: 0.985, rotate: -1 }}
        transition={{ type: "spring", stiffness: 340, damping: 24 }}
        className="flex -rotate-[1.8deg] cursor-pointer items-center gap-2.5 bg-transparent p-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
      >
        <motion.span style={{ rotate: reelRotate }} className="inline-flex">
          <motion.span animate={{ rotate: spin }} transition={{ type: "spring", stiffness: 180, damping: 16 }}>
            <FilmReelIcon />
          </motion.span>
        </motion.span>
        <span className="hand text-xl leading-none text-teal-soft sm:text-[1.35rem]">scroll to develop ↓</span>
      </motion.button>
    </div>
  );
}

function FilmReelIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
      <circle cx="17" cy="17" r="15" fill="#1a1512" stroke="#c4783a" strokeWidth="1.5" />
      <circle cx="17" cy="17" r="4" fill="#e85a32" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle
          key={deg}
          cx={17 + Math.cos((deg * Math.PI) / 180) * 8.5}
          cy={17 + Math.sin((deg * Math.PI) / 180) * 8.5}
          r="2.1"
          fill="#0e0c0a"
          stroke="#f3ead8"
          strokeWidth="0.6"
        />
      ))}
    </svg>
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
    <div className="min-h-[100svh] pb-16">
      <Intro />
      <div className="mt-3 flex min-h-[78vh] min-w-0 w-full flex-col justify-center gap-2 overflow-x-clip overflow-y-hidden py-1">
        <FilmViewport>
          <div className="-rotate-1">
            <FilmStrip
              items={stillsTopRoll}
              label="ROLL 01 · A"
              hovered={hovered}
              setHovered={setHovered}
              onOpen={onOpen}
            />
          </div>
        </FilmViewport>
        <p className="hand text-center text-xl text-teal-soft/80">scroll to develop ↓</p>
        <FilmViewport>
          <div className="rotate-1">
            <FilmStrip
              items={stillsBottomRoll}
              label="ROLL 01 · B"
              hovered={hovered}
              setHovered={setHovered}
              onOpen={onOpen}
            />
          </div>
        </FilmViewport>
      </div>
    </div>
  );
}

function FilmViewport({
  children,
  gateRef,
  className = "",
}: {
  children: ReactNode;
  gateRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  return (
    <div
      ref={gateRef}
      className={`relative mx-auto flex h-full min-h-0 w-[min(93vw,calc(100%-5rem))] min-w-0 max-w-full items-stretch overflow-x-clip overflow-y-hidden [contain:inline-size] ${className}`}
    >
      {children}
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
      className="inline-grid h-full max-h-full w-max max-w-none grid-rows-[24px_minmax(0,1fr)_24px] overflow-hidden"
      style={{
        height: "100%",
        minHeight: "12.5rem",
        background: "linear-gradient(180deg, #1c1814 0%, #100e0c 50%, #1a1612 100%)",
        boxShadow: "inset 0 0 0 1px rgba(250,246,238,0.06), 0 28px 50px rgba(0,0,0,0.5)",
      }}
    >
      <SprocketBar />
      <div className="flex min-h-0 w-max items-stretch gap-4 px-4 py-1.5 sm:gap-5 sm:px-5">
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
    <div className="flex h-full w-12 shrink-0 items-center justify-center sm:w-14" aria-hidden>
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
      className="group relative h-full shrink-0 cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
    >
      <div
        className={`flex h-full overflow-hidden bg-black p-[5px] transition duration-300 sm:p-[6px] ${
          dimmed ? "opacity-40" : "opacity-100"
        } group-hover:scale-[1.025] group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)]`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={landscape ? 1500 : 1000}
          height={landscape ? 1000 : 1500}
          priority
          className="h-full w-auto max-w-none select-none transition duration-300 group-hover:brightness-[1.12]"
          sizes="(min-width: 1280px) 30vw, 42vw"
        />
      </div>
    </button>
  );
}

function SprocketBar() {
  return (
    <div className="relative h-6 w-full overflow-hidden" aria-hidden>
      <div className="absolute inset-0 flex items-center gap-[13px] px-3">
        {Array.from({ length: 200 }).map((_, i) => (
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
