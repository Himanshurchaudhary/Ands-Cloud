"use client";

// Site footer: CTA band, brand info, links, contact details, legal links.
// Black background, same visual language as the navbar.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Same logo file as the navbar
const LOGO_SRC = "/img/Glossy%20Orange%20Cloud%20A%20Emblem.webp";

const year = new Date().getFullYear();

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Web Development",
  "Mobile Apps",
  "Cloud Hosting",
  "Custom Software",
];

// Scrolling strip between the CTA and the columns (two copies for a seamless loop)
const marquee = [...services, ...services];

// Label that rolls up and is replaced by a copy on hover
function Roll({ children }) {
  return (
    <span className="ft-roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

function Icon({ children }) {
  return (
    <svg
      className="ft-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Footer() {
  const footerRef = useRef(null);

  // Reveal blocks as they scroll into view
  useEffect(() => {
    const root = footerRef.current;
    if (!root) return;
    root.classList.add("ft-ready");

    const items = root.querySelectorAll(".ft-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ft-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Orange glow follows the cursor across the footer
  const follow = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--fx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };

  return (
    <footer className="ft-footer" ref={footerRef} onMouseMove={follow}>
      <div className="ft-grid-bg" aria-hidden="true" />
      <div className="ft-glow" aria-hidden="true" />
      <div className="ft-cursor" aria-hidden="true" />
      <div className="ft-topline" aria-hidden="true" />

      {/* CTA band */}
      <div className="ft-cta-wrap">
        <div className="ft-cta ft-reveal">
          <h2 className="ft-cta-title">
            Have a project in mind?
            <br />
            Let&apos;s <span>build it together.</span>
          </h2>
          <Link href="/contact" className="ft-btn">
            <Roll>Start a project</Roll>
            <svg className="ft-arrow" viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Services marquee */}
      <div className="ft-marquee" aria-hidden="true">
        <div className="ft-marquee-track">
          {[0, 1].map((n) => (
            <ul key={n} className="ft-marquee-list">
              {marquee.map((item, i) => (
                <li key={`${item}-${i}`}>
                  <span>{item}</span>
                  <svg className="ft-star" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Main columns */}
      <div className="ft-inner">
        <div className="ft-col ft-brand-col ft-reveal" style={{ "--d": "0ms" }}>
          <Link href="/" className="ft-logo" aria-label="ANDS Cloud, home">
            <Image src={LOGO_SRC} alt="" width={96} height={96} className="ft-logo-img" />
            <span className="ft-logo-text">
              ANDS<span>Cloud</span>
            </span>
          </Link>
          <p className="ft-about">
            ANDS Cloud Tech Solutions is a Patna-based software company. We design and build business websites, Android and iOS mobile apps, cloud hosting setups and custom software for startups, clinics and growing businesses across India. From planning and development to launch and ongoing support, our team stays with you at every step.
          </p>
        </div>

        <div className="ft-col ft-reveal" style={{ "--d": "90ms" }}>
          <h4 className="ft-title">Quick Links</h4>
          {quickLinks.map((l) => (
            <Link key={l.href} href={l.href} className="ft-link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ft-col ft-reveal" style={{ "--d": "180ms" }}>
          <h4 className="ft-title">Services</h4>
          {services.map((s) => (
            <Link key={s} href="/services" className="ft-link">
              {s}
            </Link>
          ))}
        </div>

        <div className="ft-col ft-reveal" style={{ "--d": "270ms" }}>
          <h4 className="ft-title">Contact</h4>

          <a href="mailto:support@andscloud.com" className="ft-contact">
            <Icon>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </Icon>
            <span>support@andscloud.com</span>
          </a>

          <a href="tel:+917563883929" className="ft-contact">
            <Icon>
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </Icon>
            <span>+91 7563883929</span>
          </a>

          <p className="ft-contact ft-contact-static">
            <Icon>
              <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </Icon>
            <span>Patna, Bihar, India</span>
          </p>
        </div>
      </div>

      {/* Big faded wordmark */}
      <div className="ft-mark-wrap ft-reveal" aria-hidden="true">
        <svg className="ft-mark" viewBox="0 0 1000 135" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="ft-mark-grad" x1="0" y1="0" x2="0" y2="1">
              <stop className="ft-mark-a" offset="0%" />
              <stop className="ft-mark-b" offset="100%" />
            </linearGradient>
          </defs>
          <text
            x="5"
            y="122"
            fontSize="160"
            fontWeight="800"
            textLength="990"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#ft-mark-grad)"
            style={{ fontFamily: "inherit" }}
          >
            ANDS Cloud
          </text>
        </svg>
      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <p>© {year} ANDS Cloud Tech Solutions. All rights reserved.</p>

        <div className="ft-bottom-right">
          <button type="button" className="ft-top" onClick={toTop} aria-label="Back to top">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
              <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Link href="/privacy-policy" className="ft-small">Privacy Policy</Link>
          <Link href="/terms" className="ft-small">Terms &amp; Conditions</Link>
        </div>
      </div>

      {/* Plain CSS: rendered in the server HTML, so styles are there on the first paint */}
      <style>{`
        .ft-footer {
          position: relative;
          overflow: hidden;
          margin-top: 80px;
          background: var(--brand-black);
          color: #a3a3a3;
        }

        /* slow drifting orange glow in the corner */
        .ft-glow {
          position: absolute;
          top: -180px;
          left: 6%;
          width: 460px;
          height: 460px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--brand-orange) 22%, transparent),
            transparent 68%
          );
          filter: blur(20px);
          pointer-events: none;
          animation: ft-drift 16s ease-in-out infinite alternate;
        }

        /* Dot-grid texture that fades out downwards */
        .ft-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1.3px);
          background-size: 28px 28px;
          -webkit-mask-image: radial-gradient(ellipse 85% 60% at 50% 0%, #000 15%, transparent 75%);
          mask-image: radial-gradient(ellipse 85% 60% at 50% 0%, #000 15%, transparent 75%);
        }

        /* Glow that trails the cursor */
        .ft-cursor {
          position: absolute;
          top: 0;
          left: 0;
          width: 440px;
          height: 440px;
          margin: -220px 0 0 -220px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--brand-orange) 15%, transparent),
            transparent 65%
          );
          transform: translate(var(--fx, -999px), var(--fy, -999px));
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease, transform 0.3s ease-out;
        }

        .ft-footer:hover .ft-cursor {
          opacity: 1;
        }

        /* Thin top edge with an orange light sweeping across */
        .ft-topline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.08);
          background-image: linear-gradient(90deg, transparent, var(--brand-orange), transparent);
          background-size: 40% 100%;
          background-repeat: no-repeat;
          animation: ft-sweep 6s linear infinite;
          pointer-events: none;
        }

        /* Services marquee */
        .ft-marquee {
          position: relative;
          overflow: hidden;
          padding: 26px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.09);
          border-bottom: 1px solid rgba(255, 255, 255, 0.09);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
        }

        .ft-marquee-track {
          display: flex;
          width: max-content;
          animation: ft-marquee 40s linear infinite;
        }

        .ft-marquee:hover .ft-marquee-track {
          animation-play-state: paused;
        }

        .ft-marquee-list {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .ft-marquee-list li {
          display: flex;
          align-items: center;
          gap: 30px;
          padding-right: 30px;
          font-size: clamp(26px, 4vw, 46px);
          font-weight: 700;
          letter-spacing: -0.02em;
          white-space: nowrap;
          color: #fff;
        }

        /* every second item is outlined instead of filled */
        .ft-marquee-list li:nth-child(even) span {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.55);
        }

        .ft-star {
          flex-shrink: 0;
          color: var(--brand-orange);
          animation: ft-spin 8s linear infinite;
        }

        /* Scroll reveal (only active once JS has marked the footer ready) */
        .ft-ready .ft-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--d, 0ms);
        }

        .ft-ready .ft-reveal.ft-in {
          opacity: 1;
          transform: none;
        }

        /* CTA band */
        .ft-cta-wrap {
          position: relative;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 72px 24px 56px;
        }

        /* CTA is a rounded card with an orange glow in the corner */
        .ft-cta {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 32px;
          padding: clamp(28px, 5vw, 56px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--brand-orange) 14%, transparent),
            rgba(255, 255, 255, 0.02) 60%
          );
        }

        .ft-cta::before {
          content: "";
          position: absolute;
          right: -80px;
          top: -140px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--brand-orange) 32%, transparent),
            transparent 70%
          );
          pointer-events: none;
        }

        .ft-cta > * {
          position: relative;
        }

        .ft-cta-title {
          margin: 0;
          font-size: clamp(30px, 5vw, 54px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #fff;
        }

        .ft-cta-title span {
          color: var(--brand-orange);
        }

        .ft-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px;
          border-radius: 12px;
          background: var(--brand-orange);
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          transition: background 0.35s ease, color 0.35s ease,
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }

        .ft-btn:hover {
          background: #fff;
          color: var(--brand-black);
          transform: translateY(-3px);
          box-shadow: 0 16px 30px -14px color-mix(in srgb, var(--brand-orange) 80%, transparent);
        }

        .ft-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .ft-arrow {
          transform: rotate(-45deg);
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .ft-btn:hover .ft-arrow {
          transform: rotate(0deg);
        }

        /* Rolling text */
        .ft-roll {
          display: inline-flex;
          flex-direction: column;
          height: 1.35em;
          line-height: 1.35em;
          overflow: hidden;
        }

        .ft-roll > span {
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .ft-btn:hover .ft-roll > span {
          transform: translateY(-100%);
        }

        /* Columns */
        .ft-inner {
          position: relative;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 56px 24px 24px;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
          gap: 40px;
        }

        .ft-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .ft-title {
          margin: 0 0 8px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }

        /* Logo */
        .ft-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff;
        }

        .ft-logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .ft-logo:hover .ft-logo-img {
          transform: rotate(-8deg) scale(1.1);
        }

        .ft-logo-text {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .ft-logo-text span {
          margin-left: 6px;
          font-weight: 500;
          color: var(--brand-orange);
        }

        .ft-about {
          margin: 6px 0 0;
          max-width: 320px;
          font-size: 15px;
          line-height: 1.7;
        }

        /* Links: orange dash grows in before the text on hover */
        .ft-link {
          display: inline-flex;
          align-items: center;
          font-size: 15px;
          color: #a3a3a3;
          transition: color 0.25s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ft-link::before {
          content: "";
          width: 0;
          height: 1.5px;
          margin-right: 0;
          background: var(--brand-orange);
          transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            margin-right 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ft-link:hover {
          color: #fff;
        }

        .ft-link:hover::before {
          width: 14px;
          margin-right: 8px;
        }

        /* Contact rows */
        .ft-contact {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          margin: 0;
          padding: 12px 14px;
          font-size: 15px;
          line-height: 1.5;
          color: #a3a3a3;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.025);
          transition: color 0.25s ease, border-color 0.35s ease, background 0.35s ease,
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        a.ft-contact:hover {
          border-color: color-mix(in srgb, var(--brand-orange) 55%, transparent);
          background: color-mix(in srgb, var(--brand-orange) 8%, transparent);
          transform: translateX(4px);
        }

        .ft-icon {
          flex-shrink: 0;
          margin-top: 0;
          color: var(--brand-orange);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        a.ft-contact:hover {
          color: #fff;
        }

        a.ft-contact:hover .ft-icon {
          transform: scale(1.18) rotate(-6deg);
        }

        /* Big faded wordmark */
        .ft-mark-wrap {
          position: relative;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 24px 24px 0;
          overflow: hidden;
          user-select: none;
        }

        /* SVG text always scales to the container width, so it can never be cut off */
        .ft-mark {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .ft-mark-a,
        .ft-mark-b {
          stop-color: #ffffff;
          transition: stop-color 0.7s ease, stop-opacity 0.7s ease;
        }

        .ft-mark-a {
          stop-opacity: 0.16;
        }

        .ft-mark-b {
          stop-opacity: 0;
        }

        /* Hover: the wordmark lights up in brand orange */
        .ft-mark-wrap:hover .ft-mark-a {
          stop-color: var(--brand-orange);
          stop-opacity: 0.55;
        }

        .ft-mark-wrap:hover .ft-mark-b {
          stop-color: var(--brand-orange);
        }

        /* Bottom bar */
        .ft-bottom {
          position: relative;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 22px 24px 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.09);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          font-size: 14px;
        }

        .ft-bottom p {
          margin: 0;
        }

        .ft-bottom-right {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }

        .ft-small {
          position: relative;
          color: #a3a3a3;
          transition: color 0.25s ease;
        }

        .ft-small::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -3px;
          height: 1px;
          background: var(--brand-orange);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ft-small:hover {
          color: #fff;
        }

        .ft-small:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .ft-top {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 50%;
          background: transparent;
          color: #fff;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease,
            transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .ft-top svg {
          transition: transform 0.35s ease;
        }

        .ft-top:hover {
          background: var(--brand-orange);
          border-color: var(--brand-orange);
          transform: translateY(-3px);
        }

        .ft-top:hover svg {
          transform: translateY(-2px);
        }

        /* Focus states */
        .ft-link:focus-visible,
        .ft-small:focus-visible,
        .ft-btn:focus-visible,
        .ft-top:focus-visible,
        .ft-logo:focus-visible,
        a.ft-contact:focus-visible {
          outline: 2px solid var(--brand-orange);
          outline-offset: 4px;
          border-radius: 6px;
        }

        @keyframes ft-marquee {
          to { transform: translateX(-50%); }
        }

        @keyframes ft-sweep {
          from { background-position-x: -40%; }
          to { background-position-x: 140%; }
        }

        @keyframes ft-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes ft-drift {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(180px, 40px) scale(1.2); }
        }

        /* Responsive */
        @media (max-width: 960px) {
          .ft-inner {
            grid-template-columns: 1fr 1fr;
            gap: 40px 32px;
          }

          .ft-brand-col {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 560px) {
          .ft-cta-wrap {
            padding: 56px 20px 40px;
          }

          .ft-inner {
            grid-template-columns: 1fr;
            padding: 44px 20px 12px;
          }

          .ft-btn {
            width: 100%;
            justify-content: space-between;
          }

          .ft-bottom {
            padding: 20px 20px 24px;
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* Respect reduced-motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .ft-footer,
          .ft-footer * {
            animation: none !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0s !important;
          }

          .ft-ready .ft-reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </footer>
  );
}