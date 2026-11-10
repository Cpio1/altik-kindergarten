/**
 * Векторные иллюстрации. Используются там, где ещё нет реальных фотографий садика —
 * это рисунок, а не выдача чужого фото за снимок садика.
 */
export function KindergartenIllustration({ className = "", title }: { className?: string; title: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={title}>
      <rect width="400" height="400" fill="#e8f5fe" />
      <circle cx="318" cy="88" r="34" fill="#ffd96b" />
      <path d="M60 110c0-14 12-24 26-24 4-14 16-22 30-22 16 0 28 10 30 24 14 0 24 10 24 22H60z" fill="#fff" />
      <path d="M220 150c0-10 8-17 18-17 3-10 11-15 21-15 11 0 19 7 21 17 10 0 17 7 17 15h-77z" fill="#fff" opacity=".9" />
      <path d="M0 300c70-26 140-26 210-6s130 22 190-4v110H0z" fill="#93dcc2" />
      <path d="M0 330c90-20 170-14 250 4s110 10 150 0v66H0z" fill="#6fcaa8" />
      {/* здание */}
      <rect x="110" y="190" width="180" height="125" rx="14" fill="#fff" />
      <path d="M96 198l104-74 104 74z" fill="#ffb680" />
      <path d="M96 198l104-74 104 74" fill="none" stroke="#e27a33" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="200" cy="168" r="15" fill="#fff7da" stroke="#ffd96b" strokeWidth="5" />
      <rect x="128" y="214" width="40" height="36" rx="9" fill="#8fcdf2" />
      <rect x="232" y="214" width="40" height="36" rx="9" fill="#8fcdf2" />
      <path d="M148 214v36M128 232h40M252 214v36M232 232h40" stroke="#fff" strokeWidth="4" />
      <path d="M178 315v-46a22 22 0 0 1 44 0v46z" fill="#ffd96b" />
      <circle cx="212" cy="294" r="3" fill="#d99a0b" />
      {/* деревья */}
      <rect x="62" y="262" width="8" height="40" rx="4" fill="#c98d5a" />
      <circle cx="66" cy="252" r="24" fill="#6fcaa8" />
      <rect x="330" y="258" width="8" height="44" rx="4" fill="#c98d5a" />
      <circle cx="334" cy="246" r="26" fill="#93dcc2" />
      {/* цветы */}
      {[
        [96, 330, "#ffb680"],
        [130, 342, "#ffd96b"],
        [280, 338, "#8fcdf2"],
        [318, 330, "#ffb680"],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="7" fill={c as string} />
          <circle cx={x as number} cy={y as number} r="2.5" fill="#fff" />
        </g>
      ))}
      {/* шарики */}
      <path d="M300 200c0 30-8 50-8 70" stroke="#5a6a82" strokeWidth="1.5" fill="none" />
      <ellipse cx="300" cy="186" rx="13" ry="16" fill="#ffb680" />
      <path d="M318 214c-4 26-10 40-14 56" stroke="#5a6a82" strokeWidth="1.5" fill="none" />
      <ellipse cx="320" cy="200" rx="12" ry="15" fill="#8fcdf2" />
    </svg>
  );
}

/** Иллюстрации приёмов пищи (без конкретного меню). */
export function FoodIllustration({ kind, className = "" }: { kind: string; className?: string }) {
  switch (kind) {
    case "breakfast":
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="86" cy="30" r="14" fill="#ffd96b" />
          <ellipse cx="60" cy="96" rx="44" ry="8" fill="#ffe7cf" />
          <path d="M24 56h62v18a24 24 0 0 1-24 24h-14a24 24 0 0 1-24-24z" fill="#fff" stroke="#ffb680" strokeWidth="5" />
          <path d="M86 62h6a10 10 0 0 1 0 20h-8" fill="none" stroke="#ffb680" strokeWidth="5" strokeLinecap="round" />
          <path d="M30 60h50" stroke="#f3d7b8" strokeWidth="6" strokeLinecap="round" />
          <path d="M44 44c0-6 5-8 5-14M58 44c0-6 5-8 5-14" stroke="#8fcdf2" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "lunch":
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <ellipse cx="60" cy="98" rx="46" ry="8" fill="#d8f3e8" />
          <path d="M14 60h92a46 34 0 0 1-92 0z" fill="#fff" stroke="#93dcc2" strokeWidth="5" />
          <ellipse cx="60" cy="60" rx="46" ry="9" fill="#ffd96b" />
          <circle cx="46" cy="58" r="5" fill="#ffb680" />
          <circle cx="66" cy="61" r="4" fill="#6fcaa8" />
          <circle cx="76" cy="57" r="4.5" fill="#ffb680" />
          <path d="M44 42c0-6 5-8 5-14M60 40c0-6 5-8 5-14M76 42c0-6 5-8 5-14" stroke="#8fcdf2" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M96 30l-16 26" stroke="#5a6a82" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "snack":
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <ellipse cx="60" cy="100" rx="40" ry="7" fill="#e3f1fb" />
          <path d="M60 38c-26-12-44 6-40 30 4 22 22 34 40 26 18 8 36-4 40-26 4-24-14-42-40-30z" fill="#ffb680" />
          <path d="M60 38c-4-10-2-18 6-24" stroke="#a0683d" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M64 24c10-10 22-8 26-2-8 8-18 8-26 2z" fill="#6fcaa8" />
          <ellipse cx="42" cy="56" rx="6" ry="10" fill="#fff" opacity=".55" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <ellipse cx="60" cy="100" rx="46" ry="8" fill="#fff0c8" />
          <ellipse cx="60" cy="72" rx="46" ry="22" fill="#fff" stroke="#8fcdf2" strokeWidth="5" />
          <ellipse cx="60" cy="70" rx="30" ry="12" fill="#ffe9a8" />
          <path d="M42 66c6-6 12-6 18 0s12 6 18 0" stroke="#ffb680" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M98 22a14 14 0 1 0 6 26 18 18 0 0 1-6-26z" fill="#ffd96b" />
          <path d="M26 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffd96b" />
        </svg>
      );
  }
}
