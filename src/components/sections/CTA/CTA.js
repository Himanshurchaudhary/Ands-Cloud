"use client";

// CTA: a white closing section with a bold, left-aligned headline.
// Deliberately different from the centered dark sections above it.
import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-inner">
        <div className="cta-copy">
          <h2>
            Ready to build something{" "}
            <span className="cta-hl">great together?</span>
          </h2>
          <p>
            Tell us about your project and we will help you plan the right solution,
            with a clear timeline and pricing.
          </p>
        </div>

        <div className="cta-actions">
          {/* Hand-drawn arrow pointing at the main button (desktop only) */}
          <svg className="cta-arrow" viewBox="0 0 120 110" aria-hidden="true" focusable="false">
            <path
              d="M96 6 C108 40 92 74 46 84"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M46 84 L38 70 M46 84 L58 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <Link href="/contact" className="cta-btn cta-primary">
            Start Your Project
          </Link>
          <a
            href="https://wa.me/917563883929"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-secondary"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Component-scoped CSS (styled-jsx). Every class is prefixed with cta- so it cannot clash with other sections */}
      <style>{`
        .cta {
          background-color: #ffffff;
          background-image: radial-gradient(rgba(0, 0, 0, 0.09) 1px, transparent 1.2px);
          background-size: 22px 22px;
          padding: 120px 20px;
        }

        .cta-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 64px;
          align-items: end;
        }

        .cta-copy {
          text-align: left;
        }

        .cta h2 {
          font-size: clamp(38px, 6vw, 74px);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: -1.5px;
          color: var(--brand-black);
        }

        /* Black highlight block behind the closing phrase */
        .cta-hl {
          color: #ffffff;
          background: var(--brand-black);
          padding: 0 0.12em;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
        }

        .cta p {
          margin: 28px 0 0;
          font-size: 18px;
          line-height: 1.6;
          color: #444444;
          max-width: 480px;
        }

        .cta-actions {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .cta-arrow {
          position: absolute;
          top: -78px;
          left: -36px;
          width: 110px;
          height: auto;
          color: var(--brand-orange);
          overflow: visible;
        }

        /* Chunky buttons with hard offset shadows */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 20px 30px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          border: 3px solid #000000;
          border-radius: 4px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cta-primary {
          background: #000000;
          color: #ffffff;
          box-shadow: 6px 6px 0 var(--brand-orange);
        }

        .cta-secondary {
          background: #ffffff;
          color: #000000;
          box-shadow: 6px 6px 0 #000000;
        }

        .cta-btn:hover {
          transform: translate(-3px, -3px);
        }

        .cta-primary:hover {
          box-shadow: 9px 9px 0 var(--brand-orange);
        }

        .cta-secondary:hover {
          box-shadow: 9px 9px 0 #000000;
        }

        .cta-btn:focus-visible {
          outline: 3px dashed var(--brand-orange);
          outline-offset: 5px;
        }

        @media (max-width: 860px) {
          .cta {
            padding: 90px 20px;
          }

          .cta-inner {
            grid-template-columns: 1fr;
            gap: 48px;
            align-items: stretch;
          }

          .cta-arrow {
            display: none;
          }

          .cta-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-btn {
            transition: none;
          }

          .cta-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}