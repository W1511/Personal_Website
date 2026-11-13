"use client";

import { shorts, type ShortFilm } from "@/lib/content";
import { nextYoutubeThumbQuality, youtubeCoverSrc, youtubeEmbedSrc, type YoutubeThumbQuality } from "@/lib/youtube";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TICKET_TILTS = [-7.5, 6.2, -5.4, 8] as const;

export default function ProjectionBooth() {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [playing, setPlaying] = useState<ShortFilm | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const reduce = hydrated ? Boolean(reduceMotion) : false;

  return (
    <div className="mx-auto w-full max-w-[74rem]">
      <header className="mb-8 text-center sm:mb-10">
        <h2 className="display text-[1.85rem] leading-none tracking-[0.08em] text-cream sm:text-[2.35rem]">
          Short Films
        </h2>
      </header>

      <div className="flex flex-col gap-14 sm:gap-16 lg:gap-[4.5rem]">
        {shorts.map((film, index) => (
          <FestivalReel
            key={film.id}
            film={film}
            index={index}
            reduce={reduce}
            onPlay={() => setPlaying(film)}
          />
        ))}
      </div>

      {hydrated
        ? createPortal(
            <AnimatePresence>
              {playing ? (
                <FilmModal film={playing} reduce={reduce} onClose={() => setPlaying(null)} />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

function FestivalReel({
  film,
  index,
  reduce,
  onPlay,
}: {
  film: ShortFilm;
  index: number;
  reduce: boolean;
  onPlay: () => void;
}) {
  const ticketLeft = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const tilt = TICKET_TILTS[index] ?? 4;

  return (
    <motion.article
      className="relative"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduce ? 0.12 : 0.55, ease: EASE }}
    >
      <p className="mb-3 font-mono text-[10px] tracking-[0.28em] text-cream/40 uppercase">
        Film {number}
      </p>

      <div className={`relative ${ticketLeft ? "md:flex md:justify-end" : ""}`}>
        <div className="relative w-full md:w-[min(72%,38rem)]">
          <button
            type="button"
            onClick={onPlay}
            disabled={!film.videoUrl}
            aria-label={`Watch ${film.title}`}
            className="group relative block w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten disabled:cursor-default"
          >
            <span className="relative block aspect-video w-full overflow-hidden bg-ink shadow-[0_22px_44px_rgba(0,0,0,0.5)]">
              <span className="absolute inset-0 origin-center transition duration-500 ease-out group-hover:scale-[1.035] group-hover:brightness-110">
                <FilmCover film={film} />
              </span>
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(10,8,6,0.5)] ring-1 ring-cream/35 transition duration-300 group-hover:bg-[rgba(10,8,6,0.38)] group-hover:ring-cream/60 sm:h-12 sm:w-12">
                  <svg viewBox="0 0 24 24" className="ml-[2px] h-4 w-4 fill-cream sm:h-[1.15rem] sm:w-[1.15rem]">
                    <path d="M8.2 5.2v13.6L19.2 12 8.2 5.2z" />
                  </svg>
                </span>
              </span>
              <h3 className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[88%] display text-[1.7rem] leading-[0.92] text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:bottom-4 sm:left-4 sm:text-[2.2rem] lg:text-[2.45rem]">
                {film.title}
              </h3>
            </span>
          </button>

          <div
            className={`relative z-20 mt-4 flex justify-center md:absolute md:top-[22%] md:mt-0 md:block ${
              ticketLeft
                ? "md:-left-7 md:right-auto lg:-left-9"
                : "md:-right-7 md:left-auto lg:-right-9"
            }`}
          >
            <AdmitTicket
              film={film}
              number={number}
              tilt={tilt}
              reduce={reduce}
              onPlay={onPlay}
            />
          </div>

          <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-tungsten-hot/90 uppercase">
            {film.year} · {film.runtime} · {film.role}
          </p>
          <p className="mt-2 max-w-[38rem] text-[0.92rem] leading-relaxed text-cream/70">{film.synopsis}</p>
        </div>
      </div>
    </motion.article>
  );
}

function AdmitTicket({
  film,
  number,
  tilt,
  reduce,
  onPlay,
}: {
  film: ShortFilm;
  number: string;
  tilt: number;
  reduce: boolean;
  onPlay: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={`Watch ${film.title} — admission ticket`}
      onClick={onPlay}
      disabled={!film.videoUrl}
      whileHover={
        reduce
          ? undefined
          : {
              y: -8,
              rotate: tilt * 0.28,
              scale: 1.04,
              boxShadow: "0 16px 28px rgba(0,0,0,0.42), 0 0 18px rgba(232,90,50,0.22)",
            }
      }
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      className="relative w-[7.6rem] shrink-0 cursor-pointer bg-tungsten px-2 py-2.5 text-left text-ink shadow-[0_10px_20px_rgba(0,0,0,0.38)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:w-[9.25rem] sm:px-2.5 sm:py-3"
      style={{ rotate: `${tilt}deg` }}
    >
      <span className="absolute top-0 right-0 bottom-0 w-3.5 border-l border-dashed border-ink/30" aria-hidden />
      <span className="absolute top-2.5 right-[5px] flex flex-col gap-[7px]" aria-hidden>
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            className="block h-[6px] w-[6px] rounded-full bg-[#140f0c] shadow-[inset_0_0_0_1px_rgba(28,20,16,0.25)]"
          />
        ))}
      </span>
      <p className="font-mono text-[8px] tracking-[0.22em] uppercase opacity-70">Admit one · {number}</p>
      <p className="display mt-1.5 pr-3 text-[1.05rem] leading-tight sm:pr-4 sm:text-[1.2rem]">{film.title}</p>
      <p className="mt-1.5 font-mono text-[8px] tracking-widest uppercase sm:text-[9px]">{film.year}</p>
      <p className="hand mt-2 text-[1.15rem] leading-none text-cream">now showing</p>
    </motion.button>
  );
}

function FilmCover({ film }: { film: ShortFilm }) {
  const [quality, setQuality] = useState<YoutubeThumbQuality>("maxresdefault");
  const src = youtubeCoverSrc(film.videoUrl, quality);

  useEffect(() => {
    setQuality("maxresdefault");
  }, [film.id, film.videoUrl]);

  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      onLoad={(event) => {
        const next = nextYoutubeThumbQuality(quality);
        if (next && event.currentTarget.naturalWidth <= 120) {
          setQuality(next);
        }
      }}
      onError={() => {
        const next = nextYoutubeThumbQuality(quality);
        if (next) setQuality(next);
      }}
    />
  );
}

function FilmModal({
  film,
  reduce,
  onClose,
}: {
  film: ShortFilm;
  reduce: boolean;
  onClose: () => void;
}) {
  const embed = youtubeEmbedSrc(film.videoUrl);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" ||
        event.key === " " ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close film"
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
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={film.title}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.26, ease: EASE }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-ink shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          {embed ? (
            <iframe
              src={embed}
              title={film.title}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <p className="flex h-full items-center justify-center font-mono text-xs tracking-widest text-cream/60 uppercase">
              Video unavailable
            </p>
          )}
        </div>
        <p className="mt-4 display text-xl text-cream">{film.title}</p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-cream/50 uppercase">
          {film.year} · {film.runtime} · {film.role}
        </p>
      </motion.div>
    </motion.div>
  );
}
