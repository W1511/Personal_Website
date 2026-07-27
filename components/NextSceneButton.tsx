"use client";

type Props = {
  onNext: () => void;
  label?: string;
  dark?: boolean;
};

export default function NextSceneButton({ onNext, label = "Next scene →", dark = false }: Props) {
  return (
    <div className="mt-10 flex justify-center sm:justify-start">
      <button
        type="button"
        onClick={onNext}
        className={`inline-flex items-center gap-2 border px-5 py-3 text-sm tracking-[0.18em] uppercase transition ${
          dark
            ? "border-cream/40 bg-cream/10 text-cream hover:bg-cream/20"
            : "border-ink/30 bg-ink text-cream hover:bg-tungsten hover:border-tungsten"
        }`}
      >
        {label}
      </button>
    </div>
  );
}
