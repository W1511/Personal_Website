"use client";

/** Small cartoon gear stickers for the hero — kept simple so the page doesn't feel crowded. */

export function SonyAlphaCartoon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 78"
      className={className}
      width={112}
      height={73}
      aria-hidden
    >
      <rect x="8" y="22" width="90" height="48" rx="8" fill="#1a1612" stroke="#3d342c" strokeWidth="2" />
      <rect x="14" y="14" width="58" height="14" rx="3" fill="#2a2420" />
      <circle cx="78" cy="46" r="22" fill="#12100e" stroke="#4a3f36" strokeWidth="3" />
      <circle cx="78" cy="46" r="14" fill="#1e3a38" stroke="#12a89f" strokeWidth="2" />
      <circle cx="78" cy="46" r="6" fill="#0a1817" />
      <circle cx="78" cy="46" r="2.5" fill="#4fd4cb" opacity="0.9" />
      <rect x="20" y="28" width="22" height="10" rx="2" fill="#2a2420" />
      <circle cx="28" cy="18" r="3" fill="#e85a32" />
      <text x="18" y="62" fill="#faf6ee" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
        α6400
      </text>
      <rect x="98" y="36" width="10" height="18" rx="2" fill="#2a2420" />
    </svg>
  );
}

export function InstaxMiniCartoon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 100"
      className={className}
      width={78}
      height={86}
      aria-hidden
    >
      <rect x="8" y="8" width="74" height="84" rx="10" fill="#fff8ef" stroke="#e8dcc4" strokeWidth="2" />
      <rect x="8" y="8" width="74" height="18" rx="10" fill="#ff7a4d" />
      <rect x="8" y="18" width="74" height="8" fill="#ff7a4d" />
      <circle cx="45" cy="52" r="20" fill="#2a2420" />
      <circle cx="45" cy="52" r="13" fill="#3d6b66" />
      <circle cx="45" cy="52" r="6" fill="#1a1612" />
      <circle cx="40" cy="48" r="3" fill="#fff8ef" opacity="0.35" />
      <rect x="16" y="28" width="14" height="10" rx="2" fill="#1a1612" />
      <circle cx="68" cy="32" r="4" fill="#12a89f" />
      <text x="22" y="84" fill="#1a1612" fontSize="9" fontFamily="Georgia, serif">
        instax
      </text>
    </svg>
  );
}

export function PremiereTimelineCartoon({ className = "" }: { className?: string }) {
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  const trackYs = [34, 46, 58, 70]; // V4–V1-ish
  const audioYs = [86, 100];

  return (
    <svg
      viewBox="0 0 210 120"
      className={className}
      width={188}
      height={108}
      aria-hidden
    >
      {/* floating window */}
      <rect x="1" y="1" width="208" height="118" rx="10" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="2" />
      <rect x="1" y="1" width="208" height="16" rx="10" fill="#2a2a2a" />
      <rect x="1" y="10" width="208" height="7" fill="#2a2a2a" />

      {/* traffic lights */}
      <circle cx="12" cy="9" r="3" fill="#ff5f57" />
      <circle cx="22" cy="9" r="3" fill="#febc2e" />
      <circle cx="32" cy="9" r="3" fill="#28c840" />

      <text x="44" y="12" fill="#cfcfcf" fontSize="7" fontFamily={mono}>
        Timeline
      </text>
      <text x="148" y="12" fill="#4ea8ff" fontSize="7.5" fontFamily={mono} fontWeight="700">
        00:14:52:17
      </text>

      {/* track header column */}
      <rect x="4" y="20" width="28" height="96" fill="#252525" />
      {["V4", "V3", "V2", "V1"].map((label, i) => (
        <g key={label}>
          <text x="8" y={trackYs[i] + 7} fill="#9a9a9a" fontSize="6.5" fontFamily={mono}>
            {label}
          </text>
          <circle cx="26" cy={trackYs[i] + 4} r="2" fill="#555" />
        </g>
      ))}
      {["A1", "A2"].map((label, i) => (
        <g key={label}>
          <text x="8" y={audioYs[i] + 7} fill="#9a9a9a" fontSize="6.5" fontFamily={mono}>
            {label}
          </text>
          <circle cx="26" cy={audioYs[i] + 4} r="2" fill="#555" />
        </g>
      ))}

      {/* timeline canvas */}
      <rect x="32" y="20" width="174" height="96" fill="#161616" />

      {/* time ruler */}
      <rect x="32" y="20" width="174" height="10" fill="#222" />
      {[40, 70, 100, 130, 160, 190].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="26" x2={x} y2="30" stroke="#666" strokeWidth="1" />
          <text x={x - 4} y="25" fill="#777" fontSize="5" fontFamily={mono}>
            {i * 2}s
          </text>
        </g>
      ))}

      {/* V4 — hot pink adjustment / logo row */}
      <rect x="38" y={trackYs[0]} width="72" height="9" rx="2" fill="#e85a9a" />
      <rect x="114" y={trackYs[0]} width="28" height="9" rx="2" fill="#ff6bb5" />
      <rect x="146" y={trackYs[0]} width="18" height="9" rx="2" fill="#c93d7a" />
      <text x="42" y={trackYs[0] + 6.5} fill="#fff" fontSize="5" fontFamily={mono} opacity="0.9">
        Adj Layer
      </text>

      {/* V3 — blue video + yellow pop */}
      <rect x="38" y={trackYs[1]} width="48" height="9" rx="2" fill="#4a7dff" />
      <rect x="90" y={trackYs[1]} width="36" height="9" rx="2" fill="#f5d547" />
      <rect x="130" y={trackYs[1]} width="52" height="9" rx="2" fill="#5b8aff" />
      <text x="42" y={trackYs[1] + 6.5} fill="#fff" fontSize="5" fontFamily={mono} opacity="0.9">
        B-roll
      </text>

      {/* V2 — chopped blue clips */}
      {[38, 52, 64, 78, 92, 106, 120, 136, 150, 166].map((x, i) => (
        <rect
          key={`v2-${i}`}
          x={x}
          y={trackYs[2]}
          width={i % 3 === 0 ? 10 : 8}
          height="9"
          rx="1.5"
          fill={i % 4 === 0 ? "#6ea0ff" : "#3d6de0"}
        />
      ))}

      {/* V1 — long blue + coral accent */}
      <rect x="38" y={trackYs[3]} width="96" height="9" rx="2" fill="#3b6ef5" />
      <rect x="138" y={trackYs[3]} width="44" height="9" rx="2" fill="#e85a32" />
      <text x="42" y={trackYs[3] + 6.5} fill="#fff" fontSize="5" fontFamily={mono} opacity="0.9">
        A-cam · α6400
      </text>

      {/* A1 — teal audio + waveform */}
      <rect x="38" y={audioYs[0]} width="144" height="11" rx="2" fill="#1a8f88" />
      <path
        d="M42 91.5 L46 88 L50 94 L54 87 L58 95 L62 89 L66 93 L70 88 L74 94 L78 90 L82 95 L86 88 L90 93 L94 89 L98 94 L102 87 L106 95 L110 90 L114 94 L118 88 L122 93 L126 90 L130 95 L134 89 L138 93 L142 88 L146 94 L150 90 L154 95 L158 89 L162 93 L166 90 L170 94 L174 91"
        fill="none"
        stroke="#d8fffb"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* A2 — shorter teal */}
      <rect x="38" y={audioYs[1]} width="88" height="11" rx="2" fill="#12a89f" />
      <path
        d="M42 105.5 L48 102 L54 108 L60 103 L66 109 L72 104 L78 108 L84 102 L90 107 L96 104 L102 109 L108 103 L114 107 L120 105"
        fill="none"
        stroke="#e8fffc"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.8"
      />
      <rect x="132" y={audioYs[1]} width="50" height="11" rx="2" fill="#0e7a74" />

      {/* playhead */}
      <g className="hero-timeline-playhead">
        <line x1="56" y1="20" x2="56" y2="116" stroke="#4ea8ff" strokeWidth="1.6" />
        <polygon points="56,18 50,26 62,26" fill="#4ea8ff" />
      </g>
    </svg>
  );
}
