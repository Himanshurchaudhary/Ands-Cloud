import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";

const SITE_NAME = "ANDS Cloud Tech Solutions";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

// Build a static page for every project at build time
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Per-project SEO. The layout template adds "| ANDS Cloud Tech Solutions" to the title.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const url = `${SITE_URL}/portfolio/${project.slug}`;
  const socialTitle = `${project.title} | ${SITE_NAME}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description: project.summary,
      url,
      siteName: SITE_NAME,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Unknown slug: show the 404 page
  if (!project) {
    notFound();
  }

  const url = `${SITE_URL}/portfolio/${project.slug}`;

  // JSON-LD: describes this project as a creative work for search engines
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url,
    genre: project.category,
    dateCreated: project.year,
    keywords: project.tech.join(", "),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  // JSON-LD: breadcrumb trail (Home > Portfolio > Project)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE_URL}/portfolio` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <main className="pd">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb navigation */}
      <nav className="pd-crumbs" aria-label="Breadcrumb">
        <div className="pd-wrap">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/portfolio">Portfolio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </div>
      </nav>

      {/* Header: title, summary and a ruled facts strip */}
      <header className="pd-hero">
        <div className="pd-wrap">
          <h1>{project.title}</h1>
          <p className="pd-summary">{project.summary}</p>

          <dl className="pd-facts">
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Technologies</dt>
              <dd>{String(project.tech.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Live</dt>
              <dd>{project.liveUrl ? "Yes" : "Private"}</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* Visual. Swap for a real screenshot later with next/image */}
      <div className="pd-wrap">
        <figure className="pd-figure" aria-hidden="true">
          <div className="pd-figure-frame">
            <span className="pd-figure-label">{project.category}</span>
          </div>
          <figcaption>Fig. 01 &mdash; {project.title}</figcaption>
        </figure>
      </div>

      {/* Body: overview and features on the left, details on the right */}
      <section className="pd-body">
        <div className="pd-wrap pd-layout">
          <article className="pd-main">
            <h2>Project overview</h2>
            <p className="pd-lead">{project.description}</p>

            <h2>Key features</h2>
            <ol className="pd-features">
              {project.features.map((feature, index) => (
                <li key={feature}>
                  <span className="pd-feature-no">{String(index + 1).padStart(2, "0")}</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ol>
          </article>

          <aside className="pd-side">
            <div className="pd-card">
              <h3>Technologies</h3>
              <ul className="pd-stack">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                className="pd-btn pd-btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live project <span aria-hidden="true">&nearr;</span>
              </a>
            ) : null}
          </aside>
        </div>
      </section>

      {/* Closing call-to-action */}
      <section className="pd-end">
        <div className="pd-wrap pd-end-inner">
          <div>
            <h2>Want something similar for your business?</h2>
            <p>Tell us what you need and we will plan the right solution with you.</p>
          </div>
          <div className="pd-actions">
            <Link href="/contact" className="pd-btn pd-btn-primary">
              Start Your Project
            </Link>
            <Link href="/portfolio" className="pd-btn pd-btn-ghost">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Page styles. Every class starts with "pd-" so it cannot clash with other pages */}
      <style>{`
        .pd {
          background: #ffffff;
          color: var(--brand-black);
        }

        .pd-wrap {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Breadcrumb */
        .pd-crumbs {
          padding: 112px 0 0;
          font-size: 13px;
          color: #888888;
        }

        .pd-crumbs .pd-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .pd-crumbs a {
          color: #555555;
          text-decoration: none;
        }

        .pd-crumbs a:hover {
          color: var(--brand-orange);
        }

        /* Hero */
        .pd-hero {
          padding: 40px 0 56px;
        }

        .pd h1 {
          font-size: clamp(36px, 5.6vw, 62px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -1.2px;
          max-width: 900px;
          margin: 0;
        }

        .pd-summary {
          font-size: 20px;
          line-height: 1.6;
          color: #444444;
          max-width: 760px;
          margin: 22px 0 0;
        }

        /* Ruled facts strip */
        .pd-facts {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin: 48px 0 0;
          border-top: 2px solid var(--brand-black);
          border-bottom: 1px solid #dddddd;
        }

        .pd-facts > div {
          padding: 18px 20px 18px 0;
        }

        .pd-facts > div + div {
          padding-left: 20px;
          border-left: 1px solid #dddddd;
        }

        .pd-facts dt {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #888888;
        }

        .pd-facts dd {
          margin: 6px 0 0;
          font-size: 18px;
          font-weight: 700;
          color: var(--brand-black);
        }

        /* Visual: a sheet with an orange offset shadow and a hand-drawn frame */
        .pd-figure {
          margin: 56px 0 0;
        }

        .pd-figure-frame {
          position: relative;
          height: 380px;
          background-color: #f5f1ea;
          background-image: radial-gradient(#dcd4c8 1px, transparent 1.2px);
          background-size: 20px 20px;
          border: 2px solid var(--brand-black);
          border-radius: 6px 10px 8px 12px;
          box-shadow: 12px 12px 0 var(--brand-orange);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pd-figure-label {
          background: #ffffff;
          border: 2px solid var(--brand-black);
          padding: 10px 22px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--brand-black);
          transform: rotate(-1.5deg);
        }

        .pd-figure figcaption {
          margin-top: 22px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          color: #888888;
          letter-spacing: 0.4px;
        }

        /* Body layout */
        .pd-body {
          padding: 96px 0 110px;
        }

        .pd-layout {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .pd h2 {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.4px;
          margin: 0 0 22px;
        }

        .pd-main > h2:not(:first-child) {
          margin-top: 64px;
        }

        .pd-lead {
          font-size: 18px;
          line-height: 1.8;
          color: #333333;
          margin: 0;
        }

        /* Drop cap on the first letter of the overview */
        .pd-lead::first-letter {
          float: left;
          font-size: 4.2em;
          line-height: 0.85;
          font-weight: 800;
          color: var(--brand-orange);
          padding: 6px 12px 0 0;
        }

        /* Numbered features, separated by rules */
        .pd-features {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid var(--brand-black);
        }

        .pd-features li {
          display: flex;
          align-items: baseline;
          gap: 22px;
          padding: 20px 0;
          border-bottom: 1px solid #e4e4e4;
          font-size: 17px;
          line-height: 1.55;
          color: #333333;
        }

        .pd-feature-no {
          flex-shrink: 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          font-weight: 700;
          color: var(--brand-orange);
        }

        /* Sidebar */
        .pd-side {
          position: sticky;
          top: 110px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .pd-card {
          border-left: 2px solid var(--brand-black);
          padding: 4px 0 4px 26px;
        }

        .pd-card h3 {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #888888;
          margin: 0 0 16px;
        }

        .pd-stack {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .pd-stack li {
          padding: 10px 0;
          border-bottom: 1px dashed #d8d8d8;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 14px;
          color: var(--brand-black);
        }

        .pd-stack li:first-child {
          padding-top: 0;
        }

        /* Closing CTA: a cream panel */
        .pd-end {
          background: #f7f4ef;
          border-top: 2px solid var(--brand-black);
          padding: 90px 0;
        }

        .pd-end-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        .pd-end h2 {
          margin: 0;
          font-size: clamp(26px, 3.4vw, 36px);
          letter-spacing: -0.6px;
        }

        .pd-end p {
          font-size: 17px;
          color: #444444;
          margin: 12px 0 0;
        }

        .pd-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        /* Buttons */
        .pd-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 28px;
          border: 2px solid var(--brand-black);
          border-radius: 4px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .pd-btn-primary {
          background: var(--brand-black);
          color: #ffffff;
          box-shadow: 5px 5px 0 var(--brand-orange);
        }

        .pd-btn-ghost {
          background: #ffffff;
          color: var(--brand-black);
          box-shadow: 5px 5px 0 var(--brand-black);
        }

        .pd-btn-outline {
          background: #ffffff;
          color: var(--brand-black);
          justify-content: center;
          box-shadow: 5px 5px 0 var(--brand-black);
        }

        .pd-btn:hover {
          transform: translate(-2px, -2px);
        }

        .pd-btn:focus-visible,
        .pd-crumbs a:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        /* Tablet and mobile */
        @media (max-width: 900px) {
          .pd-layout {
            grid-template-columns: 1fr;
            gap: 56px;
          }

          .pd-side {
            position: static;
          }

          .pd-facts {
            grid-template-columns: repeat(2, 1fr);
          }

          .pd-facts > div:nth-child(3) {
            padding-left: 0;
            border-left: none;
          }

          .pd-facts > div:nth-child(n + 3) {
            border-top: 1px solid #dddddd;
          }
        }

        @media (max-width: 600px) {
          .pd-crumbs {
            padding-top: 92px;
          }

          .pd-figure-frame {
            height: 240px;
            box-shadow: 8px 8px 0 var(--brand-orange);
          }

          .pd-body {
            padding: 72px 0 80px;
          }

          .pd-lead::first-letter {
            font-size: 3.4em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pd-btn {
            transition: none;
          }

          .pd-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}