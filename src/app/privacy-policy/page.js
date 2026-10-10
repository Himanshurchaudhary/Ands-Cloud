import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/*
  Privacy policy page, served at /privacy-policy.
  Server component, so the metadata and JSON-LD are present in the HTML for search engines.

  Before publishing:
  - This is a template for a company in India. Have a lawyer review it.
  - Confirm the retention periods in "How long we keep your data".
  - Confirm the statement "We do not sell personal data".
  - If you add analytics, ads, payment gateways or chat tools, update the cookies and third-party sections first.
  - Add a link to /privacy-policy in the site footer.
*/

const PAGE_PATH = "/privacy-policy";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const LAST_UPDATED = "2026-10-11";
const LAST_UPDATED_LABEL = "11 October 2026";
const CONTACT_EMAIL = "support@andscloud.com";
const CONTACT_PHONE = "+91 7563883929";
const CONTACT_PHONE_HREF = "+917563883929";
const LOCATION = "Patna, Bihar, India";
const DESCRIPTION = `Privacy policy for ${SITE_NAME}, based in Patna, Bihar. Learn what personal data we collect, how we use and protect it, and how to exercise your rights under India’s Digital Personal Data Protection Act, 2023.`;

export const metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  keywords: [
    "privacy policy",
    "data protection",
    "personal data",
    "DPDP Act 2023",
    SITE_NAME,
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: `Privacy Policy | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
};

const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    blocks: [
      {
        p: `${SITE_NAME} is a software development company based in ${LOCATION}. We build websites, mobile apps, cloud solutions and custom software for businesses.`,
      },
      {
        p: `For personal data collected through this website, ${SITE_NAME} is the data fiduciary. That means we decide why and how the data is processed. This policy covers our website and the enquiries, messages and job applications you send us through it.`,
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    blocks: [
      {
        p: "We collect only what we need to answer you, provide our services and keep the website running. Most of it you give us directly. Some of it is recorded automatically when you visit.",
      },
      {
        dl: [
          [
            "Contact form details",
            "Your name, email address, phone number, company name and message when you send an enquiry through our contact form.",
          ],
          [
            "Messages and calls",
            "Anything you share with us by email, phone or WhatsApp, including project requirements and files you send.",
          ],
          [
            "Job applications",
            "Your name, contact details, CV or resume, portfolio links and any other details you include when you apply for a role by email.",
          ],
          [
            "Technical data",
            "Basic information recorded when you visit, such as IP address, browser and device type, pages viewed and the time of your visit. We use it to keep the site secure and working.",
          ],
          [
            "Cookies",
            "Small files stored in your browser that help the site work. See the cookies section below.",
          ],
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    blocks: [
      {
        p: "We use personal data for the following purposes:",
      },
      {
        ul: [
          "Replying to your enquiries, sending proposals and answering support questions.",
          "Planning, scoping and delivering projects you ask us to work on.",
          "Reviewing job applications and contacting candidates about open roles.",
          "Keeping the website secure, preventing misuse and fixing technical problems.",
          "Meeting our legal, tax and accounting obligations.",
        ],
      },
      {
        p: "We will not use your personal data for a purpose you have not agreed to, unless the law allows or requires it.",
      },
    ],
  },
  {
    id: "consent",
    title: "Our legal basis and your consent",
    blocks: [
      {
        p: "We process your personal data on the basis of your consent. You give consent when you submit our contact form, email or message us, or apply for a job. Consent is given through a clear action and is limited to the purpose you agreed to.",
      },
      {
        p: `You can withdraw your consent at any time by emailing ${CONTACT_EMAIL}. Withdrawing consent does not affect processing we carried out before you withdrew it. It may mean we can no longer reply to your enquiry or consider your application.`,
      },
      {
        p: "Where the law permits or requires it, we may also process data to comply with legal obligations, to enforce our agreements, or to protect the security of our systems.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    blocks: [
      {
        p: "Our website uses only the cookies needed to run it. They help keep the site secure and remember basic settings during your visit. These cookies are needed for some pages to work properly.",
      },
      {
        p: "You can block or delete cookies in your browser settings. Doing so may affect how parts of the site work.",
      },
      {
        p: "If we add analytics, advertising or other non-essential cookies in future, we will update this policy first and ask for your consent wherever the law requires it.",
      },
    ],
  },
  {
    id: "third-party-services",
    title: "Service providers and third-party tools",
    blocks: [
      {
        p: "We rely on a small number of trusted providers to host the website and to communicate with you. They process data only to provide their services to us, under contracts that require them to protect it.",
      },
      {
        ul: [
          "Hosting and infrastructure providers, which store the website and its server logs.",
          "Email providers, which send and receive messages sent to our support and careers inboxes.",
          "WhatsApp, operated by Meta Platforms, Inc. If you message us on WhatsApp, that conversation is also governed by WhatsApp’s own privacy policy.",
        ],
      },
      {
        p: "Some providers may store data outside India. When they do, we choose providers that apply appropriate safeguards to protect your information.",
      },
    ],
  },
  {
    id: "sharing",
    title: "How we share information",
    blocks: [
      {
        p: "We do not sell personal data. We share it only when it is needed:",
      },
      {
        ul: [
          "With the service providers listed above, to run the site and communicate with you.",
          "With professional advisers such as lawyers, accountants or auditors, who are bound by confidentiality.",
          "When required by law, a court order or a competent government authority.",
          "With a buyer or successor if our business is merged, sold or reorganised, and only on terms that protect your data.",
        ],
      },
    ],
  },
  {
    id: "data-retention",
    title: "How long we keep your data",
    blocks: [
      {
        p: "We keep personal data only for as long as it is needed for the purpose it was collected for. As a guide:",
      },
      {
        ul: [
          "Contact enquiries: up to 2 years after our last exchange. If the enquiry becomes a project, we keep the records for the length of the project.",
          "Client project records: for the length of the engagement and the period required by law for accounting and tax purposes.",
          "Job applications: up to 12 months after we receive them, unless you ask us to delete them sooner.",
          "Server logs: typically up to 90 days.",
        ],
      },
      {
        p: "When these periods end, we delete or anonymise the data, unless the law requires us to keep it for longer.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    blocks: [
      {
        p: "Under the Digital Personal Data Protection Act, 2023, you have the right to:",
      },
      {
        ul: [
          "Ask for a summary of the personal data we hold about you and how we process it.",
          "Ask us to correct, complete or update inaccurate or incomplete data.",
          "Ask us to erase personal data that is no longer needed for the purpose it was collected for.",
          "Withdraw your consent at any time, as described above.",
          "Raise a grievance with us. If you are not satisfied with our response, you may complain to the Data Protection Board of India.",
          "Nominate another person to exercise your rights on your behalf if you are unable to do so.",
        ],
      },
      {
        p: `To use any of these rights, email ${CONTACT_EMAIL} with “Data request” in the subject line. We may ask you to confirm your identity before we act, so that we only share information with the right person. We aim to respond within 30 days.`,
      },
    ],
  },
  {
    id: "children",
    title: "Children’s privacy",
    blocks: [
      {
        p: "Our website and services are intended for businesses and adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has sent us personal information, contact us and we will delete it.",
      },
    ],
  },
  {
    id: "security",
    title: "How we protect your data",
    blocks: [
      {
        p: "We take reasonable steps to protect personal data from loss, misuse and unauthorised access. These include encrypting data in transit with HTTPS, limiting access to the people who need it, and keeping our software up to date.",
      },
      {
        p: "No method of transmission or storage is completely secure, so we cannot guarantee absolute security. If a breach affects your personal data, we will notify you and the authorities as the law requires.",
      },
    ],
  },
  {
    id: "external-links",
    title: "Links to other websites",
    blocks: [
      {
        p: "Our website may link to other websites, such as social media profiles or WhatsApp. Those sites have their own privacy practices, which we do not control. Please read their policies before you share information with them.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        p: "We may update this policy from time to time, for example when our services or the law change. Each update will show a new “last updated” date at the top of this page.",
      },
      {
        p: "If we make a significant change, we will make it clear on our website and, where possible, let you know by email. Please review this page from time to time.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact us and grievances",
    blocks: [
      {
        p: "For questions about this policy, to make a request about your data, or to raise a grievance, contact us using the details below:",
      },
      {
        contact: true,
      },
      {
        p: "Please include your name and the details of your request so we can find your records quickly.",
      },
    ],
  },
];

const summaryPoints = [
  "We collect the details you send us, plus basic technical data needed to run the site.",
  "We use your information to reply to you, plan the projects you ask for and review job applications.",
  "We do not sell your personal data.",
  "You can ask to see, correct or delete your data, or withdraw your consent, at any time.",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Privacy Policy",
      description: DESCRIPTION,
      inLanguage: "en-IN",
      dateModified: LAST_UPDATED,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE_HREF,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          addressCountry: "IN",
        },
      },
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Privacy Policy",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

// Escape "<" so the JSON cannot close the script tag early.
const jsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

function Block({ block }) {
  if (block.p) {
    return <p>{block.p}</p>;
  }

  if (block.ul) {
    return (
      <ul>
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.dl) {
    return (
      <dl className="pp-dl">
        {block.dl.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (block.contact) {
    return (
      <dl className="pp-contact">
        <div>
          <dt>Company</dt>
          <dd>{SITE_NAME}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE}</a>
          </dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{LOCATION}</dd>
        </div>
        <div>
          <dt>Data requests</dt>
          <dd>We aim to respond within 30 days.</dd>
        </div>
      </dl>
    );
  }

  return null;
}

export default function PrivacyPolicyPage() {
  return (
    <main className="pp-page">
      <style>{`
        .pp-page {
          --pp-ink: #111111;
          --pp-muted: #55514b;
          --pp-orange: var(--brand-orange, #f26b1d);
          --pp-cream: #fffaf5;
          --pp-display: "Helvetica Neue", Helvetica, Arial, sans-serif;
          --pp-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
          background: var(--pp-cream);
          color: var(--pp-ink);
          font-family: var(--pp-body);
          overflow-x: hidden;
          overflow-x: clip;
        }
        .pp-page *,
        .pp-page *::before,
        .pp-page *::after {
          box-sizing: border-box;
        }
        .pp-page h1,
        .pp-page h2,
        .pp-page h3 {
          font-family: var(--pp-display);
          font-weight: 900;
        }
        .pp-page a {
          color: var(--pp-ink);
          text-decoration: underline;
          text-decoration-color: var(--pp-orange);
          text-decoration-thickness: 2px;
          text-underline-offset: 3px;
        }
        .pp-page a:hover {
          text-decoration-thickness: 3px;
        }
        .pp-page a:focus-visible {
          outline: 3px solid var(--pp-orange);
          outline-offset: 3px;
        }

        .pp-wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 16px;
        }
        @media (min-width: 720px) {
          .pp-wrap {
            padding: 0 32px;
          }
        }

        .pp-crumbs {
          padding-top: 28px;
          font: 700 12px/1.4 var(--pp-display);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .pp-crumbs ol {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .pp-crumbs li + li::before {
          content: "/";
          margin-right: 8px;
          color: var(--pp-muted);
        }
        .pp-crumbs a {
          color: var(--pp-ink);
          text-decoration: none;
          border-bottom: 1.5px solid var(--pp-orange);
        }
        .pp-crumbs [aria-current="page"] {
          color: var(--pp-muted);
        }

        .pp-hero {
          padding: 40px 0 36px;
          border-bottom: 2px solid var(--pp-ink);
        }
        .pp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          font: 700 12px/1 var(--pp-display);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .pp-eyebrow::before {
          content: "";
          width: 10px;
          height: 10px;
          background: var(--pp-orange);
        }
        .pp-hero h1 {
          margin: 18px 0;
          font-size: clamp(2.4rem, 7vw, 4.4rem);
          line-height: 1.02;
          letter-spacing: -0.01em;
        }
        .pp-lead {
          margin: 0;
          max-width: 60ch;
          font-size: clamp(1.02rem, 1.6vw, 1.2rem);
          line-height: 1.7;
          color: var(--pp-muted);
        }
        .pp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 26px;
        }
        .pp-meta span {
          padding: 9px 12px;
          border: 1.5px solid var(--pp-ink);
          background: #ffffff;
          font: 700 12px/1 var(--pp-display);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .pp-summary {
          margin-top: 36px;
          padding: 24px;
          background: #ffffff;
          border: 2px solid var(--pp-ink);
          box-shadow: 7px 7px 0 var(--pp-orange);
        }
        .pp-summary h2 {
          margin: 0 0 12px;
          font-size: 1.35rem;
          line-height: 1.25;
        }
        .pp-summary ul {
          margin: 0;
          padding-left: 1.2em;
        }
        .pp-summary li {
          margin: 0 0 8px;
          line-height: 1.6;
        }
        .pp-summary li:last-child {
          margin-bottom: 0;
        }
        .pp-summary li::marker {
          color: var(--pp-orange);
        }

        .pp-layout {
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 56px;
          align-items: start;
          padding: 48px 0 72px;
        }
        .pp-toc {
          position: sticky;
          top: 96px;
          min-width: 0;
        }
        .pp-toc-title {
          margin: 0 0 12px;
          font: 700 12px/1 var(--pp-display);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .pp-toc ol {
          margin: 0;
          padding: 0;
          list-style: none;
          border-top: 2px solid var(--pp-ink);
        }
        .pp-toc a {
          display: grid;
          grid-template-columns: 30px minmax(0, 1fr);
          gap: 8px;
          padding: 9px 0;
          border-bottom: 1px solid rgba(17, 17, 17, 0.14);
          color: var(--pp-ink);
          text-decoration: none;
          font-size: 15px;
          line-height: 1.35;
        }
        .pp-toc a:hover {
          text-decoration: underline;
          text-decoration-color: var(--pp-orange);
          text-decoration-thickness: 2px;
          text-underline-offset: 3px;
        }
        .pp-toc-num {
          font: 700 12px/1.6 var(--pp-display);
          color: var(--pp-muted);
        }

        .pp-body {
          min-width: 0;
          max-width: 72ch;
        }
        .pp-section {
          scroll-margin-top: 96px;
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(17, 17, 17, 0.14);
        }
        .pp-section h2 {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin: 0 0 18px;
          font-size: clamp(1.45rem, 3vw, 1.8rem);
          line-height: 1.2;
        }
        .pp-num {
          flex: none;
          padding: 4px 7px;
          background: var(--pp-orange);
          color: var(--pp-ink);
          font: 700 12px/1.4 var(--pp-display);
          letter-spacing: 0.04em;
          transform: translateY(-2px);
        }
        .pp-body p {
          margin: 0 0 16px;
          font-size: 1.04rem;
          line-height: 1.75;
        }
        .pp-body ul {
          margin: 0 0 18px;
          padding-left: 1.3em;
        }
        .pp-body li {
          margin: 0 0 10px;
          font-size: 1.04rem;
          line-height: 1.7;
        }
        .pp-body li::marker {
          color: var(--pp-orange);
        }

        .pp-dl {
          margin: 22px 0 26px;
          border-top: 2px solid var(--pp-ink);
        }
        .pp-dl > div {
          display: grid;
          grid-template-columns: minmax(0, 210px) minmax(0, 1fr);
          gap: 18px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(17, 17, 17, 0.14);
        }
        .pp-dl dt {
          font: 700 13px/1.5 var(--pp-display);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .pp-dl dd {
          margin: 0;
          font-size: 1rem;
          line-height: 1.7;
        }

        .pp-contact {
          margin: 24px 0 24px;
          padding: 24px;
          background: #ffffff;
          border: 2px solid var(--pp-ink);
          box-shadow: 7px 7px 0 var(--pp-orange);
        }
        .pp-contact > div {
          display: grid;
          grid-template-columns: minmax(0, 150px) minmax(0, 1fr);
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px dashed rgba(17, 17, 17, 0.25);
        }
        .pp-contact > div:first-child {
          padding-top: 0;
        }
        .pp-contact > div:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }
        .pp-contact dt {
          font: 700 12px/1.6 var(--pp-display);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .pp-contact dd {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .pp-related {
          padding-top: 8px;
        }
        .pp-related h2 {
          margin: 0 0 16px;
          font-size: 1.4rem;
          line-height: 1.25;
        }
        .pp-related-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .pp-related-links a {
          display: inline-block;
          padding: 12px 18px;
          border: 2px solid var(--pp-ink);
          background: #ffffff;
          color: var(--pp-ink);
          font: 700 14px/1.2 var(--pp-display);
          letter-spacing: 0.02em;
          text-decoration: none;
        }
        .pp-related-links a:hover {
          background: var(--pp-orange);
        }

        @media (max-width: 900px) {
          .pp-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 32px;
            padding-top: 36px;
          }
          .pp-toc {
            position: static;
          }
        }

        @media (max-width: 720px) {
          .pp-crumbs {
            padding-top: 20px;
          }
          .pp-hero {
            padding: 28px 0;
          }
          .pp-hero h1 {
            margin: 14px 0;
          }
          .pp-summary {
            padding: 20px;
            box-shadow: 5px 5px 0 var(--pp-orange);
          }
          .pp-body p,
          .pp-body li {
            font-size: 1rem;
          }
          .pp-section {
            margin-bottom: 32px;
            padding-bottom: 32px;
          }
          .pp-dl > div,
          .pp-contact > div {
            grid-template-columns: minmax(0, 1fr);
            gap: 4px;
          }
          .pp-contact {
            padding: 18px;
            box-shadow: 5px 5px 0 var(--pp-orange);
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="pp-wrap">
        <nav className="pp-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">Privacy Policy</li>
          </ol>
        </nav>

        <header className="pp-hero">
          <p className="pp-eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="pp-lead">
            This policy explains what personal information {SITE_NAME} collects when
            you use our website, how we use and protect it, who we share it with,
            how long we keep it, and the choices and rights you have. It is written
            in plain language so you can follow it without a legal background.
          </p>
          <div className="pp-meta">
            <span>Last updated: {LAST_UPDATED_LABEL}</span>
            <span>Governing law: India</span>
          </div>
        </header>

        <section className="pp-summary" aria-labelledby="pp-summary-title">
          <h2 id="pp-summary-title">The short version</h2>
          <ul>
            {summaryPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
            <li>
              For any privacy question, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </li>
          </ul>
        </section>

        <div className="pp-layout">
          <nav className="pp-toc" aria-labelledby="pp-toc-title">
            <p id="pp-toc-title" className="pp-toc-title">
              On this page
            </p>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span className="pp-toc-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="pp-body">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="pp-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`}>
                  <span className="pp-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </section>
            ))}

            <section className="pp-related" aria-labelledby="pp-related-title">
              <h2 id="pp-related-title">Related pages</h2>
              <div className="pp-related-links">
                <Link href="/contact">Contact us</Link>
                <Link href="/services">Our services</Link>
                <Link href="/careers">Careers</Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}