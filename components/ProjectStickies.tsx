"use client";

import NextSceneButton from "@/components/NextSceneButton";
import { projects } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";

export default function ProjectStickies({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();

  return (
    <section className="paper-surface relative min-h-[100svh] overflow-hidden px-4 py-24 sm:px-8">
      <div className="paper-grain absolute inset-0" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="hand text-2xl text-teal">washi & sticky notes</p>
          <h2 className="display text-4xl text-ink sm:text-5xl">Projects</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((bucket, i) => (
            <motion.article
              key={bucket.id}
              className="relative p-5 shadow-[0_14px_28px_rgba(26,22,18,0.18)]"
              style={{
                background: bucket.tint,
                rotate: `${bucket.rotate}deg`,
              }}
              whileHover={reduce ? undefined : { rotate: 0, y: -6, scale: 1.02 }}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <span
                className={`absolute -top-2 left-1/2 h-6 w-20 -translate-x-1/2 ${i % 2 === 0 ? "tape" : "tape-blue"}`}
                aria-hidden
              />
              <h3 className="display text-2xl text-ink">{bucket.tool}</h3>
              <p className="hand mt-1 text-xl text-ink-soft">{bucket.note}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {bucket.items.map((item) => (
                  <li key={item} className="border-b border-ink/10 pb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
        <NextSceneButton onNext={onNext} />
      </div>
    </section>
  );
}
