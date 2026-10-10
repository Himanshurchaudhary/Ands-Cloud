"use client";

// Top navigation: logo, sliding hover highlight, rolling link text,
// floating-capsule scroll effect, and a full-screen mobile menu.
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// Logo file: public/img/Glossy Orange Cloud A Emblem.webp
// (Tip: rename it to logo.webp and change this line to "/img/logo.webp")
const LOGO_SRC = "/img/Glossy%20Orange%20Cloud%20A%20Emblem.webp";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
];

const cta = { href: "/contact", label: "Contact us" };

// Label that rolls up and is replaced by a copy on hover
function Roll({ children }) {
  return (
    <span className="nv-roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

function Arrow() {
  return (
    <svg className="nv-arrow" viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pill, setPill] = useState({ x: 0, w: 0, show: false });

  const itemRefs = useRef([]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);
  const activeIndex = links.findIndex((l) => isActive(l.href));

  // Move the highlight pill to a given link
  const moveTo = useCallback((i) => {
    const el = itemRefs.current[i];
    if (!el) return;
    setPill({ x: el.offsetLeft, w: el.offsetWidth, show: true });
  }, []);

  // Send the pill back to the active link (or hide it)
  const rest = useCallback(() => {
    if (activeIndex >= 0) moveTo(activeIndex);
    else setPill((p) => ({ ...p, show: false }));
  }, [activeIndex, moveTo]);

  useEffect(() => {
    rest();
    window.addEventListener("resize", rest);
    document.fonts?.ready.then(rest);
    return () => window.removeEventListener("resize", rest);
  }, [rest]);

  // Scroll: switch to capsule mode and update the progress line
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Capsule spotlight follows the cursor horizontally
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
  };

  // Contact button leans slightly towards the cursor
  const pull = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
    e.currentTarget.style.setProperty("--mx", `${x.toFixed(1)}px`);
    e.currentTarget.style.setProperty("--my", `${y.toFixed(1)}px`);
  };
  const release = (e) => {
    e.currentTarget.style.removeProperty("--mx");
    e.currentTarget.style.removeProperty("--my");
  };

  const headerClass = [
    "nv-header",
    scrolled && "nv-scrolled",
    open && "nv-is-open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <div className="nv-inner" onMouseMove={spotlight}>
        <Link href="/" className="nv-logo" aria-label="ANDS Cloud, home">
          <Image
            src={LOGO_SRC}
            alt=""
            width={96}
            height={96}
            priority
            className="nv-logo-img"
          />
          <span className="nv-logo-text">
            ANDS<span className="nv-logo-light">Cloud</span>
            <i className="nv-dot" />
          </span>
        </Link>

        <nav
          className={open ? "nv-menu nv-menu-open" : "nv-menu"}
          aria-label="Main navigation"
          onMouseLeave={rest}
        >
          <span
            className="nv-pill"
            style={{
              width: pill.w,
              transform: `translateX(${pill.x}px)`,
              opacity: pill.show ? 1 : 0,
            }}
            aria-hidden="true"
          />

          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => (itemRefs.current[i] = el)}
              className={isActive(link.href) ? "nv-link nv-link-active" : "nv-link"}
              style={{ "--i": i }}
              aria-current={isActive(link.href) ? "page" : undefined}
              onMouseEnter={() => moveTo(i)}
              onFocus={() => moveTo(i)}
              onBlur={rest}
              onClick={() => setOpen(false)}
            >
              <span className="nv-idx">0{i + 1}</span>
              <Roll>{link.label}</Roll>
            </Link>
          ))}

          <Link
            href={cta.href}
            className="nv-cta nv-cta-mobile"
            style={{ "--i": links.length }}
            onClick={() => setOpen(false)}
          >
            <Roll>{cta.label}</Roll>
            <Arrow />
          </Link>
        </nav>

        <Link
          href={cta.href}
          className="nv-cta nv-cta-desktop"
          onMouseMove={pull}
          onMouseLeave={release}
        >
          <Roll>{cta.label}</Roll>
          <Arrow />
        </Link>

        <button
          type="button"
          className={open ? "nv-toggle nv-toggle-open" : "nv-toggle"}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>

        {/* Scroll progress line, lives inside the capsule */}
        <div className="nv-progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>

      {/* Plain CSS: rendered in the server HTML, so styles are there on the first paint */}
      <style>{`
        .nv-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: top 0.5s cubic-bezier(0.65, 0, 0.35, 1), background 0.4s ease,
            border-color 0.4s ease;
          animation: nv-enter 0.8s cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }

        /* Scrolled: the full-width bar melts away and a floating capsule takes over */
        .nv-scrolled {
          top: 10px;
          background: transparent;
          border-bottom-color: transparent;
        }

        .nv-is-open {
          background: transparent;
          border-bottom-color: transparent;
        }

        .nv-inner {
          position: relative;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          transition: max-width 0.6s cubic-bezier(0.65, 0, 0.35, 1),
            padding 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .nv-scrolled .nv-inner {
          max-width: min(calc(var(--container-width) - 56px), calc(100vw - 24px));
          padding: 9px 14px 9px 20px;
        }

        /* Capsule background (on a pseudo-element so it can't trap the fixed mobile menu) */
        .nv-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 0;
          background: rgba(255, 255, 255, 0);
          border: 1px solid transparent;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          transition: border-radius 0.6s cubic-bezier(0.65, 0, 0.35, 1),
            background 0.4s ease, border-color 0.4s ease, box-shadow 0.5s ease;
        }

        .nv-scrolled .nv-inner::before {
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border-color: rgba(0, 0, 0, 0.07);
          box-shadow: 0 14px 34px -16px rgba(0, 0, 0, 0.28);
        }

        .nv-is-open .nv-inner::before {
          opacity: 0;
        }

        /* Soft orange spotlight that follows the cursor inside the capsule */
        .nv-inner::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 18px;
          background: radial-gradient(
            220px circle at var(--sx, 50%) 50%,
            color-mix(in srgb, var(--brand-orange) 14%, transparent),
            transparent 70%
          );
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }

        .nv-scrolled .nv-inner::after {
          opacity: 1;
        }

        .nv-is-open .nv-inner::after {
          opacity: 0;
        }

        /* Logo: emblem + wordmark */
        .nv-logo {
          position: relative;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--brand-black);
        }

        .nv-logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            height 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nv-scrolled .nv-logo-img {
          width: 34px;
          height: 34px;
        }

        .nv-logo:hover .nv-logo-img {
          transform: rotate(-8deg) scale(1.1);
        }

        .nv-logo-text {
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.03em;
          transition: font-size 0.5s cubic-bezier(0.65, 0, 0.35, 1), color 0.3s ease;
        }

        .nv-scrolled .nv-logo-text {
          font-size: 19px;
        }

        .nv-logo-light {
          font-weight: 500;
          color: var(--brand-orange);
        }

        .nv-dot {
          width: 6px;
          height: 6px;
          margin-left: -3px;
          border-radius: 50%;
          background: var(--brand-orange);
          transition: transform 0.45s cubic-bezier(0.34, 1.8, 0.64, 1);
        }

        .nv-logo:hover .nv-dot {
          transform: translateY(-5px) scale(1.25);
        }

        /* Desktop menu */
        .nv-menu {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .nv-pill {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.055);
          pointer-events: none;
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            width 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s ease;
        }

        .nv-link {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          font-size: 15px;
          font-weight: 500;
          color: var(--brand-black);
          animation: nv-link-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
          animation-delay: calc(var(--i) * 70ms + 250ms);
          transition: color 0.25s ease;
        }

        /* small orange dot on the current page */
        .nv-link::before {
          content: "";
          width: 5px;
          height: 5px;
          margin-right: -2px;
          border-radius: 50%;
          background: var(--brand-orange);
          transform: scale(0);
          transition: transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1);
        }

        .nv-link-active::before {
          transform: scale(1);
        }

        .nv-idx {
          display: none;
        }

        /* Rolling text */
        .nv-roll {
          display: inline-flex;
          flex-direction: column;
          height: 1.35em;
          line-height: 1.35em;
          overflow: hidden;
        }

        .nv-roll > span {
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .nv-link:hover .nv-roll > span,
        .nv-link:focus-visible .nv-roll > span,
        .nv-cta:hover .nv-roll > span {
          transform: translateY(-100%);
        }

        /* CTA */
        .nv-cta {
          position: relative;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 11px 20px;
          border-radius: 10px;
          background: var(--brand-black);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          transition: background 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease, padding 0.5s cubic-bezier(0.65, 0, 0.35, 1);
          animation: nv-link-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
          animation-delay: 650ms;
        }

        .nv-scrolled .nv-cta-desktop {
          padding-top: 9px;
          padding-bottom: 9px;
        }

        .nv-cta:hover {
          background: var(--brand-orange);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px var(--brand-orange);
        }

        .nv-cta:active {
          transform: translateY(0) scale(0.98);
        }

        .nv-arrow {
          transform: rotate(-45deg);
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nv-cta:hover .nv-arrow {
          transform: rotate(0deg);
        }

        .nv-cta-mobile {
          display: none;
        }

        /* Magnetic button: leans towards the cursor (offsets set from JS) */
        .nv-cta-desktop {
          transform: translate(var(--mx, 0px), var(--my, 0px));
        }

        .nv-cta-desktop:hover {
          transform: translate(var(--mx, 0px), calc(var(--my, 0px) - 2px));
        }

        /* Focus states */
        .nv-link:focus-visible,
        .nv-cta:focus-visible,
        .nv-toggle:focus-visible,
        .nv-logo:focus-visible {
          outline: 2px solid var(--brand-orange);
          outline-offset: 3px;
          border-radius: 10px;
        }

        /* Scroll progress line inside the capsule */
        .nv-progress {
          position: absolute;
          left: 22px;
          right: 22px;
          bottom: 0;
          height: 2px;
          border-radius: 2px;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .nv-progress i {
          display: block;
          height: 100%;
          background: var(--brand-orange);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.12s linear;
        }

        .nv-scrolled .nv-progress {
          opacity: 1;
        }

        .nv-is-open .nv-progress {
          opacity: 0;
        }

        /* Hamburger: two lines that cross into an X */
        .nv-toggle {
          display: none;
          position: relative;
          z-index: 3;
          width: 44px;
          height: 44px;
          padding: 0;
          border: 0;
          background: none;
          cursor: pointer;
        }

        .nv-toggle span {
          position: absolute;
          left: 10px;
          right: 10px;
          height: 2px;
          border-radius: 2px;
          background: var(--brand-black);
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            top 0.5s cubic-bezier(0.65, 0, 0.35, 1), background 0.3s ease,
            left 0.4s ease;
        }

        .nv-toggle span:nth-child(1) { top: 17px; }
        .nv-toggle span:nth-child(2) { top: 25px; left: 18px; }

        .nv-toggle:hover span:nth-child(2) { left: 10px; }

        .nv-toggle-open span:nth-child(1) { top: 21px; transform: rotate(45deg); }
        .nv-toggle-open span:nth-child(2) { top: 21px; left: 10px; transform: rotate(-45deg); }

        /* Keyframes */
        @keyframes nv-enter {
          from { transform: translateY(-100%); }
        }

        @keyframes nv-link-in {
          from { opacity: 0; transform: translateY(-12px); }
        }

        /* Mobile: full-screen menu revealed by an expanding circle */
        @media (max-width: 900px) {
          .nv-toggle {
            display: block;
          }

          .nv-cta-mobile {
            display: inline-flex;
          }

          .nv-cta-desktop,
          .nv-pill {
            display: none;
          }

          .nv-inner {
            padding: 12px 16px;
          }

          .nv-scrolled .nv-inner {
            padding: 6px 8px 6px 14px;
          }

          .nv-logo-img {
            width: 38px;
            height: 38px;
          }

          .nv-scrolled .nv-logo-img {
            width: 32px;
            height: 32px;
          }

          .nv-logo-text {
            font-size: 20px;
          }

          .nv-is-open .nv-logo-text {
            color: #fff;
          }

          .nv-is-open .nv-logo-light {
            color: var(--brand-orange);
          }

          .nv-is-open .nv-toggle span {
            background: #fff;
          }

          .nv-menu {
            position: fixed;
            inset: 0;
            z-index: 2;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            gap: 0;
            padding: 104px 28px 36px;
            background: var(--brand-black);
            overflow-y: auto;
            visibility: hidden;
            clip-path: circle(0px at calc(100% - 44px) 36px);
            transition: clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1),
              visibility 0s linear 0.8s;
          }

          .nv-menu-open {
            visibility: visible;
            clip-path: circle(150vmax at calc(100% - 44px) 36px);
            transition-delay: 0s;
          }

          .nv-link {
            justify-content: flex-start;
            gap: 18px;
            padding: 16px 0;
            font-size: clamp(30px, 9vw, 46px);
            font-weight: 600;
            letter-spacing: -0.02em;
            color: #fff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.09);
            animation: none;
            opacity: 0;
            transform: translateY(42px);
            transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              color 0.25s ease, padding-left 0.35s ease;
          }

          .nv-link::before {
            display: none;
          }

          .nv-link:hover,
          .nv-link-active {
            color: var(--brand-orange);
            padding-left: 8px;
          }

          .nv-idx {
            display: inline;
            min-width: 28px;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.04em;
            color: var(--brand-orange);
            font-variant-numeric: tabular-nums;
          }

          .nv-menu-open .nv-link,
          .nv-menu-open .nv-cta-mobile {
            opacity: 1;
            transform: none;
            transition-delay: calc(var(--i) * 70ms + 350ms), calc(var(--i) * 70ms + 350ms), 0s, 0s;
          }

          .nv-cta-mobile {
            justify-content: space-between;
            margin-top: auto;
            padding: 18px 22px;
            font-size: 17px;
            background: var(--brand-orange);
            animation: none;
            opacity: 0;
            transform: translateY(42px);
            transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              background 0.3s ease;
          }

          .nv-cta-mobile:hover {
            background: #fff;
            color: var(--brand-black);
            box-shadow: none;
          }

          .nv-menu .nv-roll > span {
            transition: none;
          }

          .nv-menu .nv-link:hover .nv-roll > span,
          .nv-menu .nv-cta:hover .nv-roll > span {
            transform: none;
          }
        }

        /* Respect reduced-motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .nv-header,
          .nv-header *,
          .nv-menu {
            animation: none !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0s !important;
          }
        }
      `}</style>
    </header>
  );
}