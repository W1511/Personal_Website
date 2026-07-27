"use client";

import { navItems } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  activeId: string;
  onNavigate: (id: string) => void;
};

export default function FilmStripNav({ activeId, onNavigate }: Props) {
  const reduce = useReducedMotion();

  return (
    <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Scrapbook sections"
        className="pointer-events-auto relative mx-auto grid max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-2 rounded-full border border-cream/20 bg-[#1a1612]/95 px-3 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(250,246,238,0.06)] backdrop-blur-md sm:gap-3 sm:px-4 sm:py-2.5"
      >
        <button
          type="button"
          onClick={() => onNavigate("top")}
          className="display relative z-10 shrink-0 rounded-full border border-tungsten/45 bg-gradient-to-br from-tungsten/25 to-transparent px-3.5 py-2 text-sm tracking-[0.22em] text-cream uppercase transition hover:border-tungsten hover:from-tungsten/40 sm:text-base"
        >
          WB
        </button>

        <div className="relative z-10 flex min-w-0 items-center justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-end gap-0.5 sm:gap-1">
            {navItems.map((item, i) => {
              const isActive = activeId === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`group relative shrink-0 rounded-full px-2.5 py-1.5 text-center transition sm:px-3.5 sm:py-2 ${
                    isActive
                      ? "bg-cream/10 text-cream shadow-[inset_0_0_0_1px_rgba(232,90,50,0.45)]"
                      : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                  }`}
                >
                  <span
                    className={`hand block text-[10px] leading-none sm:text-xs ${
                      isActive ? "text-tungsten-hot" : "text-tungsten/70 group-hover:text-tungsten-hot"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-[14px] sm:text-[17px]">{item.label}</span>
                  <span
                    className={`absolute inset-x-3 bottom-1 mx-auto h-[2px] origin-center rounded-full bg-gradient-to-r from-transparent via-tungsten to-transparent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        <div
          className="pointer-events-none invisible shrink-0 rounded-full px-3.5 py-2 text-sm tracking-[0.22em] uppercase sm:text-base"
          aria-hidden
        >
          WB
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(232,90,50,0.18), transparent 45%), radial-gradient(ellipse at 80% 50%, rgba(18,168,159,0.14), transparent 40%)",
          }}
          aria-hidden
        />
      </nav>
    </header>
  );
}
