/** Декоративные фигурки (только для украшения, скрыты от экранных чтецов). */
type DecorProps = { className?: string; color?: string };

export function Star({ className = "", color = "var(--color-sun)" }: DecorProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 3c1.6 0 2.4 6.6 4.2 8.4S35.4 14.8 36 16.6c.5 1.6-5.8 4.6-6.6 7s1.8 9.3.4 10.3c-1.4 1-6.9-3.4-9.8-3.4s-8.4 4.4-9.8 3.4 1.2-7.9.4-10.3-7.1-5.4-6.6-7C4.6 14.8 14 13.2 15.8 11.4S18.4 3 20 3z"
        fill={color}
      />
    </svg>
  );
}

export function Flower({ className = "", color = "var(--color-peach)" }: DecorProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g fill={color}>
        <circle cx="20" cy="9" r="7" />
        <circle cx="31" cy="17" r="7" />
        <circle cx="27" cy="30" r="7" />
        <circle cx="13" cy="30" r="7" />
        <circle cx="9" cy="17" r="7" />
      </g>
      <circle cx="20" cy="20" r="6" fill="var(--color-sun)" />
    </svg>
  );
}

export function Cloud({ className = "", color = "#fff" }: DecorProps) {
  return (
    <svg viewBox="0 0 80 48" className={className} aria-hidden="true">
      <path
        d="M20 44C9 44 3 38 3 31s6-12 13-12c1-9 8-15 17-15 8 0 14 5 16 12 2-1 4-1 6-1 9 0 16 7 16 15s-6 14-16 14z"
        fill={color}
      />
    </svg>
  );
}

export function Sun({ className = "" }: DecorProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <g stroke="var(--color-sun)" strokeWidth="4" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={30 + Math.cos(a) * 20}
              y1={30 + Math.sin(a) * 20}
              x2={30 + Math.cos(a) * 27}
              y2={30 + Math.sin(a) * 27}
            />
          );
        })}
      </g>
      <circle cx="30" cy="30" r="14" fill="var(--color-sun)" />
    </svg>
  );
}

export function Squiggle({ className = "", color = "var(--color-mint)" }: DecorProps) {
  return (
    <svg viewBox="0 0 80 20" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M3 10c6-8 12-8 18 0s12 8 18 0 12-8 18 0 12 8 18 0"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Dot({ className = "", color = "var(--color-sky)" }: DecorProps) {
  return <span aria-hidden="true" className={`block rounded-full ${className}`} style={{ background: color }} />;
}

/** Волна-разделитель между секциями. fill — цвет следующей секции. */
export function Wave({ fill, flip = false, className = "" }: { fill: string; flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block h-8 w-full sm:h-12 lg:h-16 ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <path d="M0 40c160-30 320-30 480 0s320 30 480 0 320-30 480 0v40H0z" fill={fill} />
    </svg>
  );
}
