"use client";

import NextSceneButton from "@/components/NextSceneButton";
import { site } from "@/lib/content";

export default function CallSheetContact({ onNext }: { onNext: () => void }) {
  return (
    <section className="min-h-[100svh] bg-charcoal px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="hand text-2xl text-tungsten-hot">call sheet</p>
        <h2 className="display text-4xl text-cream sm:text-5xl">Contact</h2>

        <div className="relative mt-10 overflow-hidden rounded-sm border border-cream/20 bg-cream text-ink shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <span className="tape absolute top-3 right-8 z-10 h-7 w-24 rotate-3" aria-hidden />
          <div className="border-b border-ink/15 bg-[#e8dcc4] px-5 py-3 font-mono text-[11px] tracking-[0.25em] uppercase">
            Production contact · Wardah Basil Portfolio
          </div>
          <div className="grid gap-0 sm:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4 border-b border-ink/10 p-5 sm:border-r sm:border-b-0">
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">Talent</p>
                <p className="display text-2xl">{site.name}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">Email</p>
                <a className="text-teal underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={site.socials.instagram}
                  className="border border-ink/20 px-3 py-1 text-xs tracking-widest uppercase hover:bg-ink hover:text-cream"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a
                  href={site.socials.linkedin}
                  className="border border-ink/20 px-3 py-1 text-xs tracking-widest uppercase hover:bg-ink hover:text-cream"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <form
              className="space-y-4 p-5"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const name = String(data.get("name") || "");
                const message = String(data.get("message") || "");
                const subject = encodeURIComponent(`Portfolio note from ${name || "someone"}`);
                const body = encodeURIComponent(message);
                window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
              }}
            >
              <label className="block text-sm">
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">Your name</span>
                <input
                  name="name"
                  className="mt-1 w-full border border-ink/20 bg-white/60 px-3 py-2 outline-none focus:border-teal"
                  placeholder="Who's calling?"
                  autoComplete="name"
                />
              </label>
              <label className="block text-sm">
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1 w-full resize-y border border-ink/20 bg-white/60 px-3 py-2 outline-none focus:border-teal"
                  placeholder="Collab, booking, hello…"
                  required
                />
              </label>
              <button
                type="submit"
                className="border border-ink bg-ink px-4 py-2 text-xs tracking-[0.2em] text-cream uppercase transition hover:bg-tungsten hover:border-tungsten"
              >
                Send via email
              </button>
            </form>
          </div>
        </div>

        <p className="hand mt-8 text-center text-xl text-cream/40">end of reel · thanks for watching</p>
        <div className="flex justify-center">
          <NextSceneButton onNext={onNext} label="Back to scene 01 →" dark />
        </div>
      </div>
    </section>
  );
}
