// Services page: a detailed, search-friendly overview of every service.
// Server component (no "use client") so the metadata and structured data below are rendered for search engines.
// If this file lives at app/services/page.jsx, the canonical path below is correct. Otherwise update it.
import Link from "next/link";

export const metadata = {
  title: "Web, Mobile, Cloud and Custom Software Services",
  description:
    "Web development, Android and iOS apps, cloud hosting, custom software, AI automation and maintenance. See what each service includes and how we work.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Web, Mobile, Cloud and Custom Software Services",
    description:
      "Web development, Android and iOS apps, cloud hosting, custom software, AI automation and maintenance. See what each service includes and how we work.",
    url: "/services",
    type: "website",
  },
};

// Detailed service data. Edit the text here to match your real offerings.
const services = [
  {
    id: "web-development",
    title: "Web Development",
    summary:
      "We build fast, secure and search-friendly websites and web applications that turn visitors into customers.",
    details:
      "From a company website to a full web application with user accounts, dashboards and payments, we design and build every part of the product. We focus on clean code, a smooth user experience and performance, so your site loads quickly on mobile and desktop alike.",
    extra:
      "Every website we build is written to be found. Pages use clear headings, descriptive titles and optimized images, and each page gets its own meta description so search engines understand what it offers. We also set up the technical foundations that matter for SEO, including a sitemap, clean URLs and structured data, so your content has a real chance to rank for the services you sell.",
    deliverables: [
      "Responsive design for mobile, tablet and desktop",
      "SEO setup: meta tags, sitemap, structured data",
      "Admin panel and content management",
      "Contact forms, lead capture and analytics",
      "Performance optimization and accessibility checks",
    ],
    techStack: ["Next.js", "React", "Node.js", "MongoDB", "MySQL"],
    idealFor: "Businesses that need a professional website, online presence or a custom web platform.",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    summary:
      "Cross-platform Android and iOS apps from one codebase, built to be fast, reliable and easy to update.",
    details:
      "We build mobile apps with React Native and Expo, which lets one team deliver for both Android and iOS. We handle the full journey: requirement planning, UI design, development, testing on real devices, and publishing to the Google Play Store and Apple App Store.",
    extra:
      "A single codebase usually saves time and cost compared with building two separate native apps, and updates can reach your users quickly. Before submission we check store guidelines and prepare the listing details, such as the app name, description and screenshots, so your app is easier to find on the Play Store and App Store.",
    deliverables: [
      "Native-feel UI for Android and iOS",
      "User login, profiles and secure data handling",
      "Push notifications and in-app messaging",
      "Payment and order integration",
      "Play Store and App Store submission support",
    ],
    techStack: ["React Native", "Expo", "Node.js", "MongoDB", "Cloudinary"],
    idealFor: "Startups and businesses that want an app for customers, staff or delivery partners.",
  },
  {
    id: "cloud-hosting",
    title: "Cloud & Hosting",
    summary:
      "Reliable hosting, deployment and server setup so your product stays online, secure and ready to scale.",
    details:
      "We set up and manage the infrastructure behind your product. This includes choosing the right hosting, configuring domains and SSL, deploying frontend and backend services, and setting up automated deployments so every update goes live safely.",
    extra:
      "Hosting affects speed, uptime and search rankings, because search engines consider how quickly and reliably a site loads. We serve every page over HTTPS, configure caching and compression, and monitor uptime so problems are caught early instead of after customers notice.",
    deliverables: [
      "VPS and cloud server setup and hardening",
      "Domain, DNS and SSL certificate configuration",
      "CI/CD pipelines for automated deployment",
      "Database setup, backups and recovery plans",
      "Uptime monitoring and performance tracking",
    ],
    techStack: ["Vercel", "Hostinger", "AWS", "Nginx", "Docker", "GitHub Actions"],
    idealFor: "Teams that need dependable hosting or want to move an existing product to a better setup.",
  },
  {
    id: "custom-software-saas",
    title: "Custom Software & SaaS",
    summary:
      "Business software designed around how your team actually works, from clinic systems to billing and inventory.",
    details:
      "Off-the-shelf tools often do not fit real workflows. We build custom management systems with the features your business needs, such as patient records and billing for clinics, inventory and orders for shops, or subscription-based SaaS products for other businesses.",
    extra:
      "Custom software keeps your team in one place instead of juggling spreadsheets and disconnected tools. We design the database carefully from the start, which keeps reports accurate and makes it easier to add features later without rebuilding what already works.",
    deliverables: [
      "Role-based access for admins, staff and users",
      "Billing, invoices and payment tracking",
      "Reports, dashboards and data export",
      "Multi-branch or multi-tenant support",
      "Data migration from your existing records",
    ],
    techStack: ["React", "Node.js", "Express", "MySQL", "MongoDB", "jsPDF"],
    idealFor: "Clinics, retailers, service businesses and startups building a software product.",
  },
  {
    id: "ai-integration-automation",
    title: "AI Integration & Automation",
    summary:
      "Practical AI features and automated workflows that save time, reduce errors and improve customer experience.",
    details:
      "We add AI where it creates real value: chatbots that answer common customer questions, tools that summarize documents, automated follow-ups, and workflows that connect your apps together. We start with a clear use case and measure the result.",
    extra:
      "We usually begin with one measurable goal, such as cutting response time for common questions, and expand only once the results are clear. Each integration is designed with data privacy in mind, and when a question needs a person, the chat hands over to your team.",
    deliverables: [
      "AI chatbot for website or WhatsApp support",
      "Automated workflows between your tools",
      "Smart search and document summaries",
      "Integration with existing systems and APIs",
      "Usage guidelines and simple reporting",
    ],
    techStack: ["OpenAI API", "Node.js", "Webhooks", "Zapier", "REST APIs"],
    idealFor: "Businesses that want to automate repetitive work or offer faster customer support.",
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    summary:
      "Ongoing care for your website, app or software so it stays secure, fast and up to date after launch.",
    details:
      "Launching is only the beginning. We provide monthly support plans that cover updates, security patches, bug fixes and performance checks. You get a clear point of contact, quick response times and regular health reports so you always know the state of your product.",
    extra:
      "Search rankings depend on a site that stays fast, secure and up to date. Our plans keep dependencies current, fix broken pages and links, and review page speed on a schedule, so your site does not quietly lose visibility after launch.",
    deliverables: [
      "Regular dependency and security updates",
      "Bug fixes and performance tuning",
      "Content and minor feature changes",
      "Backup checks and uptime monitoring",
      "Monthly report with work done and recommendations",
    ],
    techStack: ["Monitoring tools", "Git", "Backups", "Logs and alerts"],
    idealFor: "Any business with a live product that needs reliable, ongoing technical care.",
  },
];

// Steps that every project follows
const process = [
  { step: "01", title: "Discovery", text: "We understand your goals, users and requirements." },
  { step: "02", title: "Design", text: "We plan the layout, user flow and features before coding." },
  { step: "03", title: "Development", text: "We build in small iterations and share progress with you." },
  { step: "04", title: "Testing", text: "We test on real devices and check performance and security." },
  { step: "05", title: "Launch", text: "We deploy, configure the domain and handle the go-live." },
  { step: "06", title: "Support", text: "We stay with you after launch with updates and improvements." },
];

// Common questions. Answers are also published as FAQ structured data below.
const faqs = [
  {
    q: "What services does your team offer?",
    a: "Web development, mobile app development for Android and iOS, cloud hosting and deployment, custom software and SaaS products, AI integration and automation, and ongoing maintenance and support.",
  },
  {
    q: "How long does a website or app project take?",
    a: "It depends on the scope. After the discovery stage we share a clear timeline with milestones, so you know what to expect before development starts.",
  },
  {
    q: "Do you help with SEO after the website is built?",
    a: "Yes. Our maintenance plans include regular checks for broken links, page speed and search console issues, and we can add new content pages as your business grows.",
  },
  {
    q: "Can you work with an existing website or app?",
    a: "Yes. We can audit your current product, fix performance and security issues, add new features, or move it to a better hosting setup.",
  },
  {
    q: "How do you handle pricing?",
    a: "Pricing depends on the features and scope. We share an estimate after discovery, so there are no surprises once development begins.",
  },
];

// Structured data helps search engines understand the services and FAQs
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Our services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

// Hand-drawn style tick used in the deliverables lists
function Tick() {
  return (
    <svg className="sp-tick" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M3 12.5 C6 14 7.5 17 9 20 C12 13 16 7 21 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <main className="sp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Page header */}
      <header className="sp-hero">
        <div className="sp-wrap">
          <p className="sp-kicker">Our Services</p>
          <h1>
            Complete digital solutions <span>for every stage of your business</span>
          </h1>
          <p className="sp-intro">
            From a simple website to a full business platform, we help you launch, run and grow your digital
            presence. We offer web development, mobile app development, cloud hosting, custom software, AI
            automation and ongoing maintenance, all under one team. Below you can see what each service includes,
            how we work and who it suits best.
          </p>

          {/* Jump links to each service */}
          <nav className="sp-index" aria-label="Services on this page">
            {services.map((service, index) => (
              <a href={`#${service.id}`} key={service.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {service.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Detailed services */}
      <div className="sp-wrap">
        {services.map((service, index) => (
          <section className="sp-service" id={service.id} key={service.id} aria-labelledby={`${service.id}-title`}>
            <p className="sp-label">Service {String(index + 1).padStart(2, "0")}</p>
            <h2 id={`${service.id}-title`}>{service.title}</h2>
            <p className="sp-lede">{service.summary}</p>

            <div className="sp-cols">
              <div className="sp-main">
                <p>{service.details}</p>
                <p>{service.extra}</p>
              </div>

              <aside className="sp-side">
                <h3>What you get</h3>
                <ul className="sp-checks">
                  {service.deliverables.map((item) => (
                    <li key={item}>
                      <Tick />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3>Built with</h3>
                <p className="sp-stack">{service.techStack.join(" · ")}</p>

                <h3>Best for</h3>
                <p className="sp-best">{service.idealFor}</p>
              </aside>
            </div>
          </section>
        ))}
      </div>

      {/* Process */}
      <section className="sp-process" aria-labelledby="process-title">
        <div className="sp-wrap">
          <p className="sp-label">How We Work</p>
          <h2 id="process-title">
            Our <span>step-by-step process</span>
          </h2>
          <ol className="sp-steps">
            {process.map((item) => (
              <li className="sp-step" key={item.step}>
                <span className="sp-step-no">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-faq" aria-labelledby="faq-title">
        <div className="sp-wrap">
          <p className="sp-label">FAQ</p>
          <h2 id="faq-title">Frequently asked questions</h2>
          <div className="sp-faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom call-to-action */}
      <section className="sp-end">
        <div className="sp-wrap sp-end-inner">
          <div>
            <h2>Not sure which service you need?</h2>
            <p>Tell us about your project and we will suggest the right approach and budget.</p>
          </div>
          <Link href="/contact" className="sp-link">
            Talk to our team <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Page styles. Every class is prefixed with sp- so it cannot clash with other sections */}
      <style>{`
        .sp {
          background: #ffffff;
          color: var(--brand-black);
        }

        .sp-wrap {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .sp-kicker,
        .sp-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--brand-orange);
          margin: 0;
        }

        .sp h1 {
          font-size: clamp(36px, 5.6vw, 64px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1.2px;
          margin: 18px 0 0;
          max-width: 900px;
        }

        .sp h1 span {
          color: var(--brand-orange);
        }

        .sp h2 {
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.8px;
          margin: 14px 0 0;
        }

        .sp h2 span {
          color: var(--brand-orange);
        }

        .sp h3 {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0 0 14px;
          color: var(--brand-black);
        }

        /* Hero */
        .sp-hero {
          padding: 120px 0 72px;
          border-bottom: 2px solid var(--brand-black);
        }

        .sp-intro {
          font-size: 18px;
          line-height: 1.7;
          color: #444444;
          max-width: 760px;
          margin: 24px 0 0;
        }

        /* Jump links: a numbered index, not a row of buttons */
        .sp-index {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          margin-top: 48px;
          border-top: 1px solid #dddddd;
        }

        .sp-index a {
          display: flex;
          align-items: baseline;
          gap: 14px;
          padding: 16px 16px 16px 0;
          border-bottom: 1px solid #dddddd;
          font-size: 16px;
          font-weight: 600;
          color: var(--brand-black);
          text-decoration: none;
        }

        .sp-index a span {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          color: var(--brand-orange);
        }

        .sp-index a:hover {
          color: var(--brand-orange);
        }

        /* Service sections */
        .sp-service {
          padding: 96px 0;
          border-bottom: 1px solid #e4e4e4;
          scroll-margin-top: 24px;
        }

        .sp-lede {
          font-size: 22px;
          font-weight: 500;
          line-height: 1.5;
          color: var(--brand-black);
          max-width: 860px;
          margin: 22px 0 0;
        }

        .sp-cols {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 72px;
          margin-top: 48px;
        }

        .sp-main p {
          font-size: 16px;
          line-height: 1.8;
          color: #444444;
          margin: 0 0 18px;
        }

        .sp-main p:last-child {
          margin-bottom: 0;
        }

        /* Side notes sit behind a thick ink rule */
        .sp-side {
          border-left: 2px solid var(--brand-black);
          padding-left: 32px;
        }

        .sp-side h3:not(:first-child) {
          margin-top: 36px;
        }

        .sp-checks {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sp-checks li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          line-height: 1.5;
          color: #333333;
        }

        .sp-tick {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--brand-orange);
        }

        .sp-stack {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 14px;
          line-height: 1.7;
          color: #333333;
          margin: 0;
        }

        .sp-best {
          font-size: 15px;
          line-height: 1.6;
          color: #444444;
          margin: 0;
        }

        /* Process: a ruled row of steps */
        .sp-process {
          padding: 110px 0;
          background: #f7f4ef;
        }

        .sp-steps {
          list-style: none;
          margin: 56px 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          border-top: 2px solid var(--brand-black);
        }

        .sp-step {
          padding: 26px 22px 0 0;
        }

        .sp-step-no {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          font-weight: 700;
          color: var(--brand-orange);
        }

        .sp-step h3 {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.2px;
          text-transform: none;
          margin: 12px 0 10px;
        }

        .sp-step p {
          font-size: 14px;
          line-height: 1.6;
          color: #555555;
          margin: 0;
        }

        /* FAQ: native details elements, so answers are available to crawlers and keyboards */
        .sp-faq {
          padding: 110px 0;
        }

        .sp-faq-list {
          margin-top: 40px;
          border-top: 1px solid #dddddd;
        }

        .sp-faq-list details {
          border-bottom: 1px solid #dddddd;
        }

        .sp-faq-list summary {
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

        .sp-faq-list summary::-webkit-details-marker {
          display: none;
        }

        .sp-faq-list summary::after {
          content: "+";
          font-size: 24px;
          font-weight: 400;
          color: var(--brand-orange);
          flex-shrink: 0;
        }

        .sp-faq-list details[open] summary::after {
          content: "\\2212";
        }

        .sp-faq-list details p {
          margin: 0;
          padding: 0 48px 24px 0;
          font-size: 16px;
          line-height: 1.7;
          color: #444444;
        }

        .sp-faq-list summary:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        /* Closing line */
        .sp-end {
          padding: 80px 0;
          border-top: 2px solid var(--brand-black);
        }

        .sp-end-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        .sp-end h2 {
          margin-top: 0;
        }

        .sp-end p {
          font-size: 17px;
          color: #444444;
          margin: 12px 0 0;
        }

        .sp-link {
          font-size: 18px;
          font-weight: 700;
          color: var(--brand-black);
          text-decoration: none;
          border-bottom: 3px solid var(--brand-orange);
          padding-bottom: 4px;
          white-space: nowrap;
        }

        .sp-link:hover {
          color: var(--brand-orange);
        }

        .sp-link:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        /* Tablet */
        @media (max-width: 1000px) {
          .sp-steps {
            grid-template-columns: repeat(3, 1fr);
            row-gap: 36px;
          }

          .sp-step {
            padding-right: 16px;
          }
        }

        /* Mobile */
        @media (max-width: 760px) {
          .sp-hero {
            padding: 88px 0 56px;
          }

          .sp-index {
            grid-template-columns: 1fr 1fr;
          }

          .sp-service {
            padding: 72px 0;
          }

          .sp-lede {
            font-size: 19px;
          }

          .sp-cols {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-top: 36px;
          }

          .sp-side {
            padding-left: 22px;
          }

          .sp-process,
          .sp-faq {
            padding: 80px 0;
          }

          .sp-steps {
            grid-template-columns: 1fr;
          }

          .sp-end {
            padding: 64px 0;
          }
        }
      `}</style>
    </main>
  );
}