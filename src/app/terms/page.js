import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/*
  Terms and conditions page, served at /terms-and-conditions.
  Server component, so the metadata and JSON-LD are present in the HTML for search engines.

  Before publishing:
  - This is a template for a company in India. Have a lawyer review it.
  - Confirm the liability cap (fees paid in the last 12 months, or INR 10,000 if none were paid).
  - Confirm the payment terms, GST wording, ownership and portfolio rules.
  - Add a link to /terms-and-conditions in the site footer, next to the privacy policy link.
*/

const PAGE_PATH = "/terms-and-conditions";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const LAST_UPDATED = "2026-10-11";
const LAST_UPDATED_LABEL = "11 October 2026";
const CONTACT_EMAIL = "support@andscloud.com";
const CONTACT_PHONE = "+91 7563883929";
const CONTACT_PHONE_HREF = "+917563883929";
const LOCATION = "Patna, Bihar, India";
const DESCRIPTION = `Terms and conditions for using the ${SITE_NAME} website and for our web, mobile, cloud and custom software services. Read the rules on enquiries, payments, intellectual property and liability.`;

export const metadata = {
  title: "Terms and Conditions",
  description: DESCRIPTION,
  keywords: [
    "terms and conditions",
    "terms of use",
    "website terms",
    "software development terms",
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
    title: `Terms and Conditions | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: `Terms and Conditions | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
};

const sections = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    blocks: [
      {
        p: `By accessing or using the ${SITE_NAME} website at ${SITE_URL}, sending an enquiry, or applying for a role, you agree to these Terms and Conditions and to our Privacy Policy. If you do not agree, please do not use the website.`,
      },
      {
        p: "These terms cover the website and the communication that happens before a project starts. Any services we deliver are governed by a written proposal, statement of work or agreement that both parties accept. If that agreement conflicts with these terms, the signed agreement applies to that project.",
      },
    ],
  },
  {
    id: "definitions",
    title: "Definitions",
    blocks: [
      {
        dl: [
          [
            "Website",
            `The website at ${SITE_URL} and all of its pages, including blog posts, project pages, the careers page and the contact form.`,
          ],
          [
            "Services",
            "Web development, mobile app development, cloud and hosting setup, custom software and related support that we offer.",
          ],
          [
            "We, us, our",
            `${SITE_NAME}, based in ${LOCATION}.`,
          ],
          [
            "You, your",
            "The person or organisation using the website or engaging our services.",
          ],
          [
            "Project agreement",
            "A written proposal, quotation, statement of work or contract that we and you accept for a specific project.",
          ],
        ],
      },
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    blocks: [
      {
        p: "You must be at least 18 years old, or have the legal authority to act for the business you represent, to use the website or to enter into a project agreement with us.",
      },
    ],
  },
  {
    id: "website-use",
    title: "Using the website",
    blocks: [
      {
        p: "You may browse the website, read its content and contact us for genuine business purposes. You agree not to:",
      },
      {
        ul: [
          "Use the website in any way that breaks a law or regulation that applies to you or to us.",
          "Attempt to gain unauthorised access to the website, our servers or any connected system, or interfere with how the site works.",
          "Upload or send malware, or anything designed to disrupt, damage or overload the site.",
          "Scrape, copy or collect content or data from the website in bulk without our written permission. Normal search engine indexing is allowed.",
          "Send spam or unsolicited messages through our contact form, email or WhatsApp.",
          "Pretend to be another person or business, or give false information in an enquiry or job application.",
        ],
      },
      {
        p: "We may suspend or restrict access to the website if we reasonably believe these rules have been broken.",
      },
    ],
  },
  {
    id: "enquiries",
    title: "Enquiries and proposals",
    blocks: [
      {
        p: "Sending an enquiry, requesting a quote or messaging us does not create a contract between us. A binding agreement exists only after we issue a proposal or quotation and both parties accept it in writing, or sign a project agreement.",
      },
      {
        p: "Estimates and timelines are based on the information you give us at the time. If your requirements change, we may revise the scope, timeline and price. We will tell you before we do any extra work.",
      },
    ],
  },
  {
    id: "fees-and-payment",
    title: "Fees and payment",
    blocks: [
      {
        p: "Fees, payment schedules and milestones are set out in each project agreement or invoice. Unless the agreement says otherwise:",
      },
      {
        ul: [
          "All prices are in Indian Rupees (INR) and exclude applicable taxes, including GST. Taxes are shown separately on invoices.",
          "Invoices are payable within the period stated on the invoice. We may pause work if an invoice stays unpaid beyond that period.",
          "We may ask for an advance before work starts or before each milestone.",
          "Bank charges, payment gateway fees and currency conversion costs, where they apply, are paid by the party making the payment.",
        ],
      },
      {
        p: "Refunds, if any, are governed by the project agreement. Payments for work that has already been completed are generally non-refundable.",
      },
    ],
  },
  {
    id: "project-delivery",
    title: "Project delivery",
    blocks: [
      {
        p: "We will deliver the services with reasonable skill and care, in line with the agreed scope. Timelines depend on your timely feedback, content, access to systems and approvals. Delays caused by you may extend the timeline. We will tell you about any risk to the timeline as early as we can.",
      },
      {
        p: "Work outside the agreed scope is a change request. We will quote for it separately and start only after you approve it in writing.",
      },
    ],
  },
  {
    id: "client-responsibilities",
    title: "Your responsibilities",
    blocks: [
      {
        p: "To help us deliver your project, you agree to:",
      },
      {
        ul: [
          "Provide accurate information, content, images and materials that you have the right to use.",
          "Respond to requests for feedback and approvals promptly.",
          "Keep your login details, API keys and account credentials secure. We are not responsible for losses caused by credentials you share with others.",
          "Make and keep your own backups of important data and content.",
          "Make sure your use of the final product complies with the law and with the rights of third parties.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    blocks: [
      {
        p: `The website, including its design, text, graphics, logos, code and blog posts, is owned by ${SITE_NAME} or its licensors and is protected by copyright and trademark law. You may view and print pages for your own personal or business reference. You may not copy, modify or republish them without our written permission.`,
      },
      {
        p: "Ownership of custom work for a client is set out in the project agreement. Unless the agreement says otherwise, ownership of custom deliverables passes to the client once all fees for that work are paid in full. Pre-existing tools, libraries, frameworks and reusable components stay with us or their owners. We grant you a licence to use them as part of the deliverables. Open-source components remain subject to their own licences.",
      },
      {
        p: "We may show completed work in our portfolio, case studies and marketing material, but only with your permission or as agreed in writing. Tell us if a project must stay confidential.",
      },
    ],
  },
  {
    id: "your-content",
    title: "Content you send us",
    blocks: [
      {
        p: "Content you send us through the contact form, email or WhatsApp remains yours. You give us a limited right to read, store and use it to reply to you and to deliver the project you ask for. We will not use your content for any other purpose without your consent.",
      },
    ],
  },
  {
    id: "careers",
    title: "Job applications",
    blocks: [
      {
        p: "We review job applications on their merits. Sending an application does not create an employment relationship, and we are not obliged to offer a role. How we handle application data is described in our Privacy Policy.",
      },
    ],
  },
  {
    id: "third-party",
    title: "Third-party links and services",
    blocks: [
      {
        p: "The website may link to or rely on third-party services, including WhatsApp, hosting providers and social media platforms. We do not control those services and are not responsible for their content, availability or practices. Your use of them is subject to their own terms and privacy policies.",
      },
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    blocks: [
      {
        p: "The website and its content are provided on an “as is” and “as available” basis. We aim to keep the website accurate and available, but we do not guarantee that it will always be error-free, uninterrupted or free from viruses.",
      },
      {
        p: "Blog posts and other informational content are for general guidance only. They are not legal, financial, tax or other professional advice. Please get advice specific to your situation before you act on them.",
      },
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    blocks: [
      {
        p: "To the maximum extent permitted by law, we are not liable for any indirect, incidental, special or consequential loss. This includes loss of profit, data, business or goodwill arising from your use of the website or from our services.",
      },
      {
        p: "For any claim relating to a project, our total liability is limited to the fees you actually paid us for that project in the 12 months before the claim arose. Where no fees were paid, our total liability is limited to INR 10,000.",
      },
      {
        p: "Nothing in these terms limits any liability that cannot be limited under Indian law, including liability for fraud.",
      },
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    blocks: [
      {
        p: "To the extent the law allows, you agree to indemnify us against claims that arise from your breach of these terms, from content you provide, or from your misuse of the website.",
      },
    ],
  },
  {
    id: "termination",
    title: "Suspension and termination",
    blocks: [
      {
        p: "You may stop using the website at any time. We may suspend or end your access to the website if you break these terms.",
      },
      {
        p: "Ending a project is governed by the project agreement. When a project ends, you must pay for the work completed up to that date. We will hand over completed deliverables for which payment has been made.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    blocks: [
      {
        p: "These terms are governed by the laws of India. If a dispute arises, we will first try to resolve it through good-faith discussion. If that does not work, the courts at Patna, Bihar, will have jurisdiction, subject to any rights you have under applicable law that cannot be waived.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    blocks: [
      {
        p: "We may update these terms from time to time. The “last updated” date at the top of this page shows when they last changed. Continuing to use the website after a change means you accept the updated terms.",
      },
      {
        p: "Changes do not affect a project agreement that has already been signed, unless both parties agree to the change in writing.",
      },
    ],
  },
  {
    id: "general",
    title: "General",
    blocks: [
      {
        p: "If any part of these terms is found to be unenforceable, the rest remains in effect. Our failure to enforce a right is not a waiver of that right.",
      },
      {
        p: "These terms, together with the Privacy Policy and any project agreement, form the whole agreement between you and us about the website. Neither party may transfer its rights under these terms without the other party’s written consent, except to a successor of its business.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    blocks: [
      {
        p: "For questions about these terms, or to discuss a project, contact us using the details below:",
      },
      {
        contact: true,
      },
      {
        p: "For a question about your personal data, please see our Privacy Policy.",
      },
    ],
  },
];

const summaryPoints = [
  "Browsing the website is free and is subject to these rules.",
  "An enquiry or quote does not bind either side until a written proposal or agreement is accepted.",
  "Fees, timelines and ownership of final work are set in each project agreement.",
  "Please do not misuse the website or send spam through our forms.",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Terms and Conditions",
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
          name: "Terms and Conditions",
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
      <dl className="tc-dl">
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
      <dl className="tc-contact">
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
      </dl>
    );
  }

  return null;
}

export default function TermsConditionsPage() {
  return (
    <main className="tc-page">
      <style>{`
        .tc-page {
          --tc-ink: #111111;
          --tc-muted: #55514b;
          --tc-orange: var(--brand-orange, #f26b1d);
          --tc-cream: #fffaf5;
          --tc-font: "Helvetica Neue", Helvetica, Arial, sans-serif;
          background: var(--tc-cream);
          color: var(--tc-ink);
          font-family: var(--tc-font);
          font-weight: 400;
          overflow-x: hidden;
          overflow-x: clip;
        }
        .tc-page *,
        .tc-page *::before,
        .tc-page *::after {
          box-sizing: border-box;
        }
        .tc-page h1,
        .tc-page h2,
        .tc-page h3 {
          font-family: var(--tc-font);
          font-weight: 900;
        }
        .tc-page a {
          color: var(--tc-ink);
          text-decoration: underline;
          text-decoration-color: var(--tc-orange);
          text-decoration-thickness: 2px;
          text-underline-offset: 3px;
        }
        .tc-page a:hover {
          text-decoration-thickness: 3px;
        }
        .tc-page a:focus-visible {
          outline: 3px solid var(--tc-orange);
          outline-offset: 3px;
        }

        .tc-wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 16px;
        }
        @media (min-width: 720px) {
          .tc-wrap {
            padding: 0 32px;
          }
        }

        .tc-crumbs {
          padding-top: 28px;
          font: 700 12px/1.4 var(--tc-font);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .tc-crumbs ol {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .tc-crumbs li + li::before {
          content: "/";
          margin-right: 8px;
          color: var(--tc-muted);
        }
        .tc-crumbs a {
          color: var(--tc-ink);
          text-decoration: none;
          border-bottom: 1.5px solid var(--tc-orange);
        }
        .tc-crumbs [aria-current="page"] {
          color: var(--tc-muted);
        }

        .tc-hero {
          padding: 40px 0 36px;
          border-bottom: 2px solid var(--tc-ink);
        }
        .tc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          font: 700 12px/1 var(--tc-font);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .tc-eyebrow::before {
          content: "";
          width: 10px;
          height: 10px;
          background: var(--tc-orange);
        }
        .tc-hero h1 {
          margin: 18px 0;
          font-size: clamp(2.4rem, 7vw, 4.4rem);
          line-height: 1.02;
          letter-spacing: -0.01em;
        }
        .tc-lead {
          margin: 0;
          max-width: 60ch;
          font-size: clamp(1.02rem, 1.6vw, 1.2rem);
          line-height: 1.7;
          color: var(--tc-muted);
        }
        .tc-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 26px;
        }
        .tc-meta span {
          padding: 9px 12px;
          border: 1.5px solid var(--tc-ink);
          background: #ffffff;
          font: 700 12px/1 var(--tc-font);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .tc-summary {
          margin-top: 36px;
          padding: 24px;
          background: #ffffff;
          border: 2px solid var(--tc-ink);
          box-shadow: 7px 7px 0 var(--tc-orange);
        }
        .tc-summary h2 {
          margin: 0 0 12px;
          font-size: 1.35rem;
          line-height: 1.25;
        }
        .tc-summary ul {
          margin: 0;
          padding-left: 1.2em;
        }
        .tc-summary li {
          margin: 0 0 8px;
          line-height: 1.6;
        }
        .tc-summary li:last-child {
          margin-bottom: 0;
        }
        .tc-summary li::marker {
          color: var(--tc-orange);
        }

        .tc-layout {
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 56px;
          align-items: start;
          padding: 48px 0 72px;
        }
        .tc-toc {
          position: sticky;
          top: 96px;
          min-width: 0;
        }
        .tc-toc-title {
          margin: 0 0 12px;
          font: 700 12px/1 var(--tc-font);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .tc-toc ol {
          margin: 0;
          padding: 0;
          list-style: none;
          border-top: 2px solid var(--tc-ink);
        }
        .tc-toc a {
          display: grid;
          grid-template-columns: 30px minmax(0, 1fr);
          gap: 8px;
          padding: 9px 0;
          border-bottom: 1px solid rgba(17, 17, 17, 0.14);
          color: var(--tc-ink);
          text-decoration: none;
          font-size: 15px;
          line-height: 1.35;
        }
        .tc-toc a:hover {
          text-decoration: underline;
          text-decoration-color: var(--tc-orange);
          text-decoration-thickness: 2px;
          text-underline-offset: 3px;
        }
        .tc-toc-num {
          font: 700 12px/1.6 var(--tc-font);
          color: var(--tc-muted);
        }

        .tc-body {
          min-width: 0;
          max-width: 72ch;
        }
        .tc-section {
          scroll-margin-top: 96px;
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(17, 17, 17, 0.14);
        }
        .tc-section h2 {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin: 0 0 18px;
          font-size: clamp(1.45rem, 3vw, 1.8rem);
          line-height: 1.2;
        }
        .tc-num {
          flex: none;
          padding: 4px 7px;
          background: var(--tc-orange);
          color: var(--tc-ink);
          font: 700 12px/1.4 var(--tc-font);
          letter-spacing: 0.04em;
          transform: translateY(-2px);
        }
        .tc-body p {
          margin: 0 0 16px;
          font-size: 1.04rem;
          line-height: 1.75;
        }
        .tc-body ul {
          margin: 0 0 18px;
          padding-left: 1.3em;
        }
        .tc-body li {
          margin: 0 0 10px;
          font-size: 1.04rem;
          line-height: 1.7;
        }
        .tc-body li::marker {
          color: var(--tc-orange);
        }

        .tc-dl {
          margin: 22px 0 26px;
          border-top: 2px solid var(--tc-ink);
        }
        .tc-dl > div {
          display: grid;
          grid-template-columns: minmax(0, 210px) minmax(0, 1fr);
          gap: 18px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(17, 17, 17, 0.14);
        }
        .tc-dl dt {
          font: 700 13px/1.5 var(--tc-font);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .tc-dl dd {
          margin: 0;
          font-size: 1rem;
          line-height: 1.7;
        }

        .tc-contact {
          margin: 24px 0 24px;
          padding: 24px;
          background: #ffffff;
          border: 2px solid var(--tc-ink);
          box-shadow: 7px 7px 0 var(--tc-orange);
        }
        .tc-contact > div {
          display: grid;
          grid-template-columns: minmax(0, 150px) minmax(0, 1fr);
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px dashed rgba(17, 17, 17, 0.25);
        }
        .tc-contact > div:first-child {
          padding-top: 0;
        }
        .tc-contact > div:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }
        .tc-contact dt {
          font: 700 12px/1.6 var(--tc-font);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .tc-contact dd {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .tc-related {
          padding-top: 8px;
        }
        .tc-related h2 {
          margin: 0 0 16px;
          font-size: 1.4rem;
          line-height: 1.25;
        }
        .tc-related-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .tc-related-links a {
          display: inline-block;
          padding: 12px 18px;
          border: 2px solid var(--tc-ink);
          background: #ffffff;
          color: var(--tc-ink);
          font: 700 14px/1.2 var(--tc-font);
          letter-spacing: 0.02em;
          text-decoration: none;
        }
        .tc-related-links a:hover {
          background: var(--tc-orange);
        }

        @media (max-width: 900px) {
          .tc-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 32px;
            padding-top: 36px;
          }
          .tc-toc {
            position: static;
          }
        }

        @media (max-width: 720px) {
          .tc-crumbs {
            padding-top: 20px;
          }
          .tc-hero {
            padding: 28px 0;
          }
          .tc-hero h1 {
            margin: 14px 0;
          }
          .tc-summary {
            padding: 20px;
            box-shadow: 5px 5px 0 var(--tc-orange);
          }
          .tc-body p,
          .tc-body li {
            font-size: 1rem;
          }
          .tc-section {
            margin-bottom: 32px;
            padding-bottom: 32px;
          }
          .tc-dl > div,
          .tc-contact > div {
            grid-template-columns: minmax(0, 1fr);
            gap: 4px;
          }
          .tc-contact {
            padding: 18px;
            box-shadow: 5px 5px 0 var(--tc-orange);
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="tc-wrap">
        <nav className="tc-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">Terms and Conditions</li>
          </ol>
        </nav>

        <header className="tc-hero">
          <p className="tc-eyebrow">Legal</p>
          <h1>Terms and Conditions</h1>
          <p className="tc-lead">
            These terms set out the rules for using our website and for working
            with {SITE_NAME}. Please read them carefully before you send an enquiry,
            apply for a role or start a project with us.
          </p>
          <div className="tc-meta">
            <span>Last updated: {LAST_UPDATED_LABEL}</span>
            <span>Governing law: India</span>
          </div>
        </header>

        <section className="tc-summary" aria-labelledby="tc-summary-title">
          <h2 id="tc-summary-title">The short version</h2>
          <ul>
            {summaryPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
            <li>
              For any question about these terms, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </li>
          </ul>
        </section>

        <div className="tc-layout">
          <nav className="tc-toc" aria-labelledby="tc-toc-title">
            <p id="tc-toc-title" className="tc-toc-title">
              On this page
            </p>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span className="tc-toc-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="tc-body">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="tc-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`}>
                  <span className="tc-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </section>
            ))}

            <section className="tc-related" aria-labelledby="tc-related-title">
              <h2 id="tc-related-title">Related pages</h2>
              <div className="tc-related-links">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/contact">Contact us</Link>
                <Link href="/services">Our services</Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}