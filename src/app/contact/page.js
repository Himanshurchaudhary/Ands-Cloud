import ContactForm from "@/components/sections/ContactForm/ContactForm";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Contact details. Replace these placeholders with your real ones before launch.
const CONTACT_EMAIL = "support@andscloud.com";
const CONTACT_PHONE = "+91 75638 83929";
const WHATSAPP_NUMBER = "917563883929";
const CITY = "PATNA";
const REGION = "BIHAR";
const COUNTRY = "IN";
const RESPONSE_TIME = "within one working day";

const pageTitle = "Contact Us for Web, Mobile and Software Projects";
const pageDescription =
  "Contact ANDS Cloud Tech Solutions for web development, mobile apps, cloud hosting and custom software. Send your project details and we reply quickly.";
const pageUrl = `${SITE_URL}/contact`;

const faqs = [
  {
    q: "How quickly will I get a reply?",
    a: `We reply ${RESPONSE_TIME}. For anything urgent, a phone call or WhatsApp message is usually the quickest route.`,
  },
  {
    q: "What should I include in my message?",
    a: "Your business goal, the main features you need, who will use the product and your rough timeline. Links to an existing website or app help us as well.",
  },
  {
    q: "Do I need a finished specification before I contact you?",
    a: "No. A rough idea is enough to start. We help shape the requirements during the discovery stage, before any development begins.",
  },
  {
    q: "Can you work on an existing website or app?",
    a: "Yes. Tell us the current technology, where it is hosted and the problem you want solved, and we will suggest the next steps.",
  },
];

// SEO metadata for the Contact page
export const metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "contact web development company",
    "hire mobile app developer",
    "cloud hosting services enquiry",
    "custom software development quote",
    "ANDS Cloud Tech Solutions contact",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
  },
};

// Small line icons for the contact channels
function Icon({ name }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };

  switch (name) {
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 19l1.3-3.9A8 8 0 1 1 8 18z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ContactPage() {
  // Structured data: the contact page, the business contact points and the FAQ
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: pageTitle,
        description: pageDescription,
        url: pageUrl,
        mainEntity: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          email: CONTACT_EMAIL,
          telephone: CONTACT_PHONE,
          address: {
            "@type": "PostalAddress",
            addressLocality: CITY,
            addressRegion: REGION,
            addressCountry: COUNTRY,
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              email: CONTACT_EMAIL,
              telephone: CONTACT_PHONE,
              areaServed: COUNTRY,
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Contact", item: pageUrl },
        ],
      },
    ],
  };

  const telHref = `tel:${CONTACT_PHONE.replace(/\s/g, "")}`;

  return (
    <main className="ct">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero: copy, contact channels and an animated paper plane */}
      <section className="ct-hero">
        <div className="ct-wrap ct-hero-grid">
          <div className="ct-hero-copy">
            <p className="ct-kicker">Contact</p>
            <h1>
              Let&apos;s talk about your <span>next project</span>
            </h1>
            <p className="ct-intro">
              Tell us what you are building, the goals behind it and your timeline. We reply {RESPONSE_TIME} with
              next steps, and you can reach us directly by phone or WhatsApp.
            </p>

            <ul className="ct-channels">
              <li>
                <span className="ct-channel-icon">
                  <Icon name="mail" />
                </span>
                <div>
                  <span className="ct-channel-label">Email</span>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </div>
              </li>
              <li>
                <span className="ct-channel-icon">
                  <Icon name="phone" />
                </span>
                <div>
                  <span className="ct-channel-label">Phone</span>
                  <a href={telHref}>{CONTACT_PHONE}</a>
                </div>
              </li>
              <li>
                <span className="ct-channel-icon">
                  <Icon name="chat" />
                </span>
                <div>
                  <span className="ct-channel-label">WhatsApp</span>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                    Chat with us
                  </a>
                </div>
              </li>
              <li>
                <span className="ct-channel-icon">
                  <Icon name="pin" />
                </span>
                <div>
                  <span className="ct-channel-label">Location</span>
                  <span className="ct-plain">
                    {CITY}, {REGION}, India
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Animation 1: a paper plane flies along a dotted route. Pure SVG, no JavaScript */}
          <div className="ct-visual" aria-hidden="true">
            <svg viewBox="0 0 420 300" className="ct-plane-svg" focusable="false">
              <path
                id="ct-route"
                d="M30 250 C110 40 240 290 390 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="2 9"
                strokeLinecap="round"
              />
              <circle cx="30" cy="250" r="7" className="ct-anchor" />
              <circle cx="390" cy="60" r="7" className="ct-anchor ct-anchor-end" />
              <g>
                <path d="M22 0 L-10 -10 L-4 0 L-10 10 Z" className="ct-plane" />
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#ct-route" />
                </animateMotion>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Form: the existing ContactForm, placed in a framed card */}
      <section className="ct-form-section" id="enquiry">
        <div className="ct-wrap ct-form-grid">
          <div className="ct-form-copy">
            <p className="ct-label">Project enquiry</p>
            <h2>
              Send us your <span>project details</span>
            </h2>
            <p className="ct-form-text">
              Share as much or as little as you know. A rough idea is enough to start a conversation, and we will
              help shape the details together.
            </p>
            <ul className="ct-prompts">
              <li>What do you want to build, and why?</li>
              <li>Who will use it, and on which devices?</li>
              <li>What is your rough timeline and budget range?</li>
            </ul>
          </div>

          <div className="ct-form-card">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Animation 2: a line draws itself across three steps, and each step's dot pulses in turn */}
      <section className="ct-steps" aria-labelledby="steps-title">
        <div className="ct-wrap">
          <p className="ct-label">What happens next</p>
          <h2 id="steps-title">
            From first message to <span>first call</span>
          </h2>

          <div className="ct-track">
            <svg viewBox="0 0 1000 2" preserveAspectRatio="none" className="ct-line" aria-hidden="true" focusable="false">
              <path
                d="M0 1 L1000 1"
                pathLength="1"
                fill="none"
                stroke="var(--brand-orange)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                className="ct-draw"
              />
            </svg>

            <ol className="ct-step-list">
              <li>
                <span className="ct-dot" aria-hidden="true" />
                <span className="ct-step-no">01</span>
                <h3>Share your brief</h3>
                <p>Fill in the form with your goals, the features you need and your timeline.</p>
              </li>
              <li>
                <span className="ct-dot" aria-hidden="true" />
                <span className="ct-step-no">02</span>
                <h3>We review and reply</h3>
                <p>Our team reviews your brief and replies {RESPONSE_TIME} with questions or next steps.</p>
              </li>
              <li>
                <span className="ct-dot" aria-hidden="true" />
                <span className="ct-step-no">03</span>
                <h3>Discovery call</h3>
                <p>We agree on scope, timeline and pricing before any development work begins.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ: native details elements, so answers are available to crawlers and keyboards */}
      <section className="ct-faq" aria-labelledby="faq-title">
        <div className="ct-wrap ct-faq-grid">
          <div className="ct-faq-copy">
            <p className="ct-label">Good to know</p>
            <h2 id="faq-title">
              Before you <span>reach out</span>
            </h2>
          </div>

          <div className="ct-faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Phone strip */}
      <section className="ct-strip">
        <div className="ct-wrap ct-strip-inner">
          <p>
            Prefer to talk it through? Call <a href={telHref}>{CONTACT_PHONE}</a>
          </p>
        </div>
      </section>

      {/* Page styles. Every class starts with "ct-" so it cannot clash with other pages */}
      <style>{`
        .ct {
          background: #ffffff;
          color: var(--brand-black);
          width: 100%;
          overflow-x: hidden;
          overflow-x: clip;
        }

        .ct *,
        .ct *::before,
        .ct *::after {
          box-sizing: border-box;
        }

        .ct-wrap {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .ct-kicker,
        .ct-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--brand-orange);
          margin: 0;
        }

        .ct h1 {
          font-size: clamp(34px, 6vw, 68px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -1.4px;
          margin: 18px 0 0;
          overflow-wrap: break-word;
        }

        .ct h1 span,
        .ct h2 span {
          color: var(--brand-orange);
        }

        .ct h2 {
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.9px;
          margin: 14px 0 0;
          overflow-wrap: break-word;
        }

        .ct h3 {
          color: var(--brand-black);
        }

        .ct p {
          overflow-wrap: break-word;
        }

        /* Grid children must be allowed to shrink, or long text pushes the page wider than the screen */
        .ct-hero-copy,
        .ct-visual,
        .ct-form-copy,
        .ct-form-card,
        .ct-faq-copy,
        .ct-faq-list,
        .ct-step-list li {
          min-width: 0;
        }

        /* Hero */
        .ct-hero {
          padding: 130px 0 96px;
          background-color: #fffaf5;
          background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1.2px);
          background-size: 22px 22px;
          border-bottom: 2px solid var(--brand-black);
        }

        .ct-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 64px;
          align-items: center;
        }

        .ct-intro {
          font-size: 18px;
          line-height: 1.7;
          color: #444444;
          max-width: 560px;
          margin: 24px 0 0;
        }

        .ct-channels {
          list-style: none;
          margin: 40px 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          border-top: 1px solid #e5ddd2;
        }

        .ct-channels li {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
          padding: 18px 16px 18px 0;
          border-bottom: 1px solid #e5ddd2;
        }

        .ct-channels li:nth-child(even) {
          padding-left: 20px;
          padding-right: 0;
          border-left: 1px solid #e5ddd2;
        }

        .ct-channel-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 1.5px solid var(--brand-black);
          border-radius: 50% 46% 52% 48% / 48% 52% 46% 54%;
          color: var(--brand-black);
          background: #ffffff;
        }

        .ct-channels li > div {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .ct-channel-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 1.1px;
          text-transform: uppercase;
          color: #888888;
        }

        .ct-channels a,
        .ct-plain {
          font-size: 15px;
          font-weight: 700;
          color: var(--brand-black);
          text-decoration: none;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .ct-channels a {
          border-bottom: 2px solid var(--brand-orange);
          align-self: flex-start;
        }

        .ct-channels a:hover {
          color: var(--brand-orange);
        }

        /* Animation 1 container */
        .ct-visual {
          position: relative;
          color: var(--brand-black);
          width: 100%;
        }

        .ct-plane-svg {
          width: 100%;
          height: auto;
          display: block;
          overflow: visible;
        }

        .ct-plane {
          fill: var(--brand-orange);
        }

        .ct-anchor {
          fill: var(--brand-black);
        }

        .ct-anchor-end {
          fill: #ffffff;
          stroke: var(--brand-black);
          stroke-width: 2.5;
          animation: ct-ping 2.4s ease-out infinite;
          transform-origin: 390px 60px;
          transform-box: view-box;
        }

        @keyframes ct-ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          70% {
            transform: scale(2.1);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        /* Form section */
        .ct-form-section {
          padding: 110px 0;
        }

        .ct-form-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
          gap: 64px;
          align-items: start;
        }

        .ct-form-copy {
          position: sticky;
          top: 110px;
        }

        .ct-form-text {
          font-size: 17px;
          line-height: 1.7;
          color: #444444;
          margin: 20px 0 0;
        }

        .ct-prompts {
          list-style: none;
          margin: 32px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ct-prompts li {
          position: relative;
          padding: 14px 0 14px 34px;
          border-top: 1px solid #e5ddd2;
          font-size: 15px;
          color: #333333;
        }

        .ct-prompts li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 22px;
          width: 18px;
          height: 2px;
          background: var(--brand-orange);
        }

        /* Framed card around the existing ContactForm. Keeps its contents inside the card on small screens */
        .ct-form-card {
          border: 2px solid var(--brand-black);
          border-radius: 4px;
          padding: 40px;
          background: #ffffff;
          box-shadow: 12px 12px 0 var(--brand-orange);
          width: 100%;
        }

        .ct-form-card * {
          max-width: 100%;
        }

        .ct-form-card input,
        .ct-form-card textarea,
        .ct-form-card select,
        .ct-form-card button {
          box-sizing: border-box;
        }

        /* Animation 2: steps */
        .ct-steps {
          padding: 110px 0;
          background: var(--brand-black);
          color: #ffffff;
        }

        .ct-steps .ct-label {
          color: var(--brand-orange);
        }

        .ct-steps h2 {
          color: #ffffff;
        }

        .ct-track {
          position: relative;
          margin-top: 64px;
        }

        .ct-line {
          position: absolute;
          top: 8px;
          left: 0;
          width: 100%;
          height: 2px;
          color: var(--brand-orange);
          overflow: visible;
        }

        .ct-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: ct-draw 2.8s ease-in-out 0.3s forwards;
        }

        @keyframes ct-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .ct-step-list {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 48px;
        }

        .ct-step-list li {
          padding-right: 24px;
          position: relative;
        }

        .ct-dot {
          display: block;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--brand-orange);
          box-shadow: 0 0 0 5px var(--brand-black), 0 0 0 6px var(--brand-orange);
          animation: ct-dot 2.4s ease-in-out infinite;
        }

        .ct-step-list li:nth-child(2) .ct-dot {
          animation-delay: 1s;
        }

        .ct-step-list li:nth-child(3) .ct-dot {
          animation-delay: 2s;
        }

        @keyframes ct-dot {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.35);
          }
        }

        .ct-step-no {
          display: block;
          margin-top: 26px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          font-weight: 700;
          color: var(--brand-orange);
        }

        .ct-step-list h3 {
          color: #ffffff;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.3px;
          margin: 10px 0 10px;
        }

        .ct-step-list p {
          font-size: 15px;
          line-height: 1.7;
          color: #bbbbbb;
          margin: 0;
        }

        /* FAQ */
        .ct-faq {
          padding: 110px 0;
        }

        .ct-faq-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
          gap: 64px;
          align-items: start;
        }

        .ct-faq-list {
          border-top: 1px solid #dddddd;
        }

        .ct-faq-list details {
          border-bottom: 1px solid #dddddd;
        }

        .ct-faq-list summary {
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          padding: 22px 0;
          font-size: 18px;
          font-weight: 700;
          color: var(--brand-black);
        }

        .ct-faq-list summary::-webkit-details-marker {
          display: none;
        }

        .ct-faq-list summary::after {
          content: "+";
          font-size: 24px;
          font-weight: 400;
          color: var(--brand-orange);
          flex-shrink: 0;
        }

        .ct-faq-list details[open] summary::after {
          content: "\\2212";
        }

        .ct-faq-list details p {
          margin: 0;
          padding: 0 48px 24px 0;
          font-size: 16px;
          line-height: 1.7;
          color: #444444;
        }

        .ct-faq-list summary:focus-visible,
        .ct-channels a:focus-visible,
        .ct-strip a:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        /* Phone strip */
        .ct-strip {
          padding: 40px 0;
          border-top: 2px solid var(--brand-black);
        }

        .ct-strip-inner p {
          margin: 0;
          font-size: 17px;
          color: #444444;
          text-align: center;
        }

        .ct-strip a {
          font-weight: 700;
          color: var(--brand-black);
          text-decoration: none;
          border-bottom: 2px solid var(--brand-orange);
          overflow-wrap: anywhere;
        }

        /* Tablet: stack the two-column layouts */
        @media (max-width: 960px) {
          .ct-hero-grid,
          .ct-form-grid,
          .ct-faq-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 48px;
          }

          .ct-form-copy {
            position: static;
          }

          .ct-visual {
            max-width: 520px;
            margin: 0 auto;
          }

          .ct-form-card {
            padding: 32px;
          }
        }

        /* Large phones and small tablets */
        @media (max-width: 720px) {
          .ct-wrap {
            padding: 0 20px;
          }

          .ct-hero {
            padding: 96px 0 64px;
          }

          .ct-intro {
            font-size: 17px;
          }

          .ct-channels {
            grid-template-columns: minmax(0, 1fr);
          }

          .ct-channels li:nth-child(even) {
            padding-left: 0;
            border-left: none;
          }

          .ct-form-section,
          .ct-faq,
          .ct-steps {
            padding: 72px 0;
          }

          .ct-form-card {
            padding: 24px 20px;
            box-shadow: 6px 6px 0 var(--brand-orange);
          }

          /* Prevents iOS from zooming in when a field is focused */
          .ct-form-card input,
          .ct-form-card textarea,
          .ct-form-card select {
            font-size: 16px;
          }

          .ct-faq-list summary {
            font-size: 17px;
            padding: 20px 0;
          }

          .ct-faq-list details p {
            padding-right: 0;
          }

          .ct-track {
            margin-top: 44px;
          }

          .ct-step-list {
            grid-template-columns: minmax(0, 1fr);
            gap: 36px;
          }

          .ct-line {
            display: none;
          }

          .ct-step-list li {
            padding: 0 0 0 36px;
            border-left: 2px solid var(--brand-orange);
            margin-left: 8px;
          }

          .ct-dot {
            position: absolute;
            left: -10px;
            top: 0;
          }

          .ct-step-no {
            margin-top: 0;
          }

          .ct-strip-inner p {
            font-size: 16px;
          }
        }

        /* Small phones (about 360px and below) */
        @media (max-width: 380px) {
          .ct-wrap {
            padding: 0 16px;
          }

          .ct h1 {
            font-size: 32px;
            letter-spacing: -1px;
          }

          .ct h2 {
            font-size: 26px;
          }

          .ct-channels li {
            gap: 12px;
            padding-top: 16px;
            padding-bottom: 16px;
          }

          .ct-channel-icon {
            width: 36px;
            height: 36px;
          }

          .ct-form-card {
            padding: 20px 16px;
            box-shadow: 4px 4px 0 var(--brand-orange);
          }

          .ct-prompts li {
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ct-draw {
            animation: none;
            stroke-dashoffset: 0;
          }

          .ct-dot,
          .ct-anchor-end {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}