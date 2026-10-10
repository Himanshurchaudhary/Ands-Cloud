"use client";

// Testimonials: client reviews in a horizontal scrolling row, with prev and next controls.
// Placeholder data. Replace with real client feedback (with permission) before launch.

import { useRef } from "react";

const testimonials = [
  {
    name: "Md Shadid Uddin Mailick",
    role: "Founder, Kolkatakart",
    text: "The team delivered our website on time and the result exceeded our expectations. Very professional and easy to work with.",
  },
  {
    name: "Prince Kumar",
    role: "Software Owner",
    text: "They built our clinic management software around our daily workflow. Billing and patient records are now much faster to handle.",
  },
  {
    name: "Mohit Kumar",
    role: "Startup Founder,The Orchard Engine",
    text: "Our mobile app was launched on the Play Store with clean code and good support after release. Highly recommended.",
  },
];

export default function Testimonials() {
  const listRef = useRef(null);

  // Scroll the row by one card width in the given direction
  const scrollByCard = (direction) => {
    const list = listRef.current;
    if (!list) return;
    const card = list.querySelector(".tm-item");
    const step = card ? card.offsetWidth + 24 : list.clientWidth * 0.8;
    list.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="tm">
      <div className="tm-inner">
        {/* Heading */}
        <header className="tm-header">
          <span className="tm-eyebrow">Testimonials</span>
          <h2>
            What our <span>clients say</span>
          </h2>
          <svg className="tm-underline" viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M2 8 C36 3 70 10 108 6 S180 3 218 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </header>

        {/* Horizontal scrolling row of reviews */}
        <div className="tm-list" ref={listRef} tabIndex={0} aria-label="Client testimonials">
          {testimonials.map((item, index) => (
            <figure className="tm-item" key={index}>
              <div className="tm-top">
                <span className="tm-mark" aria-hidden="true">&ldquo;</span>
                <span className="tm-index">
                  {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              <blockquote>{item.text}</blockquote>

              <figcaption>
                <span className="tm-bar" aria-hidden="true" />
                <strong>{item.name}</strong>
                <span className="tm-role">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Controls */}
        <div className="tm-controls">
          <button type="button" className="tm-btn" onClick={() => scrollByCard(-1)} aria-label="Previous testimonial">
            <svg viewBox="0 0 40 24" width="30" height="18" aria-hidden="true" focusable="false">
              <path d="M36 12 C26 11 14 12.5 5 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M11 6 C8 8 6 10 4.5 12 C6 14 8 16 10.5 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="tm-btn" onClick={() => scrollByCard(1)} aria-label="Next testimonial">
            <svg viewBox="0 0 40 24" width="30" height="18" aria-hidden="true" focusable="false">
              <path d="M4 12 C14 13 26 11.5 35 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M29 6 C32 8 34 10 35.5 12 C34 14 32 16 29.5 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Component-scoped CSS (styled-jsx). Every class is prefixed with tm- so it cannot clash with other sections */}
      <style>{`
        .tm {
          background: #fffaf5;
          padding: 112px 0;
        }

        .tm-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Heading */
        .tm-header {
          max-width: 640px;
          margin: 0 0 56px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tm-eyebrow {
          color: var(--brand-orange);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .tm h2 {
          font-size: clamp(30px, 4.2vw, 46px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.5px;
          color: var(--brand-black);
        }

        .tm h2 span {
          color: var(--brand-orange);
        }

        .tm-underline {
          width: 200px;
          max-width: 60%;
          height: 12px;
          color: var(--brand-orange);
          display: block;
          margin-top: -4px;
        }

        /* Horizontal scrolling row. Cards snap as the row moves */
        .tm-list {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-padding-left: 20px;
          padding: 4px 20px 28px;
          margin: 0 -20px;
          scrollbar-width: thin;
          scrollbar-color: var(--brand-orange) #ece4dc;
          -webkit-overflow-scrolling: touch;
          border-top: 2px solid var(--brand-black);
        }

        .tm-list:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 6px;
        }

        .tm-item {
          margin: 0;
          flex: 0 0 min(420px, 84vw);
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          padding: 36px 32px 8px;
          background: #ffffff;
          border: 1px solid #efe6dd;
          border-top: none;
          position: relative;
        }

        .tm-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        /* Oversized serif quote mark, the one decorative flourish */
        .tm-mark {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 84px;
          line-height: 0.7;
          color: var(--brand-orange);
          transition: transform 0.35s ease;
        }

        .tm-index {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #9a8f86;
          font-variant-numeric: tabular-nums;
          padding-top: 4px;
        }

        .tm blockquote {
          margin: 0;
          flex-grow: 1;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          font-weight: 400;
          line-height: 1.55;
          color: #1d1d1d;
        }

        .tm figcaption {
          margin-top: 26px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tm-bar {
          display: block;
          width: 28px;
          height: 2px;
          background: var(--brand-orange);
          margin-bottom: 10px;
        }

        .tm figcaption strong {
          font-size: 16px;
          font-weight: 700;
          color: var(--brand-black);
        }

        .tm-role {
          font-size: 14px;
          color: #777777;
        }

        .tm-item:hover .tm-mark {
          transform: translateY(-4px) rotate(-4deg);
        }

        /* Prev and next controls */
        .tm-controls {
          display: flex;
          gap: 14px;
          margin-top: 8px;
        }

        .tm-btn {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          background: #ffffff;
          color: var(--brand-black);
          border: 2px solid var(--brand-black);
          border-radius: 50% 48% 52% 50% / 48% 52% 48% 52%;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .tm-btn:hover {
          background: var(--brand-orange);
          color: #ffffff;
          border-color: var(--brand-orange);
          transform: rotate(-4deg);
        }

        .tm-btn:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        .tm-btn svg {
          display: block;
        }

        @media (max-width: 640px) {
          .tm {
            padding: 80px 0;
          }

          .tm-header {
            margin-bottom: 40px;
          }

          .tm-item {
            padding: 30px 24px 8px;
          }

          .tm-list {
            gap: 16px;
            scroll-padding-left: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tm-mark,
          .tm-btn {
            transition: none;
          }

          .tm-item:hover .tm-mark,
          .tm-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}