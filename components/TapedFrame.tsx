"use client";

import ProjectionBooth from "@/components/ProjectionBooth";

export default function TapedFrame() {
  return (
    <section className="relative min-h-[calc(100svh-5.25rem)] overflow-x-hidden px-4 pt-2 pb-16 sm:px-8 sm:pt-3 sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 28%, rgba(232,90,50,0.14), transparent 52%), radial-gradient(ellipse at 50% 110%, rgba(0,0,0,0.55), transparent 48%), #140f0c",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />
      <div className="relative z-10">
        <ProjectionBooth />
      </div>
    </section>
  );
}
