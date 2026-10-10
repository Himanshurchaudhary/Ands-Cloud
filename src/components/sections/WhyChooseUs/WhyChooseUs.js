"use client";

// Why Choose Us: a torn-paper stats band, then a zigzag timeline of four reasons
// around a dotted spine. All copy is unchanged. Stats are placeholders; replace them later.

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "45+", label: "Happy Clients" },
  { value: "2+", label: "Years of Experience" },
  { value: "24/7", label: "Support Available", ring: true },
];

// Reasons, kept in an array so they are easy to edit
const reasons = [
  {
    icon: "shield",
    title: "Reliable Code",
    description: "Clean, tested and well-documented code that is easy to maintain and scale.",
  },
  {
    icon: "clock",
    title: "On-Time Delivery",
    description: "Clear timelines and regular updates so you always know where your project stands.",
  },
  {
    icon: "rocket",
    title: "Built to Grow",
    description: "Architecture planned for your future traffic, features and users, not just today.",
  },
  {
    icon: "handshake",
    title: "Long-Term Partnership",
    description: "We stay with you after launch with support, updates and improvements.",
  },
];

// Hand-drawn doodle icons: wobbly ink outline with orange hatching
function Doodle({ name }) {
  const common = {
    viewBox: "0 0 48 48",
    width: 40,
    height: 40,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };

  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M24 5 C31 8.5 37 9.5 42.5 8.5 C43 24 41 36 24 43.5 C7 36 5 24 5.5 8.5 C11 9.5 17 8.5 24 5 Z" />
          <path className="wc-hatch" d="M13 21 L18 33 M20 16 L25.5 31 M27 14.5 L32 27" strokeWidth={1.8} />
          <path d="M16 24 L22 30 L33 17" strokeWidth={2.6} />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <path d="M24 6 C35 5 42.5 13.5 42 24 C41.5 35 33.5 42.5 23 42 C12 41.5 5.5 33.5 6 23 C6.5 12 14 6.5 25 6.5" />
          <path d="M24 14 L23.5 25 L31 29" />
          <path className="wc-hatch" d="M9 31 C12 37 17 40.5 22 40.5" strokeWidth={1.8} />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M37 9 C30 10 21 17 19 26 L25 32 C34 30 40 21 37 9 Z" />
          <circle cx="31" cy="19" r="3.2" />
          <path d="M19.5 26.5 L12 30.5 L17 35 L24.5 31.5" />
          <path d="M17 35 C15.5 39 13.5 41.5 8.5 42.5 C11 40 12.5 38 13 34.5" />
          <path className="wc-hatch" d="M22 28 L27 23 M28 33 L33 28" strokeWidth={1.8} />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M3 21 L11 16 L18 19" />
          <path d="M45 21 L37 16 L30 19" />
          <path d="M16 22 C18.5 19.5 21.5 19.5 24 22 C26.5 19.5 29.5 19.5 32 22 L31 29 C29 33 25.5 34 24 33 C22.5 34 19 33 17 29 Z" />
          <path d="M24 22 L24 30" />
          <path className="wc-hatch" d="M20 28 L23 31 M27 27 L30 30" strokeWidth={1.8} />
        </svg>
      );
    default:
      return null;
  }
}

export default function WhyChooseUs() {
  return (
    <section className="wc">
      {/* Torn-paper stats band */}
      <div className="wc-stats">
        <div className="wc-inner wc-stats-grid">
          {stats.map((stat) => (
            <div className="wc-stat" key={stat.label}>
              {stat.ring ? (
                <span className="wc-value-ring">
                  <span className="wc-value">{stat.value}</span>
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M6 22 C4 8 30 3 55 4 C82 5 97 12 96 22 C95 33 70 37 46 36 C22 35 5 31 8 19 C10 12 30 7 52 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
              ) : (
                <span className="wc-value">{stat.value}</span>
              )}
              <span className="wc-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reasons: zigzag timeline around a dotted spine */}
      <div className="wc-inner wc-body">
        <div className="wc-header">
          <span className="wc-eyebrow">Why Choose Us</span>
          <h2>
            A team you can{" "}
            <span>
              <em className="wc-ring">
                trust
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M6 22 C4 8 30 3 55 4 C82 5 97 12 96 22 C95 33 70 37 46 36 C22 35 5 31 8 19 C10 12 30 7 52 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </em>{" "}
              with your business
            </span>
          </h2>
          <svg className="wc-underline" viewBox="0 0 260 14" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M2 9 C40 3 90 12 140 6 S220 4 258 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="wc-grid">
          {reasons.map((reason, i) => {
            const flip = i % 2 === 1;
            const number = String(i + 1).padStart(2, "0");

            const text = (
              <div className="wc-text">
                <h3>{reason.title}</h3>
                <span className="wc-bar" aria-hidden="true" />
                <p>{reason.description}</p>
              </div>
            );

            const num = (
              <span className="wc-num" aria-hidden="true">
                {number}
              </span>
            );

            return (
              <div className="wc-row" key={reason.title}>
                <div className="wc-left">{flip ? num : text}</div>
                <div className="wc-badge">
                  <Doodle name={reason.icon} />
                </div>
                <div className="wc-right">{flip ? text : num}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Component-scoped CSS (styled-jsx). Every class is prefixed with wc- so it cannot clash with other sections */}
      <style>{`
        .wc {
          background: #ffffff;
          padding-bottom: 100px;
        }

        .wc-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Dark band with torn top and bottom edges */
        .wc-stats {
          background: var(--brand-black);
          padding: 56px 0 48px;
          margin-bottom: 96px;
          clip-path: polygon(
            0 4px, 4% 0, 9% 6px, 14% 1px, 21% 7px, 27% 0, 33% 5px, 40% 1px, 47% 6px, 53% 0,
            60% 4px, 66% 1px, 73% 7px, 79% 0, 86% 5px, 92% 1px, 96% 6px, 100% 2px,
            100% calc(100% - 4px), 96% calc(100% - 0px), 91% calc(100% - 6px), 85% calc(100% - 1px),
            78% calc(100% - 7px), 71% calc(100% - 0px), 64% calc(100% - 5px), 57% calc(100% - 1px),
            49% calc(100% - 6px), 42% calc(100% - 0px), 35% calc(100% - 5px), 28% calc(100% - 1px),
            20% calc(100% - 7px), 13% calc(100% - 0px), 7% calc(100% - 5px), 0 calc(100% - 2px)
          );
        }

        .wc-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          row-gap: 40px;
          text-align: center;
        }

        .wc-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          border-right: 1px dashed rgba(255, 255, 255, 0.25);
        }

        .wc-stat:nth-child(2n) {
          border-right: none;
        }

        .wc-value {
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 800;
          color: var(--brand-orange);
          line-height: 1;
        }

        /* Hand-drawn ring around the 24/7 value */
        .wc-value-ring {
          position: relative;
          display: inline-block;
          padding: 0 0.18em;
        }

        .wc-value-ring svg {
          position: absolute;
          inset: -0.25em -0.1em;
          width: calc(100% + 0.2em);
          height: calc(100% + 0.5em);
          color: #ffffff;
          overflow: visible;
        }

        .wc-label {
          color: #cccccc;
          font-size: 13px;
        }

        /* Heading block */
        .wc-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .wc-eyebrow {
          color: var(--brand-orange);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .wc h2 {
          font-size: clamp(22px, 4vw, 36px);
          font-weight: 800;
          line-height: 1.25;
          color: var(--brand-black);
        }

        .wc h2 span {
          color: var(--brand-orange);
        }

        /* Hand-drawn ring around the word "trust" */
        .wc-ring {
          position: relative;
          display: inline-block;
          font-style: normal;
          padding: 0 0.14em;
          color: var(--brand-orange);
        }

        .wc-ring svg {
          position: absolute;
          inset: -0.3em -0.2em;
          width: calc(100% + 0.4em);
          height: calc(100% + 0.6em);
          color: var(--brand-black);
          overflow: visible;
        }

        .wc-underline {
          width: 220px;
          max-width: 70%;
          height: 12px;
          color: var(--brand-orange);
          display: block;
          margin-top: -2px;
        }

        /* Dotted paper background for the timeline */
        .wc-body {
          background-image: radial-gradient(#e6e6e6 1px, transparent 1.2px);
          background-size: 18px 18px;
        }

        /* Zigzag timeline: [left] [badge] [right], spine runs through the badges */
        .wc-grid {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .wc-grid::before {
          content: "";
          position: absolute;
          top: 40px;
          bottom: 40px;
          left: 50%;
          border-left: 2px dotted #888888;
          transform: translateX(-1px);
        }

        .wc-row {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 84px 1fr;
          align-items: center;
          column-gap: 12px;
        }

        .wc-left {
          text-align: right;
          display: flex;
          justify-content: flex-end;
        }

        .wc-right {
          text-align: left;
          display: flex;
          justify-content: flex-start;
        }

        /* Round, hand-drawn badge */
        .wc-badge {
          position: relative;
          z-index: 1;
          width: 84px;
          height: 84px;
          display: grid;
          place-items: center;
          background: #ffffff;
          color: var(--brand-black);
          border: 2.5px solid var(--brand-black);
          border-radius: 48% 52% 50% 50% / 50% 48% 52% 50%;
          transition: transform 0.35s ease;
        }

        .wc-badge svg {
          display: block;
        }

        .wc-hatch {
          stroke: var(--brand-orange);
        }

        .wc-row:hover .wc-badge {
          transform: rotate(-6deg) scale(1.05);
        }

        .wc-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          max-width: 240px;
        }

        .wc-left .wc-text {
          align-items: flex-end;
          text-align: right;
        }

        .wc h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--brand-black);
          line-height: 1.3;
        }

        /* Short orange hand-drawn bar under each title */
        .wc-bar {
          display: block;
          width: 56px;
          height: 4px;
          border-radius: 4px 6px 3px 5px;
          background: var(--brand-orange);
          transform: rotate(-1.5deg);
        }

        .wc p {
          font-size: 14px;
          color: #666666;
          line-height: 1.6;
          margin: 0;
        }

        /* Big outlined step number */
        .wc-num {
          font-size: clamp(44px, 6vw, 72px);
          font-weight: 900;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 2px var(--brand-black);
          letter-spacing: -1px;
        }

        @media (min-width: 720px) {
          .wc-stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .wc-stat {
            border-right: 1px dashed rgba(255, 255, 255, 0.25);
          }

          .wc-stat:nth-child(2n) {
            border-right: 1px dashed rgba(255, 255, 255, 0.25);
          }

          .wc-stat:nth-child(4n) {
            border-right: none;
          }

          .wc-label {
            font-size: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wc-badge {
            transition: none;
          }

          .wc-row:hover .wc-badge {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}