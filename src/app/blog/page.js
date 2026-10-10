import Image from "next/image";
import Link from "next/link";
import { posts, formatDate } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Web Development, Mobile App and Cloud Blog";
const pageDescription =
  "Practical articles on web development, mobile apps, cloud hosting and business software, written by the ANDS Cloud Tech Solutions team.";
const pageUrl = `${SITE_URL}/blog`;

// SEO metadata for the Blog listing page
export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  keywords: [
    "web development blog",
    "mobile app development",
    "cloud hosting tips",
    "business software",
    "ANDS Cloud Tech Solutions",
  ],
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

// Rough reading time from the word count, at about 200 words per minute
function readingTime(body) {
  const words = body.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function pad(number) {
  return String(number).padStart(2, "0");
}

export default function BlogPage() {
  // Newest posts first
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [featured, ...rest] = sorted;

  // Every tag used across the blog, shown as topic labels
  const topics = [...new Set(posts.flatMap((post) => post.tags))];

  // JSON-LD: a Blog that lists its posts, plus the breadcrumb trail
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: `${SITE_NAME} Blog`,
        description: pageDescription,
        url: pageUrl,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        blogPost: sorted.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.date,
          keywords: post.tags.join(", "),
          image: `${SITE_URL}${post.image}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="bl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="bl-hero">
        <div className="bl-wrap">
          <p className="bl-kicker">Our Blog</p>
          <h1>
            Insights for <span>growing businesses</span>
          </h1>
          <p className="bl-intro">
            Practical articles on web development, mobile apps, cloud hosting and business software, written by the
            ANDS Cloud Tech Solutions team. Each article answers a question we hear from founders, clinic owners and
            product teams, with the reasoning behind the decisions we make.
          </p>

          {topics.length > 0 ? (
            <ul className="bl-topics" aria-label="Topics covered">
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      {/* Latest article: image beside the text, given the most space */}
      {featured ? (
        <section className="bl-featured" aria-labelledby="latest-title">
          <div className="bl-wrap">
            <p className="bl-label">Latest article</p>
            <Link href={`/blog/${featured.slug}`} className="bl-feature">
              <div className="bl-feature-media">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 560px"
                />
              </div>

              <div className="bl-feature-text">
                <div className="bl-meta">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span className="bl-tag">{featured.tags[0]}</span>
                  <span>{readingTime(featured.body)} min read</span>
                </div>
                <h2 id="latest-title">{featured.title}</h2>
                <p>{featured.summary}</p>
                <span className="bl-more">
                  Read article <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {/* Archive: remaining posts as ruled rows, each with a thumbnail */}
      {rest.length > 0 ? (
        <section className="bl-archive" aria-labelledby="archive-title">
          <div className="bl-wrap">
            <div className="bl-archive-head">
              <h2 id="archive-title">All articles</h2>
              <p>{pad(sorted.length)} articles</p>
            </div>

            <ol className="bl-rows">
              {rest.map((post, index) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="bl-row">
                    <div className="bl-row-thumb">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(max-width: 720px) 100vw, 260px"
                      />
                    </div>

                    <div className="bl-row-main">
                      <div className="bl-meta">
                        <span className="bl-row-no">{pad(index + 2)}</span>
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span className="bl-tag">{post.tags[0]}</span>
                        <span>{readingTime(post.body)} min read</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.summary}</p>
                    </div>

                    <span className="bl-row-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Editorial: what the blog covers. Helps search engines understand the topics */}
      <section className="bl-about" aria-labelledby="covers-title">
        <div className="bl-wrap bl-about-inner">
          <div className="bl-about-head">
            <p className="bl-label">About these articles</p>
            <h2 id="covers-title">What we write about</h2>
          </div>

          <div className="bl-about-body">
            <div className="bl-block">
              <h3>Web development</h3>
              <p>
                Articles on building fast, search-friendly websites and web applications. We cover page speed, clean
                site structure, meta tags, structured data and the choices between frameworks such as Next.js and
                React, so your site is easier for both visitors and search engines to understand.
              </p>
            </div>

            <div className="bl-block">
              <h3>Mobile apps</h3>
              <p>
                Notes on building Android and iOS apps with React Native and Expo. We discuss sharing code between
                platforms, testing on real devices, preparing Play Store and App Store listings and keeping an app
                updated after release.
              </p>
            </div>

            <div className="bl-block">
              <h3>Cloud and hosting</h3>
              <p>
                Practical guides on hosting, domains, SSL certificates, deployments and backups. These articles focus
                on keeping a product online, secure and quick to update, without making the setup harder than it needs
                to be.
              </p>
            </div>

            <div className="bl-block">
              <h3>Business software</h3>
              <p>
                Ideas for choosing and building software that fits how a business really works, including clinic
                management, billing, inventory and subscription products. We explain the trade-offs we consider before
                building anything custom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing call-to-action */}
      <section className="bl-end">
        <div className="bl-wrap bl-end-inner">
          <div>
            <h2>Have a question about your project?</h2>
            <p>Share what you are building and we will suggest the right approach.</p>
          </div>
          <Link href="/contact" className="bl-btn">
            Start Your Project
          </Link>
        </div>
      </section>

      {/* Page styles. Every class starts with "bl-" so it cannot clash with other pages */}
      <style>{`
        .bl {
          background: #ffffff;
          color: var(--brand-black);
          width: 100%;
          overflow-x: hidden;
          overflow-x: clip;
        }

        .bl *,
        .bl *::before,
        .bl *::after {
          box-sizing: border-box;
        }

        .bl-wrap {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .bl-kicker,
        .bl-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--brand-orange);
          margin: 0;
        }

        .bl h1 {
          font-size: clamp(34px, 5.6vw, 64px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -1.2px;
          margin: 18px 0 0;
          max-width: 900px;
          overflow-wrap: break-word;
        }

        .bl h1 span {
          color: var(--brand-orange);
        }

        .bl h2 {
          font-size: clamp(28px, 3.8vw, 42px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.8px;
          margin: 14px 0 0;
          overflow-wrap: break-word;
        }

        .bl h3 {
          color: var(--brand-black);
        }

        .bl p {
          overflow-wrap: break-word;
        }

        /* Header */
        .bl-hero {
          padding: 120px 0 64px;
          border-bottom: 2px solid var(--brand-black);
        }

        .bl-intro {
          font-size: 18px;
          line-height: 1.7;
          color: #444444;
          max-width: 760px;
          margin: 24px 0 0;
        }

        .bl-topics {
          list-style: none;
          margin: 32px 0 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .bl-topics li {
          padding: 7px 14px;
          border: 1.5px solid var(--brand-black);
          border-radius: 3px;
          font-size: 14px;
          font-weight: 600;
          color: var(--brand-black);
        }

        /* Featured article: image beside text */
        .bl-featured {
          padding: 80px 0 64px;
        }

        .bl-feature {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          background: #fffaf5;
          border: 1px solid #f1e4d6;
          color: var(--brand-black);
          text-decoration: none;
          transition: background 0.25s ease;
        }

        .bl-feature:hover {
          background: #fff4ec;
        }

        .bl-feature-media {
          position: relative;
          min-height: 360px;
          border-right: 1px solid #f1e4d6;
          background: #f2ece4;
          overflow: hidden;
        }

        .bl-feature-media img {
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .bl-feature:hover .bl-feature-media img {
          transform: scale(1.03);
        }

        .bl-feature-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          padding: 48px 44px;
          min-width: 0;
        }

        .bl-feature h2 {
          font-size: clamp(26px, 3.2vw, 38px);
          margin-top: 18px;
        }

        .bl-feature p {
          font-size: 17px;
          line-height: 1.7;
          color: #444444;
          margin: 18px 0 0;
        }

        .bl-more {
          display: inline-block;
          align-self: flex-start;
          margin-top: 26px;
          font-size: 15px;
          font-weight: 700;
          color: var(--brand-black);
          border-bottom: 2px solid var(--brand-orange);
          padding-bottom: 2px;
        }

        .bl-feature:hover .bl-more {
          color: var(--brand-orange);
        }

        /* Meta line shared by the featured card and the rows */
        .bl-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 16px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          letter-spacing: 0.4px;
          color: #777777;
        }

        .bl-tag {
          color: var(--brand-orange);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          font-weight: 700;
        }

        /* Archive rows */
        .bl-archive {
          padding: 40px 0 110px;
        }

        .bl-archive-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--brand-black);
        }

        .bl-archive-head h2 {
          margin: 0;
          font-size: clamp(26px, 3vw, 34px);
        }

        .bl-archive-head p {
          margin: 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          color: #888888;
        }

        .bl-rows {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .bl-row {
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr) 32px;
          align-items: center;
          gap: 28px;
          padding: 28px 0;
          border-bottom: 1px solid #e4e4e4;
          color: var(--brand-black);
          text-decoration: none;
          transition: padding-left 0.25s ease;
        }

        .bl-row:hover {
          padding-left: 10px;
        }

        .bl-row-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: #f2ece4;
        }

        .bl-row-thumb img {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .bl-row:hover .bl-row-thumb img {
          transform: scale(1.05);
        }

        .bl-row-no {
          font-weight: 700;
          color: var(--brand-orange);
        }

        .bl-row-main {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }

        .bl-row h3 {
          font-size: 24px;
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.4px;
          margin: 0;
        }

        .bl-row p {
          font-size: 16px;
          line-height: 1.65;
          color: #555555;
          margin: 0;
          max-width: 720px;
        }

        .bl-row-arrow {
          font-size: 22px;
          color: var(--brand-black);
          transition: color 0.2s ease;
        }

        .bl-row:hover .bl-row-arrow,
        .bl-row:hover h3 {
          color: var(--brand-orange);
        }

        /* About the blog */
        .bl-about {
          background: #f7f4ef;
          padding: 110px 0;
          border-top: 2px solid var(--brand-black);
        }

        .bl-about-inner {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
          gap: 72px;
          align-items: start;
        }

        .bl-about-head {
          position: sticky;
          top: 110px;
        }

        .bl-about-body {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .bl-block {
          border-top: 1px solid var(--brand-black);
          padding-top: 22px;
        }

        .bl-block h3 {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.3px;
          margin: 0 0 12px;
        }

        .bl-block p {
          font-size: 16px;
          line-height: 1.8;
          color: #444444;
          margin: 0;
        }

        /* Closing */
        .bl-end {
          padding: 80px 0;
          border-top: 2px solid var(--brand-black);
        }

        .bl-end-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        .bl-end h2 {
          margin-top: 0;
          font-size: clamp(26px, 3.4vw, 36px);
        }

        .bl-end p {
          font-size: 17px;
          color: #444444;
          margin: 12px 0 0;
        }

        .bl-btn {
          display: inline-block;
          padding: 18px 32px;
          background: var(--brand-black);
          color: #ffffff;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 6px 6px 0 var(--brand-orange);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .bl-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 var(--brand-orange);
        }

        .bl-row:focus-visible,
        .bl-feature:focus-visible,
        .bl-btn:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        /* Tablet */
        @media (max-width: 960px) {
          .bl-row {
            grid-template-columns: 200px minmax(0, 1fr) 24px;
            gap: 22px;
          }

          .bl-about-inner {
            grid-template-columns: minmax(0, 1fr);
            gap: 40px;
          }

          .bl-about-head {
            position: static;
          }
        }

        /* Mobile */
        @media (max-width: 720px) {
          .bl-wrap {
            padding: 0 20px;
          }

          .bl-hero {
            padding: 92px 0 48px;
          }

          .bl-featured {
            padding: 48px 0 32px;
          }

          .bl-feature {
            grid-template-columns: minmax(0, 1fr);
          }

          .bl-feature-media {
            min-height: 0;
            aspect-ratio: 16 / 9;
            border-right: none;
            border-bottom: 1px solid #f1e4d6;
          }

          .bl-feature-text {
            padding: 26px 22px 30px;
          }

          .bl-row {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
            padding: 24px 0;
          }

          .bl-row-thumb {
            aspect-ratio: 16 / 9;
          }

          .bl-row-arrow {
            display: none;
          }

          .bl-row:hover {
            padding-left: 0;
          }

          .bl-about {
            padding: 72px 0;
          }

          .bl-end {
            padding: 64px 0;
          }

          .bl-btn {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 380px) {
          .bl-wrap {
            padding: 0 16px;
          }

          .bl h1 {
            font-size: 32px;
          }

          .bl h2 {
            font-size: 26px;
          }

          .bl-row h3 {
            font-size: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bl-feature,
          .bl-row,
          .bl-row-arrow,
          .bl-btn,
          .bl-feature-media img,
          .bl-row-thumb img {
            transition: none;
          }

          .bl-btn:hover,
          .bl-row:hover {
            transform: none;
            padding-left: 0;
          }

          .bl-feature:hover .bl-feature-media img,
          .bl-row:hover .bl-row-thumb img {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}