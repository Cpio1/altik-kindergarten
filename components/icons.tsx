import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const paths: Record<string, React.ReactNode> = {
  language: (
    <>
      <path d="M4 5h16v10H9l-5 4z" />
      <path d="M8.5 9h7M8.5 12h4.5" />
    </>
  ),
  meal: (
    <>
      <path d="M3 13h18a9 9 0 0 1-18 0z" />
      <path d="M8 9c0-1.5 1-2 1-3.5M12 9c0-1.5 1-2 1-3.5M16 9c0-1.5 1-2 1-3.5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  kids: (
    <>
      <circle cx="8" cy="7" r="2.5" />
      <circle cx="16.5" cy="8.5" r="2" />
      <path d="M3.5 20v-2a4.5 4.5 0 0 1 9 0v2M13 20v-1.5a3.5 3.5 0 0 1 7 0V20" />
    </>
  ),
  salt: (
    <>
      <path d="M12 3l7 4v10l-7 4-7-4V7z" />
      <path d="M12 3v18M5 7l7 4 7-4" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="3.5" />
      <path d="M12 4v4M9 13h.01M15 13h.01M9.5 16h5M2 12v3M22 12v3" />
      <circle cx="12" cy="3.5" r="1" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z" />
      <path d="M12 8.2l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5.2A3 3 0 0 0 7 17a3 3 0 0 0 5 2V5.5A2.5 2.5 0 0 0 9.5 4z" />
      <path d="M14.5 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5.2A3 3 0 0 1 17 17a3 3 0 0 1-5 2" />
    </>
  ),
  speech: (
    <>
      <path d="M5 16.5A8 8 0 1 1 8 19l-4 1z" />
      <path d="M9 10.5c.8-1 2-1 2.8 0s2 1 2.8 0M9 13.5h4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.3-4A8 8 0 1 1 8.3 19z" />
      <path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" />
    </>
  ),
  folder: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M8 13h8M8 16h5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h11M4 17h16" />,
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.4-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.6-7.5 10-7.5 10z" />,
};

export type IconName = keyof typeof paths;

export function Icon({ name, ...props }: IconProps & { name: string }) {
  return (
    <svg {...base} {...props}>
      {paths[name] ?? paths.sparkle}
    </svg>
  );
}
