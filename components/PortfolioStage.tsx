"use client";

import AboutPolaroid from "@/components/AboutPolaroid";
import CallSheetContact from "@/components/CallSheetContact";
import ClapboardHero from "@/components/ClapboardHero";
import ContactSheet from "@/components/ContactSheet";
import FilmStripNav from "@/components/FilmStripNav";
import ProjectStickies from "@/components/ProjectStickies";
import TapedFrame from "@/components/TapedFrame";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export const stages = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "photography", label: "Stills" },
  { id: "shorts", label: "Shorts" },
  { id: "films", label: "Films" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export type StageId = (typeof stages)[number]["id"];

export default function PortfolioStage() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [wiping, setWiping] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (nextIndex: number, dir?: number) => {
      const clamped = Math.max(0, Math.min(stages.length - 1, nextIndex));
      if (clamped === index || wiping) return;
      setDirection(dir ?? (clamped > index ? 1 : -1));
      setWiping(true);
      window.setTimeout(
        () => {
          setIndex(clamped);
          window.setTimeout(() => setWiping(false), reduce ? 0 : 280);
        },
        reduce ? 0 : 420,
      );
    },
    [index, wiping, reduce],
  );

  const goNext = useCallback(() => {
    if (index >= stages.length - 1) {
      goTo(0, -1);
      return;
    }
    goTo(index + 1, 1);
  }, [goTo, index]);

  const goToId = useCallback(
    (id: string) => {
      const i = stages.findIndex((s) => s.id === id);
      if (i >= 0) goTo(i);
    },
    [goTo],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(index - 1, -1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goTo, index]);

  const stage = stages[index];

  return (
    <div className="relative h-[100svh] overflow-hidden bg-charcoal">
      <FilmStripNav activeId={stage.id} onNavigate={goToId} />

      {/* Film wipe / light-leak transition */}
      <AnimatePresence>
        {wiping && (
          <motion.div
            key="wipe"
            className="pointer-events-none absolute inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-charcoal/90"
              style={{
                backgroundImage:
                  "linear-gradient(105deg, transparent 15%, rgba(255,122,77,0.45) 45%, rgba(255,248,239,0.55) 50%, rgba(79,212,203,0.4) 55%, transparent 85%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="display text-3xl tracking-[0.3em] text-cream uppercase sm:text-5xl">
                Scene {String(Math.min(index + (direction > 0 ? 2 : 1), stages.length)).padStart(2, "0")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        key={stage.id}
        className="absolute inset-0 overflow-x-hidden overflow-y-auto"
      >
        {stage.id === "top" && <ClapboardHero onClapComplete={goNext} />}
        {stage.id === "about" && <AboutPolaroid onNext={goNext} />}
        {stage.id === "photography" && <ContactSheet onNext={goNext} />}
        {stage.id === "shorts" && <TapedFrame part="shorts" onNext={goNext} />}
        {stage.id === "films" && <TapedFrame part="films" onNext={goNext} />}
        {stage.id === "projects" && <ProjectStickies onNext={goNext} />}
        {stage.id === "contact" && <CallSheetContact onNext={() => goTo(0, -1)} />}
      </div>
    </div>
  );
}
