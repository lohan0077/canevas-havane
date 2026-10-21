/** Le paysage de l'ouverture : une maison au soir, une fenêtre allumée, un chat dedans. */
export default function Paysage({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-label="Une maison au crépuscule, une fenêtre allumée où dort un chat">
      <defs>
        <linearGradient id="ras-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14213D" />
          <stop offset="0.7" stopColor="#2C3F6B" />
          <stop offset="1" stopColor="#566C9E" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#ras-ciel)" />
      <circle cx="318" cy="52" r="20" fill="#F3EBDD" />
      <circle cx="328" cy="46" r="18" fill="#14213D" opacity="0.9" />
      {[[40, 30], [90, 60], [150, 22], [240, 40], [370, 100], [200, 80]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.4" fill="#F3EBDD" opacity="0.8" />
      ))}
      <path d="M0 210 Q100 185 200 200 T400 195 V260 H0 Z" fill="#1B2A4C" />
      <path d="M0 230 Q120 215 240 228 T400 222 V260 H0 Z" fill="#7FB685" opacity="0.35" />
      <rect x="130" y="128" width="140" height="92" fill="#F3EBDD" />
      <path d="M118 132 L200 78 L282 132 Z" fill="#C9A227" />
      <rect x="152" y="152" width="40" height="34" rx="3" fill="#F7D98B" />
      <path d="M160 186 V176 L164 170 L167 175 H173 L176 170 L180 176 V186 Z" fill="#14213D" />
      <rect x="214" y="160" width="32" height="60" rx="3" fill="#14213D" />
      <circle cx="240" cy="192" r="2" fill="#C9A227" />
    </svg>
  );
}
