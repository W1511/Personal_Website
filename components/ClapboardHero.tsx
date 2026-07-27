"use client";

import LightLeak from "@/components/LightLeak";
import { InstaxMiniCartoon, PremiereTimelineCartoon, SonyAlphaCartoon } from "@/components/HeroGear";
import { site } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";

type Props = {
  onClapComplete: () => void;
};

function Sticker({
  children,
  className,
  rotate = 0,
  reduce,
  floatClass = "hero-float-a",
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  reduce: boolean | null;
  floatClass?: string;
}) {
  return (
    <motion.div
      className={`absolute z-20 cursor-grab active:cursor-grabbing ${className ?? ""}`}
      drag={!reduce}
      dragConstraints={{ left: -48, right: 48, top: -36, bottom: 36 }}
      dragElastic={0.15}
      whileHover={reduce ? undefined : { scale: 1.07, zIndex: 30 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
    >
      <div className={reduce ? undefined : floatClass} style={{ rotate: `${rotate}deg` }}>
        {children}
      </div>
    </motion.div>
  );
}

function FilmReel({ spinning }: { spinning: boolean }) {
  return (
    <motion.div
      className="relative h-24 w-24 sm:h-28 sm:w-28"
      animate={spinning ? { rotate: 360 } : { rotate: 0 }}
      transition={spinning ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full border-[10px] border-[#2a221c] bg-[#1a1512] shadow-[0_12px_28px_rgba(0,0,0,0.45)]" />
      <div className="absolute inset-[18%] rounded-full border-4 border-[#3d342c] bg-[#12100e]" />
      <div className="absolute inset-[38%] rounded-full bg-tungsten/80" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <div
          key={deg}
          className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0e0c0a]"
          style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-32px)` }}
        />
      ))}
    </motion.div>
  );
}

export default function ClapboardHero({ onClapComplete }: Props) {
  const reduce = useReducedMotion();
  const [clapping, setClapping] = useState(false);
  const [burst, setBurst] = useState(false);
  const [reelSpin, setReelSpin] = useState(false);
  const [popped, setPopped] = useState<string | null>(null);

  const clap = () => {
    if (clapping) return;
    setClapping(true);
    setBurst(true);
    setReelSpin(true);
    window.setTimeout(() => onClapComplete(), reduce ? 120 : 800);
  };

  const pop = (id: string) => {
    setPopped(id);
    window.setTimeout(() => setPopped(null), 900);
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-charcoal px-4 pb-14 pt-28 sm:px-8">
      <LightLeak burst={burst} />

      {/* ambient washi only — keep airy */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className={`tape absolute top-[20%] left-[10%] h-7 w-24 -rotate-12 opacity-70 ${reduce ? "" : "hero-float-c"}`} />
        <span className={`tape-blue absolute top-[24%] right-[12%] h-6 w-20 rotate-[16deg] opacity-70 ${reduce ? "" : "hero-float-b"}`} />
      </div>

      <div
        className="pointer-events-none absolute inset-[6%] rounded-[2rem] opacity-50 sm:inset-[8%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(243,234,216,0.1) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="relative mb-1 h-[min(54vh,440px)] w-full max-w-3xl sm:h-[400px]">
          {/* Orbit around the name — keep space under the tagline clear */}
          <Sticker className="top-0 left-[2%] sm:left-[4%]" rotate={-8} reduce={reduce} floatClass="hero-float-a">
            <button
              type="button"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
              onClick={() => {
                setReelSpin((s) => !s);
                pop("reel");
              }}
              aria-label="Spin the film reel"
            >
              <FilmReel spinning={reelSpin || clapping} />
              <span className="tape absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-6" />
              <p className="hand mt-1 text-center text-lg text-tungsten-hot">spin me</p>
            </button>
          </Sticker>

          <Sticker className="top-0 right-[2%] sm:right-[4%]" rotate={7} reduce={reduce} floatClass="hero-float-b">
            <button
              type="button"
              onClick={() => pop("ticket")}
              className="relative w-28 bg-tungsten px-3 py-3 text-left text-ink shadow-lg sm:w-32"
              aria-label="Admit one personality ticket"
            >
              <span className="absolute top-0 right-0 bottom-0 w-3 border-l border-dashed border-ink/30" />
              <p className="font-mono text-[9px] tracking-widest uppercase">Admit one</p>
              <p className="display mt-1 text-lg leading-tight">Story first</p>
              <p className="mt-2 text-[10px] font-medium">FILM × DATA</p>
            </button>
          </Sticker>

          <Sticker
            className="top-[2%] left-[30%] sm:left-[34%]"
            rotate={-2}
            reduce={reduce}
            floatClass="hero-float-b"
          >
            <button
              type="button"
              onClick={() => pop("premiere")}
              className="relative scale-[0.68] drop-shadow-xl sm:scale-[0.75] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              aria-label="Premiere Pro timeline"
            >
              <span className="tape absolute -top-2 left-10 z-10 h-3.5 w-11 rotate-2" />
              <PremiereTimelineCartoon />
            </button>
          </Sticker>

          <Sticker className="top-[38%] -left-2 sm:left-[-2%]" rotate={-10} reduce={reduce} floatClass="hero-float-c">
            <button
              type="button"
              onClick={() => pop("instax")}
              className="relative drop-shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
              aria-label="Instax mini camera"
            >
              <span className="tape-blue absolute -top-1 left-6 z-10 h-3 w-9 -rotate-6" />
              <InstaxMiniCartoon />
            </button>
          </Sticker>

          <Sticker className="top-[68%] left-[1%] sm:left-[3%]" rotate={-6} reduce={reduce} floatClass="hero-float-b">
            <button
              type="button"
              onClick={() => pop("note")}
              className="relative max-w-[130px] bg-cream/95 px-3 py-2 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
              aria-label="Handwritten scrap note"
            >
              <span className="tape absolute -top-2 left-4 h-3.5 w-10 rotate-[-8deg]" />
              <p className="hand text-lg leading-tight text-ink">trust the frame</p>
            </button>
          </Sticker>

          <Sticker className="top-[34%] -right-2 sm:right-[-2%]" rotate={8} reduce={reduce} floatClass="hero-float-a">
            <button
              type="button"
              onClick={() => pop("sony")}
              className="relative drop-shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
              aria-label="Sony Alpha 6400 camera"
            >
              <span className="tape absolute -top-2 right-8 z-10 h-3 w-10 rotate-8" />
              <SonyAlphaCartoon />
            </button>
          </Sticker>

          <Sticker className="top-[68%] right-[0%] sm:right-[2%]" rotate={4} reduce={reduce} floatClass="hero-float-a">
            <div className="rounded-sm border-2 border-dashed border-teal-soft/50 bg-teal/25 px-3 py-2 text-cream backdrop-blur-sm">
              <p className="font-mono text-[9px] tracking-widest uppercase opacity-70">Currently</p>
              <p className="hand text-xl leading-none">Lawrence U · Junior</p>
            </div>
          </Sticker>

          {/* Centered name — pops in via CSS (always ends visible) */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-16 sm:px-24">
            <p className={`hand text-2xl text-tungsten-hot sm:text-3xl ${reduce ? "" : "hero-fade-up"}`}>
              scene 01 · take 1
            </p>
            <h1
              className={`display mt-2 max-w-[14ch] text-[clamp(3rem,11vw,6.2rem)] leading-[0.92] tracking-tight text-cream ${reduce ? "" : "hero-name-pop"}`}
            >
              {site.name}
            </h1>
            <p className={`mt-4 max-w-md text-sm text-cream/70 sm:text-base ${reduce ? "" : "hero-fade-up-late"}`}>
              {site.tagline}
            </p>
            {popped && (
              <p className="hand mt-3 text-xl text-teal-soft">
                {popped === "reel" && "keep rolling — always"}
                {popped === "ticket" && "stories over résumés"}
                {popped === "instax" && "print the feeling"}
                {popped === "sony" && "shot on α6400"}
                {popped === "premiere" && "cut until it breathes"}
                {popped === "note" && "compose with feeling"}
              </p>
            )}
          </div>
        </div>

        <div className={`relative z-20 mt-1 w-full max-w-xs sm:max-w-sm ${reduce ? "" : "hero-fade-up-late"}`}>
          <button
            type="button"
            onClick={clap}
            disabled={clapping}
            aria-label="Clap the clapboard to go to the next section"
            className="group relative w-full cursor-pointer perspective-[900px] focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten disabled:cursor-wait"
          >
            <div
              className="rounded-sm bg-[#1c1814] shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="origin-bottom rounded-t-sm border-b-2 border-black bg-[#2a2420]"
                initial={false}
                animate={
                  reduce
                    ? { rotateX: clapping ? 0 : -48 }
                    : clapping
                      ? { rotateX: [-48, 8, 0] }
                      : { rotateX: [-48, -40, -48] }
                }
                transition={
                  clapping
                    ? { duration: 0.45, ease: [0.22, 1, 0.2, 1], times: [0, 0.7, 1] }
                    : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                }
                style={{ transformStyle: "preserve-3d", transformOrigin: "bottom center" }}
              >
                <div className="flex h-10 overflow-hidden rounded-t-sm sm:h-11">
                  {["#1a1612", "#f3ead8", "#1a1612", "#f3ead8", "#1a1612", "#f3ead8", "#1a1612"].map(
                    (c, i) => (
                      <div key={i} className="flex-1" style={{ background: c }} />
                    ),
                  )}
                </div>
              </motion.div>

              <div className="space-y-1.5 px-5 py-4 font-mono text-[11px] tracking-wider text-cream/90">
                <div className="flex justify-between border-b border-cream/15 pb-1.5">
                  <span>PROD</span>
                  <span className="hand text-base text-tungsten-hot normal-case tracking-normal">
                    Wardah Basil
                  </span>
                </div>
                <div className="flex justify-between border-b border-cream/15 pb-1.5">
                  <span>SCENE</span>
                  <span>01</span>
                </div>
                <div className="flex justify-between">
                  <span>TAKE</span>
                  <span>{clapping ? "ACTION" : "01"}</span>
                </div>
              </div>
            </div>

            {burst && (
              <span className="display pointer-events-none absolute inset-0 flex items-center justify-center text-4xl text-cream drop-shadow-lg">
                Action!
              </span>
            )}
          </button>

          <p className="hand mt-4 text-xl text-cream/55">
            {clapping ? "rolling…" : "drag stickers · clap the slate to enter"}
          </p>
        </div>
      </div>
    </section>
  );
}
