"use client";

// Home page "About" teaser. A short version of the About page that links to /about.
// Usage (app/page.jsx):  import HomeAbout from "@/components/HomeAbout";  ...  <HomeAbout />
// Uses the chalkboard illustration public/img/home-about.svg (1:1). All classes start with "ha-".
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  BadgeCheck,
  Flag,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

// Four points shown under the story text (short versions of the About page values)
const points = [
  { title: "Transparency", text: "Clear pricing and honest timelines.", icon: ShieldCheck },
  { title: "Quality", text: "Clean, tested, maintainable code.", icon: BadgeCheck },
  { title: "Ownership", text: "We take responsibility for the outcome.", icon: Flag },
  { title: "Growth", text: "Modern tools, so your product stays competitive.", icon: TrendingUp },
];

// How a project moves with us
const steps = ["Plan", "Design", "Build", "Launch", "Support"];

export default function HomeAbout() {
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

    root.classList.add("ha-ready");
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
    <section className="ha-section" ref={rootRef} aria-labelledby="home-about-heading">
      <span className="ha-blob" aria-hidden="true" />

      <div className="ha-inner ha-grid">
        {/* Visual: framed illustration with floating chips */}
        <div className="ha-visual" data-reveal="left">
          <span className="ha-ring" aria-hidden="true" />

          <div className="ha-frame">
            <span className="ha-tape ha-tape-l" aria-hidden="true" />
            <span className="ha-tape ha-tape-r" aria-hidden="true" />
            <Image
              className="ha-img"
              src="/img/home-about.svg"
              alt="Hand-drawn chalkboard showing the steps of a project: plan, design, build, launch and support, with a laptop, a phone and a cloud"
              width={900}
              height={900}
              unoptimized
            />
          </div>

          <span className="ha-chip ha-chip-web" style={{ "--r": "-5deg", "--fd": "0s" }} aria-hidden="true">
            <i><Globe size={16} strokeWidth={2.4} /></i>Web
          </span>
          <span className="ha-chip ha-chip-mobile" style={{ "--r": "4deg", "--fd": "-1.3s" }} aria-hidden="true">
            <i><Smartphone size={16} strokeWidth={2.4} /></i>Mobile
          </span>
          <span className="ha-chip ha-chip-cloud" style={{ "--r": "-3deg", "--fd": "-2.4s" }} aria-hidden="true">
            <i><Cloud size={16} strokeWidth={2.4} /></i>Cloud
          </span>

          <div className="ha-sticker" aria-hidden="true">
            <span>
              One team.
              <br />
              Idea to launch.
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="ha-text">
          <span className="ha-eyebrow" data-reveal>
            About Us
          </span>
          <h2 id="home-about-heading" data-reveal style={{ "--d": "80ms" }}>
            One team for your <span>web, mobile and cloud</span> needs
          </h2>
          <p data-reveal style={{ "--d": "160ms" }}>
            ANDS Cloud Tech Solutions gives businesses reliable, well-built technology
            without the complexity. We take your idea from planning and design through
            development, launch and long-term support.
          </p>

          <ul className="ha-points">
            {points.map((point, i) => {
              const Icon = point.icon;
              return (
                <li key={point.title} data-reveal style={{ "--d": `${220 + i * 80}ms` }}>
                  <div className="ha-point">
                    <span className="ha-point-icon">
                      <Icon size={20} strokeWidth={2.3} aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <ol className="ha-steps" aria-label="How we work">
            {steps.map((step, i) => (
              <li key={step} data-reveal style={{ "--d": `${560 + i * 80}ms` }}>
                <span className="ha-pill">
                  <b>{`0${i + 1}`}</b>
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="ha-actions" data-reveal style={{ "--d": "900ms" }}>
            <Link href="/about" className="ha-btn">
              Read our story
              <ArrowUpRight size={20} strokeWidth={2.4} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="ha-link">
              Talk to our team
            </Link>
          </div>
        </div>
      </div>

      {/* All classes start with "ha-" so nothing leaks into other sections or pages */}
      <style>{`
        .ha-section {
          --ha-orange: var(--brand-orange, #ff6a00);
          --ha-black: var(--brand-black, #111111);
          --ha-cream: #fff4ec;
          --ha-ease: cubic-bezier(0.2, 0.7, 0.2, 1);
          position: relative;
          overflow: hidden;
          padding: 110px 0 120px;
          background-color: #ffffff;
          background-image: radial-gradient(rgba(17, 17, 17, 0.1) 1.4px, transparent 1.6px);
          background-size: 24px 24px;
          color: var(--ha-black);
        }

        .ha-section *,
        .ha-section *::before,
        .ha-section *::after {
          box-sizing: border-box;
        }

        .ha-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .ha-blob {
          position: absolute;
          left: -140px;
          top: 60px;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: var(--ha-orange);
          opacity: 0.12;
        }

        .ha-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
          gap: 90px;
          align-items: center;
        }

        /* ---------- animations ---------- */
        @keyframes ha-float {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--r, 0deg)); }
        }

        @keyframes ha-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes ha-wiggle {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-4deg) scale(1.04); }
        }

        /* scroll reveal (only active after JS runs) */
        .ha-ready [data-reveal] {
          opacity: 0;
          transform: translateY(34px);
          transition:
            opacity 0.8s var(--ha-ease) var(--d, 0ms),
            transform 0.8s var(--ha-ease) var(--d, 0ms);
        }

        .ha-ready [data-reveal="left"] { transform: translateX(-48px); }

        .ha-ready [data-reveal].is-in {
          opacity: 1;
          transform: none;
        }

        /* ---------- visual ---------- */
        .ha-visual {
          position: relative;
          width: 100%;
          max-width: 470px;
          margin: 0 auto;
        }

        .ha-ring {
          position: absolute;
          left: -50px;
          top: -46px;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          border: 3px dashed var(--ha-black);
          opacity: 0.3;
          animation: ha-spin 45s linear infinite;
        }

        .ha-frame {
          position: relative;
          background: #ffffff;
          border: 3px solid var(--ha-black);
          border-radius: 14px;
          padding: 14px;
          box-shadow: 12px 14px 0 var(--ha-black);
          transform: rotate(2deg);
          transition: transform 0.5s var(--ha-ease), box-shadow 0.5s var(--ha-ease);
        }

        .ha-frame:hover {
          transform: rotate(0deg) translateY(-6px);
          box-shadow: 16px 18px 0 var(--ha-orange);
        }

        .ha-img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 6px;
          background: var(--ha-cream);
        }

        .ha-tape {
          position: absolute;
          top: -16px;
          width: 92px;
          height: 28px;
          z-index: 2;
          background: rgba(255, 106, 0, 0.7);
          border: 1px dashed rgba(17, 17, 17, 0.3);
        }

        .ha-tape-l { left: 22px; transform: rotate(-8deg); }
        .ha-tape-r { right: 22px; transform: rotate(7deg); }

        .ha-chip {
          position: absolute;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px 8px 8px;
          background: #ffffff;
          border: 3px solid var(--ha-black);
          border-radius: 999px;
          box-shadow: 4px 5px 0 var(--ha-black);
          font-weight: 800;
          font-size: 15px;
          transform: rotate(var(--r, 0deg));
          animation: ha-float 5s ease-in-out var(--fd, 0s) infinite;
        }

        .ha-chip i {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--ha-orange);
          color: var(--ha-black);
        }

        /* chips sit on the empty edges of the board so they never cover the drawing */
        .ha-chip-web { left: -34px; top: 38%; }
        .ha-chip-mobile { right: -30px; top: 38%; }
        .ha-chip-cloud { left: -26px; top: 62%; }

        .ha-sticker {
          position: absolute;
          right: -32px;
          bottom: -44px;
          z-index: 3;
          width: 112px;
          height: 112px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          text-align: center;
          background: var(--ha-orange);
          color: var(--ha-black);
          border: 3px solid var(--ha-black);
          box-shadow: 5px 6px 0 var(--ha-black);
          font-weight: 800;
          font-size: 14px;
          line-height: 1.15;
          transform: rotate(10deg);
          animation: ha-wiggle 5s ease-in-out infinite;
        }

        /* ---------- text ---------- */
        .ha-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
        }

        .ha-eyebrow {
          display: inline-block;
          color: var(--ha-orange);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .ha-section h2 {
          margin: 0;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 800;
          line-height: 1.15;
          color: var(--ha-black);
        }

        .ha-section h2 span {
          color: var(--ha-orange);
        }

        .ha-text > p {
          margin: 0;
          font-size: 17px;
          line-height: 1.75;
          color: #4a4a4a;
          max-width: 560px;
        }

        .ha-points {
          list-style: none;
          margin: 8px 0 0;
          padding: 0;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .ha-point {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          height: 100%;
          padding: 16px;
          background: #ffffff;
          border: 3px solid var(--ha-black);
          border-radius: 16px;
          transition: transform 0.3s var(--ha-ease), box-shadow 0.3s var(--ha-ease);
        }

        .ha-point:hover {
          transform: translate(-3px, -3px);
          box-shadow: 5px 6px 0 var(--ha-orange);
        }

        .ha-point-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--ha-black);
          color: var(--ha-orange);
        }

        .ha-point h3 {
          margin: 0 0 2px;
          font-size: 17px;
          font-weight: 800;
          color: var(--ha-black);
        }

        .ha-point p {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          color: #555555;
        }

        .ha-steps {
          list-style: none;
          margin: 6px 0 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 12px 0;
        }

        .ha-steps li {
          display: flex;
          align-items: center;
        }

        .ha-steps li:not(:last-child)::after {
          content: "";
          width: 10px;
          margin: 0 6px;
          border-top: 2px dashed var(--ha-black);
        }

        .ha-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          background: #ffffff;
          border: 2px solid var(--ha-black);
          border-radius: 999px;
          font-weight: 700;
          font-size: 14px;
        }

        .ha-pill b {
          color: var(--ha-orange);
          font-weight: 800;
          font-size: 12px;
        }

        .ha-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 18px 28px;
          margin-top: 10px;
        }

        .ha-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          border-radius: 999px;
          background: var(--ha-black);
          color: #ffffff;
          font-weight: 800;
          font-size: 16px;
          text-decoration: none;
          box-shadow: 0 0 0 0 var(--ha-orange);
          transition: transform 0.3s var(--ha-ease), box-shadow 0.3s var(--ha-ease);
        }

        .ha-btn svg {
          transition: transform 0.3s var(--ha-ease);
        }

        .ha-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--ha-orange);
        }

        .ha-btn:hover svg {
          transform: translate(3px, -3px);
        }

        .ha-link {
          color: var(--ha-black);
          font-weight: 700;
          font-size: 16px;
          text-decoration: underline;
          text-decoration-color: var(--ha-orange);
          text-decoration-thickness: 3px;
          text-underline-offset: 5px;
          transition: background-color 0.25s ease;
        }

        .ha-link:hover {
          background-color: rgba(255, 106, 0, 0.22);
        }

        .ha-btn:focus-visible,
        .ha-link:focus-visible {
          outline: 3px solid var(--ha-black);
          outline-offset: 3px;
        }

        /* ---------- responsive ---------- */
        /* when the steps may wrap, drop the dashed connectors so none is left hanging at a line end */
        @media (max-width: 1180px) {
          .ha-steps { gap: 10px; }
          .ha-steps li:not(:last-child)::after { display: none; }
        }

        @media (max-width: 980px) {
          .ha-grid { gap: 64px; }
        }

        @media (max-width: 860px) {
          .ha-section { padding: 80px 0 90px; }
          .ha-grid { grid-template-columns: minmax(0, 1fr); gap: 70px; }
          .ha-visual { max-width: 420px; }
        }

        @media (max-width: 560px) {
          .ha-points { grid-template-columns: minmax(0, 1fr); }
          .ha-frame { box-shadow: 8px 10px 0 var(--ha-black); }
          .ha-chip { font-size: 13px; padding: 6px 12px 6px 6px; }
          .ha-chip i { width: 24px; height: 24px; }
          .ha-chip-web { left: -12px; }
          .ha-chip-mobile { right: -10px; }
          .ha-chip-cloud { left: -8px; }
          .ha-sticker { right: -8px; bottom: -40px; width: 96px; height: 96px; font-size: 12px; }
        }

        /* respect people who turn animations off */
        @media (prefers-reduced-motion: reduce) {
          .ha-section *,
          .ha-section *::before,
          .ha-section *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}