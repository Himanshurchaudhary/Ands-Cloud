"use client";

// Services section (home page): numbered editorial list with hand-drawn icons.
// Usage (app/page.jsx):  import Services from "@/components/Services";  ...  <Services />
// All classes start with "sv-" so nothing leaks into other sections or pages.
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// Hand-drawn icons. "fill" is the orange hatched shape (printed slightly off),
// "ink" is the wobbly black outline on top, like a misregistered print.
const doodles = {
  web: {
    fill: <rect x="6" y="12" width="52" height="40" rx="5" />,
    ink: (
      <>
        <rect x="6" y="12" width="52" height="40" rx="5" />
        <path d="M6 24 H58" />
        <path d="M14 18 h.5 M21 18 h.5 M28 18 h.5" strokeWidth="4.5" />
        <rect x="13" y="30" width="17" height="14" rx="2" />
        <path d="M37 32 H51 M37 39 H47" />
      </>
    ),
  },
  mobile: {
    fill: <rect x="18" y="6" width="28" height="52" rx="7" />,
    ink: (
      <>
        <rect x="18" y="6" width="28" height="52" rx="7" />
        <path d="M27 12 H37" />
        <rect x="24" y="20" width="16" height="10" rx="2" />
        <path d="M24 37 H40 M24 43 H35" />
        <path d="M32 52 h.5" strokeWidth="4.5" />
      </>
    ),
  },
  cloud: {
    fill: <path d="M17 46 H46 C57 46 59 31 48 29 C48 17 32 13 26 25 C15 23 9 45 17 46 Z" />,
    ink: (
      <>
        <path d="M17 46 H46 C57 46 59 31 48 29 C48 17 32 13 26 25 C15 23 9 45 17 46 Z" />
        <path d="M32 41 V30 M26 35 L32 29 L38 35" />
      </>
    ),
  },
  software: {
    fill: <rect x="8" y="10" width="48" height="44" rx="5" />,
    ink: (
      <>
        <rect x="8" y="10" width="48" height="44" rx="5" />
        <path d="M20 10 V54" />
        <path d="M13 20 H15 M13 28 H15 M13 36 H15" />
        <rect x="26" y="34" width="6" height="12" />
        <rect x="35" y="26" width="6" height="20" />
        <rect x="44" y="18" width="6" height="28" />
      </>
    ),
  },
  ai: {
    fill: <rect x="13" y="21" width="38" height="28" rx="9" />,
    ink: (
      <>
        <rect x="13" y="21" width="38" height="28" rx="9" />
        <path d="M32 21 V11" />
        <circle cx="32" cy="9" r="3" />
        <path d="M6 31 V39 M58 31 V39" />
        <circle cx="24" cy="34" r="3" />
        <circle cx="40" cy="34" r="3" />
        <path d="M25 42 Q32 47 39 42" />
      </>
    ),
  },
  // wrench, tilted so it reads as a tool and not as a fork
  support: {
    fill: (
      <g transform="rotate(40 32 32)">
        <path d="M22 8 H30 V17 H34 V8 H42 V20 A11 11 0 0 1 36 29 V54 A4.5 4.5 0 0 1 27 54 V29 A11 11 0 0 1 22 20 Z" />
      </g>
    ),
    ink: (
      <g transform="rotate(40 32 32)">
        <path d="M22 8 H30 V17 H34 V8 H42 V20 A11 11 0 0 1 36 29 V54 A4.5 4.5 0 0 1 27 54 V29 A11 11 0 0 1 22 20 Z" />
        <path d="M31.5 46 h.5" strokeWidth="4.5" />
      </g>
    ),
  },
};

function Doodle({ name }) {
  const d = doodles[name];
  return (
    <svg className="sv-doodle" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <g transform="translate(3.5 3)" fill="url(#sv-hatch)">{d.fill}</g>
      <g
        fill="none"
        stroke="#111"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#sv-wob)"
      >
        {d.ink}
      </g>
    </svg>
  );
}

// Service data kept separate from the JSX so it is easy to edit later
const services = [
  {
    doodle: "web",
    title: "Web Development",
    description: "Fast, responsive websites and web apps built with Next.js, React and the MERN stack.",
  },
  {
    doodle: "mobile",
    title: "Mobile App Development",
    description: "Android and iOS apps built with React Native (Expo) and published to the Play Store.",
  },
  {
    doodle: "cloud",
    title: "Cloud & Hosting",
    description: "Deployment, VPS setup, domain and SSL configuration, and CI/CD pipelines.",
  },
  {
    doodle: "software",
    title: "Custom Software & SaaS",
    description: "Clinic management, billing, ERP and CRM systems designed around your workflow.",
  },
  {
    doodle: "ai",
    title: "AI Integration & Automation",
    description: "Chatbots, automated workflows and AI features that save time and effort.",
  },
  {
    doodle: "support",
    title: "Maintenance & Support",
    description: "Ongoing updates, bug fixes, performance tuning and reliable technical support.",
  },
];

export default function Services() {
  const rootRef = useRef(null);

  // Scroll reveal: elements with data-reveal fade in when they enter the screen
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const items = root.querySelectorAll("[data-reveal]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    root.classList.add("sv-ready");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <section className="sv-section" id="services" ref={rootRef} aria-labelledby="services-heading">
      {/* Shared drawing filters for the icons (kept out of display:none so browsers still use them) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <defs>
          <filter id="sv-wob" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <pattern id="sv-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#ff6a00" strokeWidth="3" />
          </pattern>
        </defs>
      </svg>

      <span className="sv-blob" aria-hidden="true" />

      <div className="sv-inner sv-grid">
        {/* Left: heading, stays in view while the list scrolls */}
        <div className="sv-intro">
          <span className="sv-eyebrow" data-reveal="left">
            Our Services
          </span>
          <h2 id="services-heading" data-reveal="left" style={{ "--d": "80ms" }}>
            Everything your business needs{" "}
            <span className="sv-mark">
              under one roof
              <svg className="sv-underline" viewBox="0 0 400 24" aria-hidden="true">
                <path d="M4 15 C60 5 140 21 210 10 S340 7 396 13" pathLength="1" />
              </svg>
            </span>
          </h2>
          <p className="sv-lead" data-reveal="left" style={{ "--d": "160ms" }}>
            From the first idea to long-term support, we help you build and grow
            your digital presence.
          </p>

          <div className="sv-count" data-reveal="left" style={{ "--d": "240ms" }} aria-hidden="true">
            <b>{String(services.length).padStart(2, "0")}</b>
            <span>services, one team</span>
            <svg className="sv-curl" viewBox="0 0 140 110">
              <path d="M6 84 C28 22 92 8 128 44" pathLength="1" />
              <path d="M110 34 L130 46 L112 60" />
            </svg>
          </div>
        </div>

        {/* Right: numbered list of services */}
        <ol className="sv-list">
          {services.map((service, i) => (
            <li className="sv-row" key={service.title} data-reveal style={{ "--d": `${i * 70}ms` }}>
              <article className="sv-item">
                <span className="sv-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="sv-icon">
                  <Doodle name={service.doodle} />
                </div>
                <div className="sv-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <ArrowUpRight className="sv-arrow" size={28} strokeWidth={2.4} aria-hidden="true" />
              </article>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .sv-section {
          --sv-orange: var(--brand-orange, #ff6a00);
          --sv-black: var(--brand-black, #111111);
          --sv-cream: #fff4ec;
          --sv-ease: cubic-bezier(0.2, 0.7, 0.2, 1);
          position: relative;
          overflow: hidden;
          overflow: clip; /* clip keeps position: sticky working */
          padding: 110px 0 120px;
          background-color: var(--sv-cream);
          background-image: radial-gradient(rgba(17, 17, 17, 0.14) 1.4px, transparent 1.6px);
          background-size: 24px 24px;
          color: var(--sv-black);
          scroll-margin-top: 80px;
        }

        .sv-section *,
        .sv-section *::before,
        .sv-section *::after {
          box-sizing: border-box;
        }

        .sv-blob {
          position: absolute;
          right: -150px;
          top: -120px;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: var(--sv-orange);
          opacity: 0.14;
        }

        .sv-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .sv-grid {
          display: grid;
          grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
          gap: 80px;
          align-items: start;
        }

        /* ---------- animations ---------- */
        @keyframes sv-draw {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }

        .sv-ready [data-reveal] {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.8s var(--sv-ease) var(--d, 0ms),
            transform 0.8s var(--sv-ease) var(--d, 0ms);
        }

        .sv-ready [data-reveal="left"] { transform: translateX(-40px); }

        .sv-ready [data-reveal].is-in {
          opacity: 1;
          transform: none;
        }

        /* ---------- intro ---------- */
        .sv-intro {
          position: sticky;
          top: 110px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
        }

        .sv-eyebrow {
          display: inline-block;
          color: var(--sv-orange);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .sv-section h2 {
          margin: 0;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 800;
          line-height: 1.15;
          color: var(--sv-black);
        }

        .sv-section h2 span {
          color: var(--sv-orange);
        }

        .sv-mark {
          position: relative;
          display: inline-block;
          max-width: 100%;
        }

        .sv-underline {
          position: absolute;
          left: 0;
          bottom: -0.2em;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .sv-underline path {
          fill: none;
          stroke: var(--sv-orange);
          stroke-width: 6;
          stroke-linecap: round;
          stroke-dasharray: 1;
          animation: sv-draw 1.1s ease 0.6s backwards;
        }

        .sv-lead {
          margin: 0;
          font-size: 17px;
          line-height: 1.7;
          color: #4a4a4a;
          max-width: 420px;
        }

        .sv-count {
          position: relative;
          display: flex;
          align-items: flex-end;
          gap: 14px;
          margin-top: 18px;
        }

        .sv-count b {
          font-size: 96px;
          line-height: 0.85;
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 3px var(--sv-black);
        }

        .sv-count span {
          max-width: 110px;
          font-weight: 700;
          font-size: 15px;
          line-height: 1.3;
        }

        .sv-curl {
          width: 120px;
          margin: 0 0 18px 6px;
          overflow: visible;
        }

        .sv-curl path {
          fill: none;
          stroke: var(--sv-black);
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .sv-curl path:first-child {
          stroke-dasharray: 1;
          animation: sv-draw 1.2s ease 1s backwards;
        }

        /* the arrowhead appears once the curve has reached it */
        .sv-curl path:last-child {
          animation: sv-pop 0.3s ease 2.1s backwards;
        }

        @keyframes sv-pop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ---------- list ---------- */
        .sv-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-bottom: 3px solid var(--sv-black);
        }

        .sv-row {
          border-top: 3px solid var(--sv-black);
        }

        .sv-item {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: grid;
          grid-template-columns: 64px 80px minmax(0, 1fr) 36px;
          align-items: center;
          gap: 0 24px;
          padding: 28px 16px;
        }

        /* orange fill rises from the bottom on hover */
        .sv-item::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: var(--sv-orange);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.45s var(--sv-ease);
        }

        .sv-item:hover::before {
          transform: scaleY(1);
        }

        .sv-num {
          font-size: 40px;
          font-weight: 800;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 2px var(--sv-black);
          transition: color 0.3s ease;
        }

        .sv-item:hover .sv-num {
          color: var(--sv-black);
        }

        /* each icon frame is a slightly different wonky blob, like it was drawn by hand */
        .sv-icon {
          width: 80px;
          height: 80px;
          display: grid;
          place-items: center;
          background: #ffffff;
          border: 3px solid var(--sv-black);
          border-radius: 52% 48% 46% 54% / 50% 54% 46% 50%;
          box-shadow: 4px 5px 0 var(--sv-black);
          transition: transform 0.4s var(--sv-ease);
        }

        .sv-row:nth-child(2) .sv-icon { border-radius: 46% 54% 52% 48% / 54% 46% 54% 46%; }
        .sv-row:nth-child(3) .sv-icon { border-radius: 54% 46% 48% 52% / 46% 52% 48% 54%; }
        .sv-row:nth-child(4) .sv-icon { border-radius: 48% 52% 54% 46% / 52% 48% 52% 48%; }
        .sv-row:nth-child(5) .sv-icon { border-radius: 52% 48% 50% 50% / 48% 52% 50% 50%; }
        .sv-row:nth-child(6) .sv-icon { border-radius: 50% 50% 46% 54% / 54% 46% 52% 48%; }

        .sv-doodle {
          width: 58px;
          height: 58px;
          overflow: visible;
        }

        .sv-item:hover .sv-icon {
          transform: rotate(-7deg) scale(1.06);
        }

        .sv-body h3 {
          margin: 0 0 6px;
          font-size: 24px;
          font-weight: 800;
          line-height: 1.2;
          color: var(--sv-black);
        }

        .sv-body p {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: #4a4a4a;
          transition: color 0.3s ease;
        }

        .sv-item:hover .sv-body p {
          color: var(--sv-black);
        }

        .sv-arrow {
          justify-self: end;
          color: var(--sv-black);
          opacity: 0.35;
          transition: transform 0.35s var(--sv-ease), opacity 0.3s ease;
        }

        .sv-item:hover .sv-arrow {
          opacity: 1;
          transform: translate(4px, -4px);
        }

        /* ---------- responsive ---------- */
        @media (max-width: 1100px) {
          .sv-grid { gap: 56px; }
          .sv-item { grid-template-columns: 52px 72px minmax(0, 1fr) 28px; gap: 0 18px; }
          .sv-icon { width: 72px; height: 72px; }
          .sv-doodle { width: 48px; height: 48px; }
          .sv-num { font-size: 34px; }
        }

        @media (max-width: 980px) {
          .sv-section { padding: 80px 0 90px; }
          .sv-grid { grid-template-columns: minmax(0, 1fr); gap: 52px; }
          .sv-intro { position: static; }
          .sv-curl { display: none; }
        }

        @media (max-width: 600px) {
          .sv-item { grid-template-columns: 64px minmax(0, 1fr); gap: 14px 16px; padding: 24px 6px; align-items: start; }
          .sv-num { display: none; }
          .sv-arrow { display: none; }
          .sv-icon { width: 64px; height: 64px; }
          .sv-doodle { width: 42px; height: 42px; }
          .sv-body h3 { font-size: 21px; }
          .sv-count b { font-size: 78px; }
        }

        /* respect people who turn animations off */
        @media (prefers-reduced-motion: reduce) {
          .sv-section *,
          .sv-section *::before,
          .sv-section *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}