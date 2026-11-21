interface LogoMarkProps {
  /** Prefixo único por uso na página: os gradientes do SVG são referenciados por id. */
  idPrefix: string;
  className?: string;
}

/** A mira do logo: anel com quatro aberturas, marcas nos eixos e as pessoas no centro. */
export function LogoMark({ idPrefix, className }: LogoMarkProps) {
  const ring = `${idPrefix}-ring`;
  const core = `${idPrefix}-core`;

  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        {/* userSpaceOnUse: linhas retas têm caixa de largura zero e sumiriam com objectBoundingBox */}
        <linearGradient id={ring} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0" stopColor="#123C9D" />
          <stop offset="1" stopColor="#48A9F4" />
        </linearGradient>
        <radialGradient id={core} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#3B7BF0" />
          <stop offset="1" stopColor="#123C9D" />
        </radialGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="none"
        stroke={`url(#${ring})`}
        strokeWidth="6"
        strokeDasharray="32.7 5"
        strokeDashoffset="35.2"
      />
      <g stroke={`url(#${ring})`} strokeWidth="4" strokeLinecap="round">
        <line x1="32" y1="3" x2="32" y2="13" />
        <line x1="51" y1="32" x2="61" y2="32" />
        <line x1="32" y1="51" x2="32" y2="61" />
        <line x1="3" y1="32" x2="13" y2="32" />
      </g>
      <circle cx="32" cy="32" r="14" fill={`url(#${core})`} />
      <g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="32" cy="29" r="3.2" />
        <path d="M26.5 38.5c0-3.2 2.4-5.4 5.5-5.4s5.5 2.2 5.5 5.4" />
        <circle cx="25.6" cy="31" r="2.3" />
        <path d="M21.4 37.6c0-2.4 1.8-4 4.2-4" />
        <circle cx="38.4" cy="31" r="2.3" />
        <path d="M42.6 37.6c0-2.4-1.8-4-4.2-4" />
      </g>
    </svg>
  );
}
