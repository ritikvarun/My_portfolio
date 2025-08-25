import React from "react";

/**
 * SkillsMarquee
 * - Pure React + TailwindCSS marquee (no external libs)
 * - SVG icons inline so it works anywhere (Next.js/CRA/Vite)
 * - Two rows scrolling in opposite directions
 * - Hover to pause
 * - Respects reduced-motion
 *
 * Usage:
 *   <SkillsMarquee className="my-16" />
 */

// --- Minimal SVG logo set (inline) ---
const IconHTML = () => (
  <svg viewBox="0 0 128 128" className="size-5" aria-hidden>
    <path fill="#E34F26" d="M19 114L9 2h110l-10 112-45 12" />
    <path fill="#EF652A" d="M64 117l36-10 9-101H64" />
    <path
      fill="#fff"
      d="M64 66H48l-1-12h17V42H33l3 34h28zM64 96l-.1.03L48.5 92 47.6 82h-12l1.7 20 26.6 7.3.1-.03V96z"
    />
    <path
      fill="#EBEBEB"
      d="M64 66v12h15.1L78 92l-14 .03V109l26.6-7.3 3-33.7H64zM64 42v12h31l1-12H64z"
    />
  </svg>
);

const IconCSS = () => (
  <svg viewBox="0 0 128 128" className="size-5" aria-hidden>
    <path fill="#1572B6" d="M19 114L9 2h110l-10 112-45 12" />
    <path fill="#33A9DC" d="M64 117l36-10 9-101H64" />
    <path
      fill="#fff"
      d="M64 66H48l1-12h15V42H33l-3 34h34zM64 96l-.1.03L48.5 92 47.6 82h-12l1.7 20 26.6 7.3.1-.03V96z"
    />
    <path
      fill="#EBEBEB"
      d="M64 66v12h15.1L78 92l-14 .03V109l26.6-7.3 3-33.7H64zM64 42v12h31l1-12H64z"
    />
  </svg>
);

const IconJS = () => (
  <svg viewBox="0 0 128 128" className="size-5" aria-hidden>
    <rect width="128" height="128" fill="#F7DF1E" rx="16" />
    <path d="M86 98c4 6 9 9 17 9 8 0 13-4 13-10 0-6-4-9-14-13l-5-2c-14-6-23-13-23-28 0-14 11-25 28-25 12 0 21 4 27 15l-15 9c-3-6-7-8-12-8-6 0-10 4-10 9 0 6 4 9 14 13l5 2c16 7 24 14 24 29 0 17-13 26-30 26-17 0-28-8-33-18l14-8zM36 100c3 5 6 9 13 9 7 0 11-3 11-13V48h17v49c0 19-11 30-28 30-15 0-24-8-28-18l15-9z" />
  </svg>
);

const IconReact = () => (
  <svg viewBox="0 0 128 128" className="size-5" aria-hidden>
    <circle cx="64" cy="64" r="10" fill="#61dafb" />
    <g fill="none" stroke="#61dafb" strokeWidth="6">
      <ellipse cx="64" cy="64" rx="50" ry="20" />
      <ellipse cx="64" cy="64" rx="50" ry="20" transform="rotate(60 64 64)" />
      <ellipse cx="64" cy="64" rx="50" ry="20" transform="rotate(120 64 64)" />
    </g>
  </svg>
);

const IconNode = () => (
  <svg viewBox="0 0 128 128" className="size-5" aria-hidden>
    <path d="M64 8l50 28v56l-50 28L14 92V36L64 8z" fill="#3C873A" />
    <path d="M64 22l36 20v44L64 106 28 86V42L64 22z" fill="#68A063" />
  </svg>
);

const IconExpress = () => (
  <svg viewBox="0 0 200 48" className="h-5 w-auto" aria-hidden>
    <text x="0" y="34" fontFamily="monospace" fontSize="36" fill="currentColor">
      express
    </text>
  </svg>
);

const IconMongo = () => (
  <svg viewBox="0 0 128 128" className="size-5" aria-hidden>
    <path
      fill="#13AA52"
      d="M64 8s18 22 18 48-12 46-18 56c-6-10-18-30-18-56S64 8 64 8z"
    />
    <path
      fill="#C2EABD"
      d="M64 24s10 16 10 32-6 28-10 34c-4-6-10-18-10-34S64 24 64 24z"
    />
  </svg>
);

const IconMySQL = () => (
  <svg viewBox="0 0 200 64" className="h-5 w-auto" aria-hidden>
    <text x="0" y="44" fontFamily="monospace" fontSize="40" fill="#00758F">
      MySQL
    </text>
  </svg>
);

const IconFramerMotion = () => (
  <svg viewBox="0 0 128 128" className="size-5" aria-hidden>
    <path fill="#000" d="M20 20h48l20 20H40z" />
    <path fill="#A259FF" d="M40 40h48l20 20H60z" />
    <path fill="#F24E1E" d="M60 60h48L84 84H36z" />
  </svg>
);

const skills = [
  { name: "HTML", icon: <IconHTML /> },
  { name: "CSS", icon: <IconCSS /> },
  { name: "JavaScript", icon: <IconJS /> },
  { name: "React", icon: <IconReact /> },
  { name: "Node.js", icon: <IconNode /> },
  { name: "Express", icon: <IconExpress /> },
  { name: "Framer Motion", icon: <IconFramerMotion /> },
  { name: "MongoDB", icon: <IconMongo /> },
  { name: "MySQL", icon: <IconMySQL /> },
];

function Row({ reverse = false }) {
  // Duplicate the list so the marquee looks continuous
  const items = [...skills, ...skills];
  return (
    <div
      className={[
        "group flex gap-3 py-2",
        
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        "overflow-hidden",
        "h-5"
      ].join(" ")}
    >
      <div
        className={[
          "flex shrink-0 items-center gap-3",
          "animate-marquee motion-reduce:animate-none",
          reverse ? "[animation-direction:reverse]" : "",
          "hover:[animation-play-state:paused]",
        ].join(" ")}
      >
        {items.map((s, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-xl" aria-hidden>
              {s.icon}
            </span>
            <span className="text-sm font-medium tracking-wide">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsMarquee({ className = "" }) {
  return (
    <section className={`w-full ${className}`}>
      <div className="w-[350px] h- rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-4 sm:p-6">
        <Row reverse />
      </div>
      {/* Tailwind keyframes (can be moved to globals.css) */}
      <style>{`
        @keyframes marquee { to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 18s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
