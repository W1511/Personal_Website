"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LightLeak({ burst = false }: { burst?: boolean }) {
  const reduce = useReducedMotion();
  const [flare, setFlare] = useState({ x: 50, y: 40 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setFlare({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-1/4 top-0 h-[70%] w-[55%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,77,0.4) 0%, rgba(232,90,50,0.16) 40%, transparent 70%)",
        }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 40, -20, 0],
                y: [0, 30, 10, 0],
                opacity: [0.4, 0.65, 0.45, 0.4],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/5 bottom-0 h-[60%] w-[50%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(79,212,203,0.32) 0%, rgba(18,168,159,0.14) 45%, transparent 70%)",
        }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, -30, 15, 0],
                y: [0, -20, 25, 0],
                opacity: [0.35, 0.55, 0.4, 0.35],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {!reduce && (
        <div
          className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-300"
          style={{
            left: `${flare.x}%`,
            top: `${flare.y}%`,
            background:
              "radial-gradient(circle, rgba(255,248,239,0.4) 0%, rgba(255,122,77,0.18) 40%, transparent 70%)",
            opacity: 0.55,
          }}
        />
      )}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 28%, rgba(255,122,77,0.5) 46%, rgba(255,248,239,0.4) 52%, rgba(79,212,203,0.35) 58%, transparent 72%)",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0, x: "-30%" }}
        animate={
          burst
            ? { opacity: [0, 0.9, 0], x: ["-30%", "10%", "40%"] }
            : { opacity: 0, x: "-30%" }
        }
        transition={{ duration: 0.85, ease: "easeOut" }}
      />
    </div>
  );
}
