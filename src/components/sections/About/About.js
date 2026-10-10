"use client";

// About section (redesign): hand-made look, scroll reveals, counters, two illustrations.
// Images live in public/img: about-workspace.svg (4:5) and about-vision.svg (3:2)
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  ShieldCheck,
  BadgeCheck,
  Flag,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

// Values are kept in an array so they are easy to edit
const values = [
  {
    title: "Transparency",
    description: "Clear pricing, honest timelines and open communication at every stage.",
    icon: ShieldCheck,
  },
  {
    title: "Quality",
    description: "Clean, tested and maintainable code that stands up to real-world use.",
    icon: BadgeCheck,
  },
  {
    title: "Ownership",
    description: "We treat your project as our own and take responsibility for the outcome.",
    icon: Flag,
  },
  {
    title: "Growth",
    description: "We keep learning new tools so your product stays modern and competitive.",
    icon: TrendingUp,
  },
];

// The path a project takes with us
const steps = ["Plan", "Design", "Build", "Launch", "Support"];

// Scrolling ticker under the header
const ticker = [
  "Web Applications",
  "Mobile Apps",
  "Cloud Hosting",
  "Custom Software",
  "Clinic Management Systems",
  "Long-term Support",
];

// EDIT: replace with your real numbers (projects delivered, clients, years...) when you have them
const stats = [
  { value: 3, suffix: "", label: "Core service areas: web, mobile and cloud" },
  { value: 5, suffix: "", label: "Stages from first idea to long-term support" },
  { value: 100, suffix: "%", label: "Ownership: your project is treated as our own" },
];

// Counts up from 0 when it scrolls into view
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return undefined;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

// Small hand-drawn four-point sparkle used as decoration
function Sparkle({ className }) {
  return (
    <svg className={className} viewBox="-26 -26 52 52" aria-hidden="true">
      <path
        d="M0 -22 Q4 -4 22 0 Q4 4 0 22 Q-4 4 -22 0 Q-4 -4 0 -22 Z"
        fill="currentColor"
        stroke="#111"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function About() {
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

    root.classList.add("ab-ready");
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
    <div className="ab-root" ref={rootRef}>
      {/* Page header */}
      <section className="ab-header">
        <span className="ab-blob" aria-hidden="true" />
        <span className="ab-ring" aria-hidden="true" />
        <Sparkle className="ab-doodle ab-doodle-a" />
        <Sparkle className="ab-doodle ab-doodle-b" />
        <svg className="ab-doodle ab-doodle-c" viewBox="0 0 80 20" aria-hidden="true">
          <path
            d="M2 10 q9 -14 18 0 t18 0 t18 0 t18 0"
            fill="none"
            stroke="#111"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div className="ab-inner ab-header-inner">
          <span className="ab-eyebrow ab-rise" style={{ "--d": "0ms" }}>
            About Us
          </span>
          <h1 className="ab-rise" style={{ "--d": "100ms" }}>
            We build digital products that{" "}
            <span className="ab-mark">
              help businesses grow
              <svg className="ab-underline" viewBox="0 0 400 24" aria-hidden="true">
                <path d="M4 16 C70 4 150 22 220 10 S340 6 396 14" pathLength="1" />
              </svg>
            </span>
          </h1>
          <p className="ab-lead ab-rise" style={{ "--d": "220ms" }}>
            ANDS Cloud Tech Solutions is a software company focused on web, mobile,
            cloud and custom business software.
          </p>
        </div>
      </section>

      {/* Scrolling ticker */}
      <div className="ab-marquee-wrap" aria-hidden="true">
        <div className="ab-marquee">
          <div className="ab-track">
            {[0, 1].map((copy) => (
              <div className="ab-group" key={copy}>
                {ticker.map((item) => (
                  <span className="ab-tick" key={`${copy}-${item}`}>
                    {item}
                    <Sparkle className="ab-tick-star" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company story */}
      <section className="ab-story">
        <div className="ab-inner ab-story-grid">
          <div className="ab-photo-wrap" data-reveal="left">
            <div className="ab-photo">
              <span className="ab-tape ab-tape-l" aria-hidden="true" />
              <span className="ab-tape ab-tape-r" aria-hidden="true" />
              <Image
                className="ab-photo-img"
                src="/img/about-workspace.svg"
                alt="Illustration of a developer desk with a laptop, coffee, a plant and sticky notes"
                width={800}
                height={1000}
                unoptimized
              />
            </div>
            <div className="ab-sticker" aria-hidden="true">
              <span>
                Real people.
                <br />
                Real code.
              </span>
            </div>
          </div>

          <div className="ab-story-text">
            <span className="ab-eyebrow" data-reveal>
              Our Story
            </span>
            <h2 data-reveal style={{ "--d": "80ms" }}>
              From a small idea to a <span>full-service tech partner</span>
            </h2>
            <p data-reveal style={{ "--d": "160ms" }}>
              We started with a simple goal: give businesses access to reliable,
              well-built technology without the complexity. Over time, we have worked
              on web platforms, mobile apps, clinic management systems and cloud
              deployments for clients across different industries.
            </p>
            <p data-reveal style={{ "--d": "240ms" }}>
              Today we work as a single team that can take your idea from planning and
              design through development, launch and long-term support.
            </p>

            <ol className="ab-steps">
              {steps.map((step, i) => (
                <li key={step} data-reveal style={{ "--d": `${320 + i * 90}ms` }}>
                  <span className="ab-pill">
                    <b>{`0${i + 1}`}</b>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="ab-mission">
        <div className="ab-inner ab-mission-grid">
          <div className="ab-mv-cards">
            <div data-reveal="left">
              <article className="ab-mv-card">
                <span className="ab-icon">
                  <Target size={24} strokeWidth={2.2} />
                </span>
                <h3>Our Mission</h3>
                <p>
                  To deliver practical, dependable software that solves real business
                  problems and makes everyday work easier.
                </p>
              </article>
            </div>
            <div data-reveal="left" style={{ "--d": "140ms" }}>
              <article className="ab-mv-card ab-mv-card-alt">
                <span className="ab-icon">
                  <Eye size={24} strokeWidth={2.2} />
                </span>
                <h3>Our Vision</h3>
                <p>
                  To become a trusted technology partner for businesses that want to grow
                  confidently in the digital world.
                </p>
              </article>
            </div>
          </div>

          <div data-reveal="right">
            <div className="ab-vision">
              <Image
                className="ab-vision-img"
                src="/img/about-vision.svg"
                alt="Illustration of a mountain trail leading to a flag at the summit"
                width={1200}
                height={800}
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="ab-values">
        <div className="ab-inner">
          <div className="ab-values-head" data-reveal>
            <span className="ab-eyebrow">Our Values</span>
            <h2>
              What guides <span>our work</span>
            </h2>
          </div>

          <div className="ab-values-grid">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div className="ab-value" key={value.title} data-reveal style={{ "--d": `${i * 100}ms` }}>
                  <article className="ab-value-card">
                    <span className="ab-value-num" aria-hidden="true">{`0${i + 1}`}</span>
                    <span className="ab-value-icon">
                      <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="ab-stats">
        <div className="ab-inner ab-stats-grid">
          {stats.map((stat, i) => (
            <div className="ab-stat" key={stat.label} data-reveal style={{ "--d": `${i * 120}ms` }}>
              <strong>
                <Counter to={stat.value} suffix={stat.suffix} />
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="ab-cta-wrap">
        <div className="ab-inner">
          <div className="ab-cta" data-reveal="zoom">
            <div className="ab-cta-text">
              <h2>Have an idea? Let&apos;s build it properly.</h2>
              <p>
                Tell us what you need and we will help you plan it, build it and keep it
                running.
              </p>
            </div>
            <Link href="/contact" className="ab-btn">
              Start a project
              <ArrowUpRight size={20} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* All classes start with "ab-" so nothing leaks into other pages */}
      <style>{`
        .ab-root {
          --ab-orange: var(--brand-orange, #ff6a00);
          --ab-black: var(--brand-black, #111111);
          --ab-cream: #fff4ec;
          --ab-ease: cubic-bezier(0.2, 0.7, 0.2, 1);
          overflow-x: hidden;
          color: var(--ab-black);
        }

        .ab-root *,
        .ab-root *::before,
        .ab-root *::after {
          box-sizing: border-box;
        }

        .ab-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .ab-eyebrow {
          display: inline-block;
          color: var(--ab-orange);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .ab-root h1 {
          font-size: clamp(34px, 5.4vw, 58px);
          font-weight: 800;
          line-height: 1.15;
          color: var(--ab-black);
          margin: 0;
        }

        .ab-root h2 {
          font-size: clamp(28px, 3.8vw, 42px);
          font-weight: 800;
          line-height: 1.2;
          color: var(--ab-black);
          margin: 0;
        }

        .ab-root h3 {
          font-size: 21px;
          font-weight: 800;
          color: var(--ab-black);
          margin: 0;
        }

        .ab-root p {
          margin: 0;
        }

        .ab-root h2 span {
          color: var(--ab-orange);
        }

        /* ---------- load animations (header, no JS needed) ---------- */
        .ab-rise {
          animation: ab-rise 0.9s var(--ab-ease) var(--d, 0ms) backwards;
        }

        @keyframes ab-rise {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: none; }
        }

        @keyframes ab-draw {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes ab-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(0.6) rotate(25deg); }
        }

        @keyframes ab-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes ab-marquee {
          to { transform: translateX(-50%); }
        }

        @keyframes ab-wiggle {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-4deg) scale(1.04); }
        }

        /* ---------- scroll reveal (only active after JS runs) ---------- */
        .ab-ready [data-reveal] {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.8s var(--ab-ease) var(--d, 0ms),
            transform 0.8s var(--ab-ease) var(--d, 0ms);
        }

        .ab-ready [data-reveal="left"] { transform: translateX(-48px); }
        .ab-ready [data-reveal="right"] { transform: translateX(48px); }
        .ab-ready [data-reveal="zoom"] { transform: scale(0.94); }

        .ab-ready [data-reveal].is-in {
          opacity: 1;
          transform: none;
        }

        /* ---------- header ---------- */
        .ab-header {
          position: relative;
          overflow: hidden;
          padding: 130px 0 80px;
          text-align: center;
          background-color: var(--ab-cream);
          background-image: radial-gradient(rgba(17, 17, 17, 0.14) 1.4px, transparent 1.6px);
          background-size: 24px 24px;
        }

        .ab-blob {
          position: absolute;
          right: -120px;
          top: -110px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: var(--ab-orange);
          opacity: 0.16;
        }

        .ab-ring {
          position: absolute;
          left: -90px;
          bottom: -90px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          border: 3px dashed var(--ab-black);
          opacity: 0.25;
          animation: ab-spin 50s linear infinite;
        }

        .ab-doodle {
          position: absolute;
          pointer-events: none;
        }

        .ab-doodle-a {
          left: 9%;
          top: 38%;
          width: 44px;
          color: var(--ab-orange);
          animation: ab-twinkle 3.4s ease-in-out infinite;
        }

        .ab-doodle-b {
          right: 11%;
          bottom: 18%;
          width: 34px;
          color: var(--ab-black);
          animation: ab-twinkle 3.4s ease-in-out 1.4s infinite;
        }

        .ab-doodle-c {
          right: 16%;
          top: 26%;
          width: 80px;
        }

        .ab-header-inner {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          max-width: 860px;
        }

        .ab-lead {
          font-size: 19px;
          line-height: 1.6;
          color: #4a4a4a;
          max-width: 640px;
        }

        /* hand-drawn underline that draws itself */
        .ab-mark {
          position: relative;
          display: inline-block;
          max-width: 100%;
          color: var(--ab-orange);
        }

        .ab-underline {
          position: absolute;
          left: 0;
          bottom: -0.2em;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .ab-underline path {
          fill: none;
          stroke: var(--ab-orange);
          stroke-width: 6;
          stroke-linecap: round;
          stroke-dasharray: 1;
          animation: ab-draw 1.1s ease 0.9s backwards;
        }

        /* ---------- ticker ---------- */
        .ab-marquee-wrap {
          overflow: hidden;
          padding: 34px 0;
          background: #ffffff;
        }

        .ab-marquee {
          background: var(--ab-black);
          color: #ffffff;
          transform: rotate(-1.2deg);
          margin: 0 -30px;
          padding: 18px 0;
          border-top: 3px solid var(--ab-orange);
          border-bottom: 3px solid var(--ab-orange);
        }

        .ab-track {
          display: flex;
          width: max-content;
          animation: ab-marquee 32s linear infinite;
        }

        .ab-marquee:hover .ab-track {
          animation-play-state: paused;
        }

        .ab-group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .ab-tick {
          display: inline-flex;
          align-items: center;
          gap: 36px;
          padding-right: 36px;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .ab-tick-star {
          width: 22px;
          color: var(--ab-orange);
        }

        /* ---------- story ---------- */
        .ab-story {
          padding: 90px 0 100px;
          background: #ffffff;
        }

        .ab-story-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
          gap: 80px;
          align-items: center;
        }

        .ab-photo-wrap {
          position: relative;
          max-width: 480px;
          width: 100%;
          margin: 0 auto;
        }

        .ab-photo {
          position: relative;
          background: #ffffff;
          border: 3px solid var(--ab-black);
          border-radius: 14px;
          padding: 14px;
          box-shadow: 12px 14px 0 var(--ab-black);
          transform: rotate(-2deg);
          transition: transform 0.5s var(--ab-ease), box-shadow 0.5s var(--ab-ease);
        }

        .ab-photo:hover {
          transform: rotate(0deg) translateY(-6px);
          box-shadow: 16px 18px 0 var(--ab-orange);
        }

        .ab-photo-img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 6px;
          background: var(--ab-cream);
        }

        .ab-tape {
          position: absolute;
          top: -16px;
          width: 96px;
          height: 28px;
          z-index: 2;
          background: rgba(255, 106, 0, 0.7);
          border: 1px dashed rgba(17, 17, 17, 0.3);
        }

        .ab-tape-l { left: 24px; transform: rotate(-8deg); }
        .ab-tape-r { right: 24px; transform: rotate(7deg); }

        .ab-sticker {
          position: absolute;
          right: -22px;
          bottom: -30px;
          z-index: 3;
          width: 132px;
          height: 132px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          text-align: center;
          background: var(--ab-orange);
          color: var(--ab-black);
          border: 3px solid var(--ab-black);
          box-shadow: 5px 6px 0 var(--ab-black);
          font-weight: 800;
          font-size: 16px;
          line-height: 1.15;
          transform: rotate(10deg);
          animation: ab-wiggle 5s ease-in-out infinite;
        }

        .ab-story-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
        }

        .ab-story-text p {
          font-size: 17px;
          line-height: 1.75;
          color: #4a4a4a;
        }

        .ab-steps {
          list-style: none;
          margin: 14px 0 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 12px 0;
        }

        .ab-steps li {
          display: flex;
          align-items: center;
        }

        .ab-steps li:not(:last-child)::after {
          content: "";
          width: 22px;
          margin: 0 8px;
          border-top: 2px dashed var(--ab-black);
        }

        .ab-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 2px solid var(--ab-black);
          border-radius: 999px;
          background: #ffffff;
          font-weight: 700;
          font-size: 15px;
        }

        .ab-pill b {
          color: var(--ab-orange);
          font-weight: 800;
          font-size: 13px;
        }

        /* ---------- mission and vision ---------- */
        .ab-mission {
          padding: 20px 0 110px;
          background: #ffffff;
        }

        .ab-mission-grid {
          display: grid;
          grid-template-columns: minmax(0, 4fr) minmax(0, 6fr);
          gap: 48px;
          align-items: center;
        }

        .ab-mv-cards {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .ab-mv-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 28px;
          background: #ffffff;
          border: 3px solid var(--ab-black);
          border-radius: 18px;
          box-shadow: 7px 8px 0 var(--ab-orange);
          transition: transform 0.3s var(--ab-ease), box-shadow 0.3s var(--ab-ease);
        }

        .ab-mv-card-alt {
          box-shadow: 7px 8px 0 var(--ab-black);
        }

        .ab-mv-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 11px 12px 0 var(--ab-orange);
        }

        .ab-mv-card-alt:hover {
          box-shadow: 11px 12px 0 var(--ab-black);
        }

        .ab-mv-card p {
          font-size: 16px;
          line-height: 1.65;
          color: #4a4a4a;
        }

        .ab-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
          border-radius: 14px;
          border: 2px solid var(--ab-black);
          background: var(--ab-orange);
          color: var(--ab-black);
          transition: transform 0.4s var(--ab-ease);
        }

        .ab-mv-card:hover .ab-icon {
          transform: rotate(-8deg) scale(1.08);
        }

        .ab-vision {
          overflow: hidden;
          border: 3px solid var(--ab-black);
          border-radius: 22px;
          background: var(--ab-cream);
          box-shadow: 12px 14px 0 var(--ab-black);
        }

        .ab-vision-img {
          display: block;
          width: 100%;
          height: auto;
        }

        /* ---------- values ---------- */
        .ab-values {
          padding: 100px 0 110px;
          background-color: var(--ab-cream);
          background-image: radial-gradient(rgba(17, 17, 17, 0.12) 1.4px, transparent 1.6px);
          background-size: 24px 24px;
        }

        .ab-values-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          max-width: 700px;
          margin: 0 auto 60px;
          text-align: center;
        }

        .ab-values-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
          align-items: start;
        }

        .ab-value:nth-child(even) {
          margin-top: 40px;
        }

        .ab-value-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 30px 24px 28px;
          background: #ffffff;
          border: 3px solid var(--ab-black);
          border-radius: 18px;
          transition: transform 0.35s var(--ab-ease), box-shadow 0.35s var(--ab-ease);
        }

        .ab-value-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--ab-orange);
          transform: translateY(101%);
          transition: transform 0.45s var(--ab-ease);
        }

        .ab-value-card:hover {
          transform: translateY(-6px);
          box-shadow: 6px 8px 0 var(--ab-black);
        }

        .ab-value-card:hover::before {
          transform: translateY(0);
        }

        .ab-value-card > * {
          position: relative;
        }

        .ab-value-card p {
          font-size: 15px;
          line-height: 1.65;
          color: #555555;
          transition: color 0.3s ease;
        }

        .ab-value-card:hover p {
          color: var(--ab-black);
        }

        .ab-value-num {
          position: absolute;
          top: 12px;
          right: 18px;
          font-size: 54px;
          font-weight: 800;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 2px var(--ab-black);
        }

        .ab-value-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--ab-black);
          color: var(--ab-orange);
        }

        /* ---------- stats ---------- */
        .ab-stats {
          padding: 80px 0;
          background-color: var(--ab-black);
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1.4px, transparent 1.6px);
          background-size: 24px 24px;
          color: #ffffff;
        }

        .ab-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .ab-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          text-align: center;
        }

        .ab-stat + .ab-stat {
          border-left: 2px dashed rgba(255, 255, 255, 0.3);
        }

        .ab-stat strong {
          font-size: clamp(48px, 7vw, 76px);
          font-weight: 800;
          line-height: 1;
          color: var(--ab-orange);
        }

        .ab-stat span {
          max-width: 240px;
          font-size: 15px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
        }

        /* ---------- call to action ---------- */
        .ab-cta-wrap {
          padding: 100px 0;
          background: #ffffff;
        }

        .ab-cta {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 56px 48px;
          background-color: var(--ab-orange);
          background-image: radial-gradient(rgba(17, 17, 17, 0.16) 1.4px, transparent 1.6px);
          background-size: 22px 22px;
          border: 3px solid var(--ab-black);
          border-radius: 28px;
          box-shadow: 12px 14px 0 var(--ab-black);
        }

        .ab-cta-text {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 620px;
        }

        .ab-cta-text h2 {
          color: var(--ab-black);
        }

        .ab-cta-text p {
          font-size: 17px;
          line-height: 1.6;
          color: var(--ab-black);
        }

        .ab-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 30px;
          border-radius: 999px;
          background: var(--ab-black);
          color: #ffffff;
          font-weight: 800;
          font-size: 17px;
          text-decoration: none;
          box-shadow: 0 0 0 0 #ffffff;
          transition: transform 0.3s var(--ab-ease), box-shadow 0.3s var(--ab-ease);
        }

        .ab-btn svg {
          transition: transform 0.3s var(--ab-ease);
        }

        .ab-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #ffffff;
        }

        .ab-btn:hover svg {
          transform: translate(3px, -3px);
        }

        .ab-btn:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: 3px;
        }

        /* ---------- responsive ---------- */
        @media (max-width: 1000px) {
          .ab-values-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .ab-value:nth-child(even) { margin-top: 0; }
          .ab-story-grid { gap: 56px; }
        }

        @media (max-width: 860px) {
          .ab-header { padding: 110px 0 64px; }
          .ab-story-grid,
          .ab-mission-grid { grid-template-columns: minmax(0, 1fr); }
          .ab-story-grid { gap: 64px; }
          .ab-story { padding: 70px 0 80px; }
          .ab-mission { padding-bottom: 80px; }
          .ab-stats-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; }
          .ab-stat + .ab-stat {
            border-left: 0;
            border-top: 2px dashed rgba(255, 255, 255, 0.3);
            padding-top: 28px;
          }
          .ab-cta { flex-direction: column; align-items: flex-start; padding: 40px 28px; }
          .ab-doodle-c { display: none; }
        }

        @media (max-width: 560px) {
          .ab-values-grid { grid-template-columns: minmax(0, 1fr); }
          .ab-sticker { right: -8px; width: 108px; height: 108px; font-size: 14px; }
          .ab-photo { box-shadow: 8px 10px 0 var(--ab-black); }
          .ab-vision { box-shadow: 8px 10px 0 var(--ab-black); }
          .ab-tick { font-size: 18px; gap: 26px; padding-right: 26px; }
          .ab-cta { box-shadow: 8px 10px 0 var(--ab-black); }
          .ab-cta-wrap { padding: 70px 0; }
        }

        /* respect people who turn animations off */
        @media (prefers-reduced-motion: reduce) {
          .ab-root *,
          .ab-root *::before,
          .ab-root *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}