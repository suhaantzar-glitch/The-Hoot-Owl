/**
 * Night-time elevation of the old depot beside the tracks, with a lamp, a
 * telegraph line, and one small owl keeping watch. Decorative only.
 */
export function DepotScene({ className = "" }: { className?: string }) {
  const ink = "#100e0c";
  const glow = "#dda94a";
  const windows = [404, 452, 500, 662, 710, 758];

  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <radialGradient id="depot-lamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={glow} stopOpacity=".55" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="depot-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0c46a" />
          <stop offset="1" stopColor={glow} />
        </linearGradient>
        <mask id="depot-crescent">
          <rect width="1200" height="300" fill="#fff" />
          <circle cx="1054" cy="52" r="21" fill="#000" />
        </mask>
        <pattern id="depot-ties" width="34" height="10" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="16" height="10" rx="1" fill={ink} />
        </pattern>
      </defs>

      {/* Sky: moon and a few stars */}
      <circle cx="1040" cy="62" r="24" fill="#efe6d2" opacity=".9" mask="url(#depot-crescent)" />
      {[
        [120, 40],
        [210, 90],
        [470, 34],
        [610, 70],
        [860, 30],
        [930, 96],
        [1150, 120],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#efe6d2" opacity=".55" />
      ))}

      {/* Far tree line */}
      <path
        d="M0 214c90-14 160-8 240-12s170-22 260-14 190 10 280 2 200-18 290-6 100 10 130 8v108H0Z"
        fill="#2c5141"
        opacity=".7"
      />

      {/* Telegraph line */}
      <g stroke={ink} strokeWidth="2" fill="none" opacity=".85">
        <path d="M90 132q85 14 170 0M260 132q330 30 680 0M940 132q90 14 180 0" />
        <path d="M90 140q85 12 170 0M260 140q330 28 680 0M940 140q90 12 180 0" />
      </g>
      {[90, 260, 940, 1120].map((x) => (
        <g key={x} fill={ink}>
          <rect x={x - 3} y="120" width="6" height="150" />
          <rect x={x - 22} y="128" width="44" height="5" />
        </g>
      ))}

      {/* A small owl on the crossarm */}
      <g transform="translate(948 106)">
        <path d="M0 4 5 8h6l5-4 1 9v7c0 5-4 8-9 8s-8-3-8-8v-7Z" fill={ink} />
        <circle cx="5" cy="12" r="1.8" fill={glow} />
        <circle cx="11" cy="12" r="1.8" fill={glow} />
      </g>

      {/* Lamp post */}
      <circle cx="300" cy="168" r="70" fill="url(#depot-lamp)" />
      <rect x="297" y="170" width="6" height="80" fill={ink} />
      <path d="M288 160h24l-4 12h-16Z" fill={ink} />
      <circle cx="300" cy="168" r="5" fill="#f0c46a" />

      {/* The depot */}
      <rect x="250" y="246" width="700" height="10" fill={ink} />
      <rect x="380" y="172" width="440" height="76" fill="#161412" />
      <path d="M338 178h524l-72-50H410Z" fill={ink} />
      <rect x="332" y="175" width="536" height="6" rx="2" fill={ink} />
      {[392, 452, 512, 572, 632, 692, 752, 808].map((x) => (
        <path key={x} d={`M${x} 181h10l-10 12Z`} fill={ink} />
      ))}
      <rect x="704" y="100" width="24" height="34" fill={ink} />
      <rect x="700" y="96" width="32" height="6" fill={ink} />

      {/* Station name board */}
      <rect x="528" y="146" width="144" height="24" rx="3" fill="#efe6d2" />
      <text
        x="600"
        y="165"
        textAnchor="middle"
        fill="#1f3a2e"
        style={{ font: "800 20px var(--font-display)", letterSpacing: "0.18em" }}
      >
        CANTON
      </text>

      {/* Lit windows and door */}
      {windows.map((x) => (
        <g key={x}>
          <rect x={x} y="194" width="28" height="40" fill="url(#depot-window)" opacity=".92" />
          <path d={`M${x + 14} 194v40M${x} 212h28`} stroke="#161412" strokeWidth="3" />
        </g>
      ))}
      <rect x="578" y="190" width="44" height="58" fill="url(#depot-window)" opacity=".85" />
      <path d="M600 190v58" stroke="#161412" strokeWidth="3" />

      {/* Track */}
      <rect x="0" y="276" width="1200" height="10" fill="url(#depot-ties)" />
      <rect x="0" y="271" width="1200" height="5" fill="#c8902e" />
      <rect x="0" y="286" width="1200" height="14" fill="#152a20" />
    </svg>
  );
}
