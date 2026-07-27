"use client";

import { photos, type PhotoFrame } from "@/lib/content";
import NextSceneButton from "@/components/NextSceneButton";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ContactSheet({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<PhotoFrame | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="min-h-[100svh] bg-charcoal px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hand text-2xl text-tungsten-hot">contact sheet · roll 01</p>
            <h2 className="display text-4xl text-cream sm:text-5xl">Photography</h2>
          </div>
          <p className="max-w-xs text-sm text-cream/55">
            Hover a frame. Click to pull a print. Swap placeholders in{" "}
            <code className="text-teal-soft">/public/placeholders</code>.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-sm border border-cream/10 bg-[#0e0c0a] p-3 sm:p-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-4 sprocket-edge opacity-80 sm:w-5" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-4 sprocket-edge opacity-80 sm:w-5" />

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:px-4">
            {photos.map((photo) => (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => setActive(photo)}
                whileHover={reduce ? undefined : { scale: 1.06, zIndex: 2 }}
                className="group relative aspect-[4/5] overflow-hidden border border-cream/20 bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
                style={{ rotate: `${photo.rotation}deg` }}
                aria-label={`Open ${photo.title}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover opacity-90 transition group-hover:opacity-100"
                  sizes="(max-width: 640px) 45vw, 20vw"
                />
                <span className="absolute bottom-1 left-1 right-1 truncate bg-black/50 px-1 font-mono text-[10px] text-cream/80">
                  {photo.id.toUpperCase()}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
        <NextSceneButton onNext={onNext} dark />
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ y: 24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex overflow-hidden rounded-sm border border-cream/20 bg-[#14110e] shadow-2xl">
                <div className="sprocket-edge w-4 shrink-0 sm:w-5" />
                <div className="relative flex-1 p-3 sm:p-4">
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                    <Image
                      src={active.src}
                      alt={active.title}
                      fill
                      className="object-cover"
                      sizes="512px"
                    />
                  </div>
                  <p className="hand mt-3 text-center text-2xl text-cream">{active.title}</p>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="mx-auto mt-2 block text-xs tracking-widest text-cream/50 uppercase hover:text-cream"
                  >
                    Close print
                  </button>
                </div>
                <div className="sprocket-edge w-4 shrink-0 sm:w-5" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
