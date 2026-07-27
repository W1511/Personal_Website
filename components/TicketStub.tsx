"use client";

import type { Ticket } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const colors = {
  tungsten: "bg-tungsten text-ink",
  teal: "bg-teal text-cream",
  cream: "bg-paper text-ink",
} as const;

type Props = {
  ticket: Ticket;
  index?: number;
};

export default function TicketStub({ ticket, index = 0 }: Props) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setCanDrag(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      drag={!reduce && canDrag ? "x" : false}
      dragConstraints={{ left: -24, right: 24 }}
      dragElastic={0.12}
      whileHover={reduce ? undefined : { y: -4 }}
      className="relative h-44 w-full max-w-[220px] cursor-pointer perspective-[900px] focus:outline-none focus-visible:ring-2 focus-visible:ring-tungsten"
      style={{ rotate: `${index % 2 === 0 ? -2 : 2.5}deg` }}
      aria-pressed={flipped}
      aria-label={`${ticket.title}. Click to flip.`}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-l-sm rounded-r-md border border-black/20 p-4 shadow-lg ${colors[ticket.stubColor]}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 right-0 bottom-0 w-4 border-l border-dashed border-black/25" />
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-70">Admit one</p>
            <p className="display mt-2 text-2xl leading-tight">{ticket.title}</p>
          </div>
          <div className="flex items-end justify-between pr-3 text-xs font-medium">
            <span>{ticket.role}</span>
            <span>{ticket.year}</span>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-between rounded-l-sm rounded-r-md border border-black/15 bg-cream p-4 text-ink shadow-lg"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="hand text-xl text-teal">synopsis</p>
          <p className="text-sm leading-snug text-ink-soft">{ticket.synopsis}</p>
          <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">flip back</p>
        </div>
      </motion.div>
    </motion.button>
  );
}
