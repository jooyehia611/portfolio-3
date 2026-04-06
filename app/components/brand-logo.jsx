// @flow strict

/**
 * Wordmark + monogram: stylized "Y" in a gradient frame (mint → violet, site theme).
 */
function BrandLogo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-3 sm:gap-3.5 select-none ${className}`}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_2px_12px_rgba(22,242,179,0.25)]"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="yyMarkStroke"
            x1="6"
            y1="6"
            x2="40"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#16f2b3" />
            <stop offset="0.55" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="yyMarkFill" x1="10" y1="10" x2="34" y2="34">
            <stop stopColor="#16f2b3" stopOpacity="0.12" />
            <stop offset="1" stopColor="#a855f7" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect
          x="1.5"
          y="1.5"
          width="41"
          height="41"
          rx="12"
          stroke="url(#yyMarkStroke)"
          strokeWidth="1.5"
          fill="url(#yyMarkFill)"
        />
        {/* Monogram Y + subtle code slash */}
        <path
          d="M14 12 L22 24 L30 12"
          stroke="url(#yyMarkStroke)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 24 L22 32"
          stroke="url(#yyMarkStroke)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <path
          d="M26 28 L31 32"
          stroke="#16f2b3"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <span className="font-bold text-lg sm:text-2xl tracking-tight bg-gradient-to-r from-[#16f2b3] via-[#5eead4] to-[#c084fc] bg-clip-text text-transparent [text-shadow:0_1px_0_rgba(0,0,0,0.35)]">
        Yousef
      </span>
    </span>
  );
}

export default BrandLogo;
