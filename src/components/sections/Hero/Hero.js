"use client";

// Hero section: animated headline + call-to-action buttons on the left,
// a staggered collage of visuals (different aspect ratios) on the right.
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

// Same logo file as the navbar and footer
const LOGO_SRC = "/img/Glossy%20Orange%20Cloud%20A%20Emblem.webp";

// Your own photos / screenshots for the collage (files live in public/img).
// Any image ratio works, it is cropped to fit the tile.
// If a file is missing, that tile quietly falls back to the built-in visual.
const photos = {
  web: null, // 5:4 tile (null = built-in browser mockup)
  tall: "/img/hero-1.webp", // 3:4 tall tile
  wide: "/img/hero-2.webp", // 16:10 wide tile
};

function Photo({ src, alt, onFail }) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 980px) 50vw, 340px"
        className="hr-photo"
        onError={onFail}
      />
      <i className="hr-shade" />
    </>
  );
}

// One headline word that slides up out of a mask
function Word({ i, children }) {
  return (
    <Fragment>
      <span className="hr-w">
        <span style={{ "--i": i }}>{children}</span>
      </span>{" "}
    </Fragment>
  );
}

// Label that rolls up and is replaced by a copy on hover
function Roll({ children }) {
  return (
    <span className="hr-roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

function Arrow() {
  return (
    <svg className="hr-arrow" viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// [low, high] scale for each animated bar in the cloud tile
const bars = [
  [0.3, 0.6], [0.45, 0.85], [0.25, 0.55], [0.5, 0.95], [0.35, 0.7], [0.4, 0.8],
  [0.2, 0.5], [0.55, 0.9], [0.3, 0.65], [0.45, 1], [0.25, 0.6], [0.5, 0.8],
];

export default function Hero() {
  const heroRef = useRef(null);

  // Remember which photos failed to load so their tile shows the built-in visual
  const [failed, setFailed] = useState({});
  const fail = (key) => () => setFailed((f) => ({ ...f, [key]: true }));

  // Gentle scroll parallax: the two collage columns drift in opposite directions
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      if (window.innerWidth <= 980) return; // no parallax on phones / tablets
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--sy", Math.min(window.scrollY, 700));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hr-hero" ref={heroRef}>
      <div className="hr-inner">
        {/* ---------- Left: copy ---------- */}
        <div className="hr-copy">
          <span className="hr-badge">
            <i className="hr-badge-dot" />
            Web • Mobile • Cloud
          </span>

          <h1 className="hr-title">
            <Word i={0}>Smart</Word>
            <Word i={1}>digital</Word>
            <Word i={2}>solutions</Word>
            <Word i={3}>for</Word>
            <Word i={4}>your</Word>
            <span className="hr-hl">
              <Word i={5}>growing</Word>
              <Word i={6}>business</Word>
              <svg className="hr-squiggle" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M2 6 C 20 0, 34 12, 52 6 S 84 0, 102 6 S 134 12, 152 6 S 184 0, 202 6 S 234 12, 252 6 S 284 0, 298 6"
                  pathLength="1"
                />
              </svg>
            </span>
          </h1>

          <p className="hr-text">
            ANDS Cloud Tech Solutions builds web applications, mobile apps, cloud
            hosting and custom software that help your business grow.
          </p>

          <div className="hr-actions">
            <Link href="/contact" className="hr-btn hr-btn-primary">
              <Roll>Free Consultation</Roll>
              <Arrow />
            </Link>
            <Link href="/services" className="hr-btn hr-btn-secondary">
              <Roll>Our Services</Roll>
              <Arrow />
            </Link>
          </div>
        </div>

        {/* ---------- Right: collage ---------- */}
        <div className="hr-collage" aria-hidden="true">
          <div className="hr-col hr-col-a">
            {/* Web tile, 5:4 */}
            <div className="hr-tile hr-web" style={{ "--d": "250ms" }}>
              {photos.web && !failed.web ? (
                <Photo src={photos.web} alt="" onFail={fail("web")} />
              ) : (
                <>
                  <div className="hr-bar">
                    <i className="hr-dot" style={{ background: "#ff5f57" }} />
                    <i className="hr-dot" style={{ background: "#febc2e" }} />
                    <i className="hr-dot" style={{ background: "#28c840" }} />
                    <span className="hr-url">yourbusiness.com</span>
                  </div>
                  <div className="hr-web-body">
                    <div className="hr-nav">
                      <i className="hr-logo-sq" />
                      <b />
                      <b />
                      <b />
                      <em />
                    </div>
                    <div className="hr-web-hero">
                      <div className="hr-web-lines">
                        <span className="hr-ln hr-ln-dark" style={{ width: "100%" }} />
                        <span className="hr-ln hr-ln-dark" style={{ width: "78%" }} />
                        <span className="hr-ln hr-shim" style={{ width: "92%" }} />
                        <span className="hr-ln hr-shim" style={{ width: "64%" }} />
                        <span className="hr-web-btn" />
                      </div>
                      <div className="hr-web-img" />
                    </div>
                  </div>
                  <div className="hr-chip">
                    <span className="hr-g">$</span> deploy --prod
                    <i className="hr-caret" />
                  </div>
                </>
              )}
            </div>

            {/* Seal tile, 1:1 circle */}
            <div className="hr-seal" style={{ "--d": "520ms" }}>
              <svg className="hr-seal-ring" viewBox="0 0 200 200">
                <defs>
                  <path id="hr-seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text fontSize="14" fontWeight="700" fill="#111">
                  <textPath href="#hr-seal-path" textLength="484" lengthAdjust="spacing">
                    WEB • MOBILE • CLOUD • CUSTOM SOFTWARE •{" "}
                  </textPath>
                </text>
              </svg>
              <Image src={LOGO_SRC} alt="" width={96} height={96} className="hr-seal-logo" />
            </div>
          </div>

          <div className="hr-col hr-col-b">
            {/* Mobile tile, 3:4 */}
            <div className="hr-tile hr-mobile" style={{ "--d": "400ms" }}>
              {photos.tall && !failed.tall ? (
                <Photo src={photos.tall} alt="" onFail={fail("tall")} />
              ) : (
                <div className="hr-phone">
                  <div className="hr-screen">
                    <i className="hr-notch" />
                    <div className="hr-greet">
                      <span className="hr-ln hr-ln-dark" style={{ width: "46%" }} />
                      <span className="hr-ln hr-shim" style={{ width: "30%" }} />
                    </div>
                    <div className="hr-card">
                      <span className="hr-card-label" />
                      <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                        <polygon points="0,40 0,30 14,26 28,29 42,16 56,20 70,8 84,12 100,3 100,40" />
                        <polyline points="0,30 14,26 28,29 42,16 56,20 70,8 84,12 100,3" pathLength="1" />
                      </svg>
                    </div>
                    {[0, 1, 2].map((n) => (
                      <div className="hr-row" key={n}>
                        <i className="hr-av" />
                        <div>
                          <span className="hr-ln hr-ln-dark" style={{ width: `${70 - n * 12}%` }} />
                          <span className="hr-ln hr-shim" style={{ width: `${48 - n * 6}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cloud tile, 16:10 */}
            <div className="hr-tile hr-cloud" style={{ "--d": "640ms" }}>
              {photos.wide && !failed.wide ? (
                <Photo src={photos.wide} alt="" onFail={fail("wide")} />
              ) : (
                <>
                  <div className="hr-cloud-top">
                    <span>Cloud server</span>
                    <span className="hr-online">
                      <i className="hr-live" /> Online
                    </span>
                  </div>
                  <div className="hr-bars">
                    {bars.map(([lo, hi], i) => (
                      <i
                        key={i}
                        style={{ "--l": lo, "--h": hi, animationDelay: `${i * 0.18}s` }}
                      />
                    ))}
                  </div>
                  <div className="hr-meters">
                    {[
                      ["CPU", "62%"],
                      ["RAM", "48%"],
                      ["NET", "80%"],
                    ].map(([label, w], i) => (
                      <div className="hr-meter" key={label}>
                        <span>{label}</span>
                        <div className="hr-track">
                          <i style={{ "--w": w, animationDelay: `${i * 0.35}s` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Plain CSS: rendered in the server HTML, so styles are there on the first paint */}
      <style>{`
        .hr-hero {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          padding: 56px 24px 96px;
        }

        /* faint dot grid, still reads as plain white */
        .hr-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0, 0, 0, 0.07) 1px, transparent 1.3px);
          background-size: 26px 26px;
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 70% 40%, #000, transparent 75%);
          mask-image: radial-gradient(ellipse 70% 70% at 70% 40%, #000, transparent 75%);
          pointer-events: none;
        }

        .hr-inner {
          position: relative;
          max-width: var(--container-width);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 660px);
          align-items: center;
          gap: 64px;
        }

        /* ---------- copy ---------- */
        .hr-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 26px;
        }

        .hr-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 999px;
          background: #fff0e4;
          color: var(--brand-orange);
          font-size: 14px;
          font-weight: 600;
          animation: hr-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }

        .hr-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--brand-orange);
          animation: hr-pulse-o 2s ease-out infinite;
        }

        .hr-title {
          margin: 0;
          font-size: clamp(36px, 4.4vw, 60px);
          font-weight: 800;
          line-height: 1.07;
          letter-spacing: -0.035em;
          color: var(--brand-black);
        }

        .hr-w {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          padding-bottom: 0.14em;
          margin-bottom: -0.14em;
        }

        /* long selectors on purpose: they beat any global "h1 span" colour rule */
        .hr-hero .hr-title .hr-w > span {
          color: var(--brand-black);
          display: inline-block;
          animation: hr-rise 0.95s cubic-bezier(0.22, 1, 0.36, 1) backwards;
          animation-delay: calc(var(--i) * 70ms + 200ms);
        }

        .hr-hl {
          position: relative;
          display: inline-block;
          white-space: nowrap;
        }

        .hr-hero .hr-title .hr-hl .hr-w > span {
          color: var(--brand-orange);
        }

        .hr-squiggle {
          position: absolute;
          left: 0;
          bottom: -0.12em;
          width: 100%;
          height: 0.2em;
          overflow: visible;
          pointer-events: none;
        }

        .hr-squiggle path {
          fill: none;
          stroke: var(--brand-orange);
          stroke-width: 3.5;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: hr-draw 1.1s cubic-bezier(0.65, 0, 0.35, 1) 1.1s forwards;
        }

        .hr-text {
          margin: 0;
          max-width: 520px;
          text-wrap: pretty;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
          animation: hr-fade 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.75s backwards;
        }

        .hr-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          animation: hr-fade 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.9s backwards;
        }

        /* buttons */
        .hr-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease,
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }

        .hr-btn:hover {
          transform: translateY(-3px);
        }

        .hr-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .hr-btn-primary {
          background: var(--brand-orange);
          color: #ffffff;
          border: 1.5px solid var(--brand-orange);
        }

        .hr-btn-primary:hover {
          background: var(--brand-black);
          border-color: var(--brand-black);
          box-shadow: 0 16px 28px -14px rgba(0, 0, 0, 0.45);
        }

        .hr-btn-secondary {
          background: transparent;
          color: var(--brand-black);
          border: 1.5px solid var(--brand-black);
        }

        .hr-btn-secondary:hover {
          background: var(--brand-black);
          color: #ffffff;
          box-shadow: 0 16px 28px -14px rgba(0, 0, 0, 0.45);
        }

        .hr-btn:focus-visible {
          outline: 2px solid var(--brand-orange);
          outline-offset: 3px;
        }

        .hr-roll {
          display: inline-flex;
          flex-direction: column;
          height: 1.35em;
          line-height: 1.35em;
          overflow: hidden;
        }

        .hr-roll > span {
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .hr-btn:hover .hr-roll > span {
          transform: translateY(-100%);
        }

        .hr-arrow {
          transform: rotate(-45deg);
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hr-btn:hover .hr-arrow {
          transform: rotate(0deg);
        }

        /* ---------- collage ---------- */
        .hr-collage {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 18px;
          align-items: start;
        }

        .hr-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .hr-col-a {
          transform: translateY(calc(var(--sy, 0) * -0.05px));
        }

        .hr-col-b {
          margin-top: 56px;
          transform: translateY(calc(var(--sy, 0) * 0.05px));
        }

        .hr-tile {
          position: relative;
          overflow: hidden;
          container-type: inline-size;
          border-radius: 22px;
          background: #ffffff;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.07), 0 26px 50px -26px rgba(0, 0, 0, 0.3);
          animation: hr-pop 1s cubic-bezier(0.22, 1, 0.36, 1) backwards;
          animation-delay: var(--d, 0ms);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.55s ease;
        }

        .hr-tile:hover {
          transform: translateY(-8px);
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.07), 0 36px 60px -26px rgba(0, 0, 0, 0.38);
        }

        .hr-photo {
          object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hr-tile:hover .hr-photo {
          transform: scale(1.07);
        }

        /* soft dark fade at the bottom of photo tiles */
        .hr-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent 45%);
          pointer-events: none;
        }

        /* shared skeleton lines */
        .hr-ln {
          display: block;
          height: 3.2cqw;
          border-radius: 99px;
        }

        .hr-ln-dark {
          background: #1a1a1a;
        }

        .hr-shim {
          background: linear-gradient(90deg, #ececec 25%, #f8f8f8 50%, #ececec 75%);
          background-size: 200% 100%;
          animation: hr-shimmer 1.8s linear infinite;
        }

        /* web tile (5:4) */
        .hr-web {
          aspect-ratio: 5 / 4;
        }

        .hr-bar {
          display: flex;
          align-items: center;
          gap: 2cqw;
          height: 11cqw;
          padding: 0 4cqw;
          background: #f6f6f6;
          border-bottom: 1px solid #ececec;
        }

        .hr-dot {
          width: 2.6cqw;
          height: 2.6cqw;
          border-radius: 50%;
        }

        .hr-url {
          flex: 1;
          display: flex;
          align-items: center;
          height: 6cqw;
          margin-left: 3cqw;
          padding: 0 3cqw;
          border: 1px solid #e8e8e8;
          border-radius: 99px;
          background: #ffffff;
          font-size: 3.1cqw;
          color: #8a8a8a;
        }

        .hr-web-body {
          display: grid;
          gap: 5cqw;
          padding: 5cqw;
        }

        .hr-nav {
          display: flex;
          align-items: center;
          gap: 2.6cqw;
        }

        .hr-logo-sq {
          width: 5cqw;
          height: 5cqw;
          margin-right: 1cqw;
          border-radius: 1.4cqw;
          background: var(--brand-orange);
        }

        .hr-nav b {
          width: 9cqw;
          height: 1.8cqw;
          border-radius: 99px;
          background: #e4e4e4;
        }

        .hr-nav em {
          margin-left: auto;
          width: 14cqw;
          height: 5cqw;
          border-radius: 1.6cqw;
          background: #111111;
        }

        .hr-web-hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4cqw;
        }

        .hr-web-lines {
          display: flex;
          flex-direction: column;
          gap: 2.4cqw;
        }

        .hr-web-lines .hr-ln-dark {
          height: 4.4cqw;
        }

        .hr-web-btn {
          width: 17cqw;
          height: 5.6cqw;
          margin-top: 1.5cqw;
          border-radius: 1.8cqw;
          background: var(--brand-orange);
        }

        .hr-web-img {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1 / 1.02;
          border-radius: 3cqw;
          background: linear-gradient(135deg, #ffbf94, var(--brand-orange));
        }

        .hr-web-img::after {
          content: "";
          position: absolute;
          right: -8cqw;
          bottom: -8cqw;
          width: 24cqw;
          height: 24cqw;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
        }

        .hr-chip {
          position: absolute;
          left: 5cqw;
          bottom: 4.5cqw;
          display: flex;
          align-items: center;
          gap: 1.6cqw;
          padding: 2.2cqw 3.4cqw;
          border-radius: 99px;
          background: #111111;
          color: #ffffff;
          font: 600 3cqw/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        }

        .hr-g {
          color: #28c840;
        }

        .hr-caret {
          width: 0.8cqw;
          height: 3.2cqw;
          background: #ffffff;
          animation: hr-blink 1s steps(1) infinite;
        }

        /* seal (circle) */
        .hr-seal {
          position: relative;
          width: 66%;
          aspect-ratio: 1;
          margin-left: 6%;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.07), 0 22px 44px -22px rgba(0, 0, 0, 0.3);
          animation: hr-pop 1s cubic-bezier(0.22, 1, 0.36, 1) backwards;
          animation-delay: var(--d, 0ms);
        }

        .hr-seal-ring {
          position: absolute;
          inset: 4%;
          width: 92%;
          height: 92%;
          animation: hr-spin 26s linear infinite;
        }

        .hr-seal-logo {
          width: 42%;
          height: 42%;
          object-fit: contain;
          animation: hr-float 4s ease-in-out infinite;
        }

        /* mobile tile (3:4) */
        .hr-mobile {
          aspect-ratio: 3 / 4;
          background: linear-gradient(160deg, #fff1e6, #ffd9bd);
        }

        .hr-phone {
          position: absolute;
          left: 50%;
          bottom: -7cqw;
          width: 64cqw;
          height: 126cqw;
          padding: 2.4cqw;
          transform: translateX(-50%);
          border-radius: 10cqw;
          background: #111111;
          box-shadow: 0 24px 40px -16px rgba(0, 0, 0, 0.45);
        }

        .hr-screen {
          position: relative;
          height: 100%;
          overflow: hidden;
          padding: 11cqw 4.5cqw 0;
          border-radius: 7.8cqw;
          background: #ffffff;
        }

        .hr-notch {
          position: absolute;
          top: 2.2cqw;
          left: 50%;
          width: 16cqw;
          height: 4.6cqw;
          margin-left: -8cqw;
          border-radius: 99px;
          background: #111111;
        }

        .hr-greet {
          display: flex;
          flex-direction: column;
          gap: 1.8cqw;
          margin-bottom: 4cqw;
        }

        .hr-card {
          padding: 4cqw;
          border-radius: 5cqw;
          background: var(--brand-orange);
        }

        .hr-card-label {
          display: block;
          width: 16cqw;
          height: 2.4cqw;
          margin-bottom: 3cqw;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.55);
        }

        .hr-card svg {
          display: block;
          width: 100%;
          height: 15cqw;
          overflow: visible;
        }

        .hr-card polygon {
          fill: rgba(255, 255, 255, 0.18);
        }

        .hr-card polyline {
          fill: none;
          stroke: #ffffff;
          stroke-width: 2.4;
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: hr-draw 2.6s ease-in-out infinite alternate;
        }

        .hr-row {
          display: flex;
          align-items: center;
          gap: 3cqw;
          margin-top: 4cqw;
        }

        .hr-row > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.6cqw;
        }

        .hr-av {
          flex-shrink: 0;
          width: 9cqw;
          height: 9cqw;
          border-radius: 50%;
          background: #ffe3cf;
        }

        /* cloud tile (16:10) */
        .hr-cloud {
          aspect-ratio: 16 / 10;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5cqw;
          background: var(--brand-black);
          color: #ffffff;
        }

        .hr-cloud-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 3.6cqw;
          font-weight: 600;
        }

        .hr-online {
          display: inline-flex;
          align-items: center;
          gap: 1.8cqw;
          font-size: 3cqw;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
        }

        .hr-live {
          width: 2.4cqw;
          height: 2.4cqw;
          border-radius: 50%;
          background: #28c840;
          animation: hr-pulse-g 1.8s ease-out infinite;
        }

        .hr-bars {
          display: flex;
          align-items: flex-end;
          gap: 1.8cqw;
          height: 25cqw;
        }

        .hr-bars i {
          flex: 1;
          height: 100%;
          border-radius: 0.9cqw;
          background: linear-gradient(to top, var(--brand-orange), rgba(255, 106, 0, 0.25));
          transform-origin: bottom;
          animation: hr-bar 2.6s ease-in-out infinite alternate;
        }

        .hr-meters {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4cqw;
        }

        .hr-meter span {
          display: block;
          margin-bottom: 1.6cqw;
          font-size: 2.6cqw;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.5);
        }

        .hr-track {
          height: 1cqw;
          overflow: hidden;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.14);
        }

        .hr-track i {
          display: block;
          height: 100%;
          width: var(--w);
          border-radius: 99px;
          background: var(--brand-orange);
          transform-origin: left;
          animation: hr-grow 2.8s ease-in-out infinite alternate;
        }

        /* ---------- keyframes ---------- */
        @keyframes hr-fade {
          from { opacity: 0; transform: translateY(18px); }
        }

        @keyframes hr-rise {
          from { transform: translateY(110%); }
        }

        @keyframes hr-draw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes hr-pop {
          from { opacity: 0; transform: translateY(44px) scale(0.95); }
        }

        @keyframes hr-shimmer {
          to { background-position: -200% 0; }
        }

        @keyframes hr-blink {
          50% { opacity: 0; }
        }

        @keyframes hr-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes hr-float {
          50% { transform: translateY(-6%); }
        }

        @keyframes hr-bar {
          from { transform: scaleY(var(--l)); }
          to { transform: scaleY(var(--h)); }
        }

        @keyframes hr-grow {
          from { transform: scaleX(0.35); }
          to { transform: scaleX(1); }
        }

        @keyframes hr-pulse-g {
          0% { box-shadow: 0 0 0 0 rgba(40, 200, 64, 0.6); }
          100% { box-shadow: 0 0 0 2.4cqw rgba(40, 200, 64, 0); }
        }

        @keyframes hr-pulse-o {
          0% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.5); }
          100% { box-shadow: 0 0 0 9px rgba(255, 106, 0, 0); }
        }

        /* ---------- responsive ---------- */
        @media (max-width: 980px) {
          .hr-hero {
            padding: 56px 24px 90px;
          }

          .hr-inner {
            grid-template-columns: 1fr;
            gap: 56px;
          }

          .hr-collage {
            width: 100%;
            max-width: 560px;
            margin: 0 auto;
          }
        }

        @media (max-width: 560px) {
          .hr-hero {
            padding: 44px 20px 72px;
          }

          .hr-copy {
            gap: 22px;
          }

          /* scales with the screen so "growing business" never overflows, even at 320px */
          .hr-title {
            font-size: clamp(26px, 8.4vw, 36px);
          }

          .hr-text {
            font-size: 16px;
          }

          .hr-actions {
            width: 100%;
            flex-direction: column;
          }

          .hr-btn {
            justify-content: space-between;
          }

          /* collage: wider tiles so the small details stay readable on phones */
          .hr-collage {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .hr-col {
            display: contents;
          }

          .hr-web,
          .hr-cloud {
            grid-column: 1 / -1;
          }

          .hr-mobile {
            grid-column: 1;
            grid-row: 2;
          }

          .hr-seal {
            grid-column: 2;
            grid-row: 2;
            align-self: center;
            width: 100%;
            margin-left: 0;
          }

          .hr-tile {
            border-radius: 16px;
          }
        }

        /* Touch screens: no sticky hover states after a tap */
        @media (hover: none) {
          .hr-tile:hover,
          .hr-btn:hover {
            transform: none;
          }

          .hr-tile:hover .hr-photo {
            transform: none;
          }
        }

        /* Respect reduced-motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .hr-hero *,
          .hr-hero *::before {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }

          .hr-squiggle path,
          .hr-card polyline {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}