"use client";

type DoodleProps = {
  className?: string;
};

export function PeekingCat({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 170 120"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="about-cat-tail">
        <path
          d="M22 78 C4 70 -4 48 14 36 C26 28 34 46 24 54 C14 64 28 76 48 82"
          stroke="#eadfcb"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <path
          d="M22 78 C4 70 -4 48 14 36 C26 28 34 46 24 54 C14 64 28 76 48 82"
          stroke="#16100e"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
      </g>

      <path
        d="M54 86 C58 58 78 44 98 46 C118 48 132 64 134 88 C110 78 78 78 54 86 Z"
        fill="#16100e"
        stroke="#eadfcb"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <g className="about-cat-ear-l">
        <path d="M70 58 L74 24 L94 50 Z" fill="#16100e" stroke="#eadfcb" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M76 52 L78 32 L88 48 Z" fill="#e85a32" opacity="0.45" />
      </g>
      <g className="about-cat-ear-r">
        <path d="M118 54 L136 22 L108 52 Z" fill="#16100e" stroke="#eadfcb" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M116 50 L128 30 L108 48 Z" fill="#e85a32" opacity="0.45" />
      </g>

      <ellipse cx="96" cy="68" rx="34" ry="28" fill="#16100e" stroke="#eadfcb" strokeWidth="1.5" />

      <g className="about-cat-blink">
        <ellipse cx="84" cy="66" rx="6.4" ry="7.4" fill="#12a89f" />
        <ellipse cx="110" cy="66" rx="6.4" ry="7.4" fill="#12a89f" />
        <circle cx="86" cy="63.8" r="1.9" fill="#fff8ef" />
        <circle cx="112" cy="63.8" r="1.9" fill="#fff8ef" />
      </g>

      <path d="M96 70 L91 77 L101 77 Z" fill="#e85a32" />
      <path d="M96 77 Q96 83 92 85" stroke="#eadfcb" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M68 72 Q54 68 46 62" stroke="#eadfcb" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
      <path d="M68 78 Q52 80 44 76" stroke="#eadfcb" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
      <path d="M124 72 Q138 68 146 62" stroke="#eadfcb" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
      <path d="M124 78 Q140 80 148 76" stroke="#eadfcb" strokeWidth="1" strokeLinecap="round" opacity="0.75" />

      <ellipse cx="78" cy="98" rx="14" ry="10" fill="#16100e" stroke="#eadfcb" strokeWidth="1.3" />
      <ellipse cx="118" cy="96" rx="13" ry="9" fill="#16100e" stroke="#eadfcb" strokeWidth="1.3" />
      <path d="M70 100 L66 106" stroke="#eadfcb" strokeWidth="1" strokeLinecap="round" />
      <path d="M76 100 L74 107" stroke="#eadfcb" strokeWidth="1" strokeLinecap="round" />
      <path d="M126 98 L130 104" stroke="#eadfcb" strokeWidth="1" strokeLinecap="round" />
      <path d="M122 98 L124 105" stroke="#eadfcb" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function MatchaCup({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 110" className={className} aria-hidden fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 38 C20 70 24 96 45 98 C66 96 70 70 68 38 Z" fill="#1c1612" stroke="#eadfcb" strokeWidth="1.6" />
      <path d="M24 52 C28 50 62 50 66 52 L64 78 C60 76 30 76 26 78 Z" fill="#12a89f" opacity="0.5" />
      <ellipse cx="45" cy="38" rx="23" ry="7" fill="#4fd4cb" stroke="#eadfcb" strokeWidth="1.4" />
      <ellipse cx="45" cy="36" rx="10" ry="3.2" fill="#fff8ef" opacity="0.28" />
      <path d="M52 18 C56 28 54 48 50 70" stroke="#e85a32" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 16 C44 14 58 12 56 20" stroke="#e85a32" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CoffeeCup({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 110" className={className} aria-hidden fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="about-steam">
        <path d="M38 18 C36 10 42 8 40 4" stroke="#eadfcb" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        <path d="M48 16 C50 8 44 7 46 2" stroke="#eadfcb" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
        <path d="M58 18 C60 11 54 9 56 4" stroke="#eadfcb" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      </g>
      <path d="M24 40 C22 78 28 98 48 100 C68 98 74 78 72 40 Z" fill="#1c1612" stroke="#eadfcb" strokeWidth="1.6" />
      <path d="M72 48 C86 48 88 68 74 70" stroke="#eadfcb" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="48" cy="40" rx="24" ry="8" fill="#3a2418" stroke="#eadfcb" strokeWidth="1.4" />
      <ellipse cx="48" cy="38" rx="14" ry="4" fill="#e85a32" opacity="0.32" />
    </svg>
  );
}

export function VintageCamera({ className }: DoodleProps) {
  return (
    <button
      type="button"
      className={`about-camera relative inline-flex cursor-pointer border-0 bg-transparent p-0 ${className ?? ""}`}
      aria-label="Vintage camera"
    >
      <svg viewBox="0 0 140 100" className="h-full w-full" aria-hidden fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="32" width="112" height="56" rx="8" fill="#1c1612" stroke="#eadfcb" strokeWidth="1.8" />
        <path d="M40 32 L48 18 H78 L86 32" fill="#1c1612" stroke="#eadfcb" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="78" cy="60" r="18" stroke="#eadfcb" strokeWidth="1.8" fill="#140f0c" />
        <circle cx="78" cy="60" r="10" stroke="#12a89f" strokeWidth="2" fill="#1a1614" />
        <circle cx="78" cy="60" r="4" fill="#12a89f" opacity="0.7" />
        <circle cx="36" cy="48" r="4" fill="#e85a32" />
        <rect x="28" y="58" width="16" height="6" rx="1" fill="#eadfcb" opacity="0.2" />
        <rect x="108" y="22" width="16" height="12" rx="2" fill="#eadfcb" />
        <rect x="112" y="14" width="8" height="10" rx="1" fill="#e85a32" />
      </svg>
      <span
        className="about-flash absolute -right-2 -top-3 h-16 w-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,248,239,0.95) 0%, rgba(232,90,50,0.45) 38%, transparent 70%)",
        }}
      />
    </button>
  );
}

export function SketchStar({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <path
        d="M12 2 L13.6 9.2 L21 12 L13.6 14.8 L12 22 L10.4 14.8 L3 12 L10.4 9.2 Z"
        stroke="#12a89f"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SketchArrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 36" className={className} aria-hidden fill="none">
      <path d="M4 22 C22 6 48 4 72 14" stroke="#12a89f" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M62 6 L74 14 L60 20" stroke="#12a89f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SketchCurve({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 72 40" className={className} aria-hidden fill="none">
      <path d="M6 32 C18 8 46 6 66 22" stroke="#12a89f" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M54 14 L68 22 L52 28" stroke="#12a89f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
