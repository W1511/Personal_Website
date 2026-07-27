"use client";

import NextSceneButton from "@/components/NextSceneButton";
import TicketStub from "@/components/TicketStub";
import VintageSlideshow from "@/components/VintageSlideshow";
import { films, shorts } from "@/lib/content";

type Props = {
  part: "shorts" | "films";
  onNext: () => void;
};

export default function TapedFrame({ part, onNext }: Props) {
  if (part === "shorts") {
    return (
      <section className="paper-surface relative min-h-[100svh] overflow-hidden px-4 py-24 sm:px-8">
        <div className="paper-grain absolute inset-0" aria-hidden />
        <div className="relative z-10">
          <VintageSlideshow
            slides={shorts}
            eyebrow="projection booth · slideshow"
            title="Short films"
            blurb="Auto-advancing stills with room for the story — title, role, and synopsis front and center."
          />
          <div className="mx-auto mt-2 max-w-6xl">
            <NextSceneButton onNext={onNext} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[100svh] bg-[#1a1612] px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end gap-6">
          <div>
            <p className="hand text-2xl text-teal-soft">feature wall</p>
            <h2 className="display text-4xl text-cream sm:text-5xl">Films</h2>
          </div>
          <div className="relative hidden h-28 w-40 sm:block" aria-hidden>
            <span className="tape absolute top-2 left-6 z-10 h-5 w-16 -rotate-6" />
            <div className="h-full w-full rotate-3 border-2 border-dashed border-cream/25 bg-cream/5" />
          </div>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-8 sm:justify-start">
          {films.map((ticket, i) => (
            <TicketStub key={ticket.id} ticket={ticket} index={i + 1} />
          ))}
        </div>
        <NextSceneButton onNext={onNext} dark />
      </div>
    </section>
  );
}
