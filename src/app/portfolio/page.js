import Link from "next/link";
import { projects, categories } from "@/lib/projects";

// Site-wide values. Set NEXT_PUBLIC_SITE_URL in .env.local to your real domain before launch.
const SITE_NAME = "ANDS Cloud Tech Solutions";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const PAGE_PATH = "/portfolio";

const pageTitle = "Portfolio of Web, Mobile and Business Software Projects";
const pageDescription =
  "Explore web platforms, mobile apps and business software built by ANDS Cloud Tech Solutions. Browse case studies with features and technologies used.";

// Count how many projects belong to a category ("All" means every project)
function countFor(category) {
  return category === "All" ? projects.length : projects.filter((p) => p.category === category).length;
}

function pad(number) {
  return String(number).padStart(2, "0");
}

// Filtered views get their own title, description and canonical URL so each can rank on its own
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const active = categories.includes(params?.category) ? params.category : "All";

  if (active === "All") {
    return {
      title: pageTitle,
      description: pageDescription,
      alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
      openGraph: {
        title: `${pageTitle} | ${SITE_NAME}`,
        description: pageDescription,
        url: `${SITE_URL}${PAGE_PATH}`,
        siteName: SITE_NAME,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${pageTitle} | ${SITE_NAME}`,
        description: pageDescription,
      },
    };
  }

  const count = countFor(active);
  const title = `${active} Projects`;
  const description = `${count} ${active.toLowerCase()} ${count === 1 ? "project" : "projects"} by ${SITE_NAME}, with the features delivered and technologies used in each case study.`;
  const url = `${SITE_URL}${PAGE_PATH}?category=${encodeURIComponent(active)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

// Questions shown at the bottom. The same answers are published as FAQ structured data.
const faqs = [
  {
    q: "Can I see the live version of these projects?",
    a: "Where a project is publicly available, its case study links to the live site. Some projects are private for client or business reasons, and we are happy to walk you through their features on a call.",
  },
  {
    q: "Which technologies do you use most often?",
    a: "Our main stack is React, Next.js, React Native with Expo, Node.js and Express, with MongoDB and MySQL for data. We add cloud services, payment gateways and AI APIs when a project needs them.",
  },
  {
    q: "Do you take on work for an existing website or app?",
    a: "Yes. We can review an existing product, fix performance, security and SEO issues, add new features or move it to a better hosting setup.",
  },
  {
    q: "How do I start a project with you?",
    a: "Use the Start Your Project button on this page or the contact page. We begin with a short discovery conversation, then share a plan with timeline and pricing.",
  },
];

export default async function PortfolioPage({ searchParams }) {
  const params = await searchParams;
  const active = categories.includes(params?.category) ? params.category : "All";

  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  // Structured data: the portfolio as a collection, plus the FAQ
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: pageTitle,
        description: pageDescription,
        url: `${SITE_URL}${PAGE_PATH}`,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "ItemList",
        name: active === "All" ? pageTitle : `${active} Projects`,
        numberOfItems: visible.length,
        itemListElement: visible.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          url: `${SITE_URL}/portfolio/${project.slug}`,
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

  return (
    <main className="pf">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Page header */}
      <header className="pf-hero">
        <div className="pf-wrap">
          <p className="pf-kicker">Our Work</p>
          <h1>
            Projects we are <span>proud of</span>
          </h1>
          <p className="pf-intro">
            A selection of web platforms, mobile apps and business software we have designed, built and launched.
            Each project below links to a case study that explains the problem, the features we delivered and the
            technologies behind the solution.
          </p>
          <p className="pf-count">
            <strong>{pad(projects.length)}</strong> projects in this portfolio
          </p>
        </div>
      </header>

      {/* Category filters: plain links, so each filter has its own indexable URL */}
      <nav className="pf-filters-wrap" aria-label="Filter projects by category">
        <div className="pf-wrap">
          <p className="pf-label">Browse by category</p>
          <div className="pf-filters">
            {categories.map((category) => {
              const href =
                category === "All" ? PAGE_PATH : `${PAGE_PATH}?category=${encodeURIComponent(category)}`;
              const isActive = active === category;
              return (
                <Link
                  key={category}
                  href={href}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={isActive ? "pf-filter pf-filter-active" : "pf-filter"}
                >
                  {category}
                  <span className="pf-filter-count">{countFor(category)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Case studies */}
      <section className="pf-projects" aria-labelledby="case-studies-title">
        <div className="pf-wrap">
          <div className="pf-section-head">
            <h2 id="case-studies-title">
              {active === "All" ? "All case studies" : `${active} case studies`}
            </h2>
            <p>
              Showing {pad(visible.length)} {visible.length === 1 ? "project" : "projects"}
            </p>
          </div>

          {visible.length > 0 ? (
            <div className="pf-grid">
              {visible.map((project, index) => (
                <Link href={`/portfolio/${project.slug}`} className="pf-card" key={project.slug}>
                  <div className="pf-card-top">
                    <span className="pf-no">{pad(index + 1)}</span>
                    <span className="pf-cat">{project.category}</span>
                    <span className="pf-year">{project.year}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul className="pf-tech" aria-label="Technologies used">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <span className="pf-more">
                    Read case study <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="pf-empty">No projects in this category yet. Browse all case studies above.</p>
          )}
        </div>
      </section>

      {/* Editorial content: what the portfolio covers */}
      <section className="pf-about" aria-labelledby="covers-title">
        <div className="pf-wrap pf-about-inner">
          <div className="pf-about-head">
            <p className="pf-label">About the work</p>
            <h2 id="covers-title">What our portfolio covers</h2>
          </div>

          <div className="pf-about-body">
            <div className="pf-block">
              <h3>Web platforms</h3>
              <p>
                Our web work ranges from company websites that present a brand clearly to full web platforms with
                user accounts, dashboards, admin panels and online payments. We build with React and Next.js for fast,
                search-friendly pages, and pair them with Node.js and databases such as MongoDB and MySQL on the
                backend. Every site is set up with proper meta tags, a sitemap and structured data, because a
                well-built website is only useful when people can find it.
              </p>
            </div>

            <div className="pf-block">
              <h3>Mobile apps</h3>
              <p>
                We build Android and iOS apps from a single React Native and Expo codebase, which lets one team deliver
                for both platforms. Our apps cover login, profiles, secure data handling, push notifications and order
                or payment flows. We test on real devices and help prepare the Play Store and App Store submission so
                the app goes live without avoidable delays.
              </p>
            </div>

            <div className="pf-block">
              <h3>Business software</h3>
              <p>
                Custom software is the right choice when off-the-shelf tools do not match how a business works. Our
                projects include management systems for clinics, with patient records and billing, and product
                platforms built on subscription models. These systems focus on role-based access, invoices, reports and
                clean data structures, so growing teams can rely on accurate information every day.
              </p>
            </div>

            <div className="pf-block">
              <h3>From idea to launch</h3>
              <p>
                Each case study follows the same path we use for client work: discovery, design, iterative
                development, testing on real devices and a planned launch. Our{" "}
                <Link href="/services">services page</Link> explains each step in more detail, and you can{" "}
                <Link href="/contact">contact us</Link> to start a project of your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pf-faq" aria-labelledby="faq-title">
        <div className="pf-wrap">
          <p className="pf-label">FAQ</p>
          <h2 id="faq-title">Portfolio questions</h2>
          <div className="pf-faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call-to-action */}
      <section className="pf-end">
        <div className="pf-wrap pf-end-inner">
          <div>
            <h2>Have a project in mind?</h2>
            <p>Let us build something similar for your business.</p>
          </div>
          <div className="pf-end-actions">
            <Link href="/contact" className="pf-btn">
              Start Your Project
            </Link>
            <Link href="/services" className="pf-link">
              Explore our services <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Page styles. Every class starts with "pf-" so it cannot clash with other pages */}
      <style>{`
        .pf {
          background: #ffffff;
          color: var(--brand-black);
        }

        .pf-wrap {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .pf-kicker,
        .pf-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--brand-orange);
          margin: 0;
        }

        .pf h1 {
          font-size: clamp(36px, 5.6vw, 64px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -1.2px;
          margin: 18px 0 0;
          max-width: 900px;
        }

        .pf h1 span {
          color: var(--brand-orange);
        }

        .pf h2 {
          font-size: clamp(28px, 3.8vw, 42px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.8px;
          margin: 14px 0 0;
        }

        .pf h3 {
          color: var(--brand-black);
        }

        /* Hero */
        .pf-hero {
          padding: 120px 0 64px;
          border-bottom: 2px solid var(--brand-black);
        }

        .pf-intro {
          font-size: 18px;
          line-height: 1.7;
          color: #444444;
          max-width: 740px;
          margin: 24px 0 0;
        }

        .pf-count {
          margin: 32px 0 0;
          font-size: 15px;
          color: #666666;
        }

        .pf-count strong {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 22px;
          color: var(--brand-orange);
          margin-right: 6px;
        }

        /* Filters */
        .pf-filters-wrap {
          padding: 40px 0;
          border-bottom: 1px solid #e4e4e4;
        }

        .pf-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .pf-filter {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border: 1.5px solid var(--brand-black);
          border-radius: 4px;
          font-size: 15px;
          font-weight: 600;
          color: var(--brand-black);
          text-decoration: none;
          background: #ffffff;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .pf-filter-count {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          padding: 2px 7px;
          border-radius: 3px;
          background: #f2ede6;
          color: #555555;
        }

        .pf-filter:hover {
          border-color: var(--brand-orange);
          color: var(--brand-orange);
        }

        .pf-filter-active,
        .pf-filter-active:hover {
          background: var(--brand-black);
          border-color: var(--brand-black);
          color: #ffffff;
        }

        .pf-filter-active .pf-filter-count {
          background: var(--brand-orange);
          color: #ffffff;
        }

        .pf-filter:focus-visible,
        .pf-link:focus-visible,
        .pf-btn:focus-visible,
        .pf-card:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        /* Section heading */
        .pf-section-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 40px;
        }

        .pf-section-head p {
          margin: 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          color: #888888;
        }

        /* Case study grid: cards share ruled borders, like a table of contents */
        .pf-projects {
          padding: 96px 0;
        }

        .pf-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: #e4e4e4;
          border: 1px solid #e4e4e4;
        }

        .pf-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 36px 36px 32px;
          background: #ffffff;
          color: var(--brand-black);
          text-decoration: none;
          transition: background 0.25s ease;
        }

        .pf-card:hover {
          background: #fffaf5;
        }

        .pf-card-top {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          letter-spacing: 0.4px;
        }

        .pf-no {
          font-weight: 700;
          color: var(--brand-orange);
        }

        .pf-cat {
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #555555;
        }

        .pf-year {
          margin-left: auto;
          color: #999999;
        }

        .pf-card h3 {
          font-size: 24px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.4px;
          margin: 4px 0 0;
        }

        .pf-card p {
          font-size: 15px;
          line-height: 1.7;
          color: #555555;
          margin: 0;
        }

        .pf-tech {
          list-style: none;
          margin: 4px 0 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 6px 14px;
        }

        .pf-tech li {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          color: #333333;
        }

        .pf-tech li::before {
          content: "/ ";
          color: var(--brand-orange);
        }

        .pf-more {
          margin-top: auto;
          padding-top: 18px;
          font-size: 14px;
          font-weight: 700;
          color: var(--brand-black);
          border-top: 1px dashed #d8d8d8;
        }

        .pf-card:hover .pf-more {
          color: var(--brand-orange);
        }

        .pf-empty {
          font-size: 16px;
          color: #666666;
          padding: 40px 0;
        }

        /* Editorial block */
        .pf-about {
          background: #f7f4ef;
          padding: 110px 0;
          border-top: 2px solid var(--brand-black);
        }

        .pf-about-inner {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 72px;
          align-items: start;
        }

        .pf-about-head {
          position: sticky;
          top: 110px;
        }

        .pf-about-body {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .pf-block {
          border-top: 1px solid var(--brand-black);
          padding-top: 22px;
        }

        .pf-block h3 {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.3px;
          margin: 0 0 12px;
        }

        .pf-block p {
          font-size: 16px;
          line-height: 1.8;
          color: #444444;
          margin: 0;
        }

        .pf-block a {
          color: var(--brand-black);
          font-weight: 700;
          text-decoration: none;
          border-bottom: 2px solid var(--brand-orange);
        }

        .pf-block a:hover {
          color: var(--brand-orange);
        }

        /* FAQ */
        .pf-faq {
          padding: 110px 0;
        }

        .pf-faq-list {
          margin-top: 40px;
          border-top: 1px solid #dddddd;
        }

        .pf-faq-list details {
          border-bottom: 1px solid #dddddd;
        }

        .pf-faq-list summary {
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

        .pf-faq-list summary::-webkit-details-marker {
          display: none;
        }

        .pf-faq-list summary::after {
          content: "+";
          font-size: 24px;
          font-weight: 400;
          color: var(--brand-orange);
          flex-shrink: 0;
        }

        .pf-faq-list details[open] summary::after {
          content: "\\2212";
        }

        .pf-faq-list summary:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        .pf-faq-list details p {
          margin: 0;
          padding: 0 48px 24px 0;
          font-size: 16px;
          line-height: 1.7;
          color: #444444;
        }

        /* Closing */
        .pf-end {
          padding: 80px 0;
          border-top: 2px solid var(--brand-black);
        }

        .pf-end-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        .pf-end h2 {
          margin-top: 0;
        }

        .pf-end p {
          font-size: 17px;
          color: #444444;
          margin: 12px 0 0;
        }

        .pf-end-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 28px;
        }

        .pf-btn {
          display: inline-block;
          padding: 18px 32px;
          background: var(--brand-orange);
          color: #ffffff;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 6px 6px 0 var(--brand-black);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .pf-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 var(--brand-black);
        }

        .pf-link {
          font-size: 16px;
          font-weight: 700;
          color: var(--brand-black);
          text-decoration: none;
          border-bottom: 3px solid var(--brand-orange);
          padding-bottom: 3px;
        }

        .pf-link:hover {
          color: var(--brand-orange);
        }

        /* Tablet and mobile */
        @media (max-width: 900px) {
          .pf-about-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .pf-about-head {
            position: static;
          }
        }

        @media (max-width: 720px) {
          .pf-hero {
            padding: 92px 0 48px;
          }

          .pf-grid {
            grid-template-columns: 1fr;
          }

          .pf-card {
            padding: 28px 24px;
          }

          .pf-projects,
          .pf-about,
          .pf-faq {
            padding: 72px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pf-filter,
          .pf-card,
          .pf-btn {
            transition: none;
          }

          .pf-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}