import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug, formatDate } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Build a static page for every post at build time
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

// Rough reading time from the word count, at about 200 words per minute
function readingTime(body) {
  const words = body.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Per-post SEO: title, description, keywords, canonical URL, social tags and cover image
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = `${SITE_URL}${post.image}`;
  const socialTitle = `${post.title} | ${SITE_NAME}`;

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    openGraph: {
      title: socialTitle,
      description: post.summary,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: imageUrl, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: post.summary,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const minutes = readingTime(post.body);
  const wordCount = post.body.join(" ").split(/\s+/).filter(Boolean).length;

  // Related articles: posts that share the most tags, newest first on ties
  const related = posts
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({
      post: other,
      shared: other.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared || new Date(b.post.date) - new Date(a.post.date))
    .slice(0, 3)
    .map((item) => item.post);

  // JSON-LD: the article itself, with its image, word count and reading time for search engines
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    keywords: post.tags.join(", "),
    articleSection: post.tags[0],
    wordCount,
    timeRequired: `PT${minutes}M`,
    inLanguage: "en",
  };

  // JSON-LD: breadcrumb trail (Home > Blog > Article)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <main className="bp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="bp-crumbs" aria-label="Breadcrumb">
        <div className="bp-wrap">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.title}</span>
        </div>
      </nav>

      <article className="bp-article">
        {/* Header: topic, title, summary and byline */}
        <header className="bp-head">
          <div className="bp-col">
            <ul className="bp-tags" aria-label="Topics">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <h1>{post.title}</h1>
            <p className="bp-dek">{post.summary}</p>

            <dl className="bp-byline">
              <div>
                <dt>Written by</dt>
                <dd>{post.author}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </dd>
              </div>
              <div>
                <dt>Reading time</dt>
                <dd>{minutes} min</dd>
              </div>
            </dl>
          </div>
        </header>

        {/* Cover image: wider than the text column, loaded first because it is the main visual */}
        <figure className="bp-cover">
          <div className="bp-cover-frame">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1140px) 100vw, 1140px"
            />
          </div>
        </figure>

        {/* Body: a narrow reading column with a drop cap on the opening paragraph */}
        <div className="bp-col bp-body">
          {post.body.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "bp-first" : undefined}>
              {paragraph}
            </p>
          ))}

          <div className="bp-sign">
            <span aria-hidden="true" />
            <p>
              Thanks for reading. If you are planning something similar, <Link href="/contact">tell us about it</Link>
              , or explore our <Link href="/services">services</Link>.
            </p>
          </div>

          <Link href="/blog" className="bp-back">
            <span aria-hidden="true">&larr;</span> Back to all articles
          </Link>
        </div>
      </article>

      {/* Related articles for internal linking and readers who want more */}
      {related.length > 0 ? (
        <section className="bp-related" aria-labelledby="related-title">
          <div className="bp-wrap">
            <p className="bp-label">Keep reading</p>
            <h2 id="related-title">Related articles</h2>

            <div className="bp-related-grid">
              {related.map((item) => (
                <Link href={`/blog/${item.slug}`} className="bp-related-card" key={item.slug}>
                  <div className="bp-related-thumb">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 360px"
                    />
                  </div>
                  <div className="bp-related-body">
                    <div className="bp-related-meta">
                      <time dateTime={item.date}>{formatDate(item.date)}</time>
                      <span>{item.tags[0]}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <span className="bp-related-more">
                      Read article <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing call-to-action */}
      <section className="bp-end">
        <div className="bp-wrap bp-end-inner">
          <div>
            <h2>Need help with your project?</h2>
            <p>Tell us what you are building and we will suggest the right approach.</p>
          </div>
          <Link href="/contact" className="bp-btn">
            Start Your Project
          </Link>
        </div>
      </section>

      {/* Page styles. Every class starts with "bp-" so it cannot clash with other pages */}
      <style>{`
        .bp {
          background: #ffffff;
          color: var(--brand-black);
          width: 100%;
          overflow-x: hidden;
          overflow-x: clip;
        }

        .bp *,
        .bp *::before,
        .bp *::after {
          box-sizing: border-box;
        }

        .bp-wrap {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .bp-col {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .bp-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--brand-orange);
          margin: 0;
        }

        .bp h1 {
          font-size: clamp(34px, 5vw, 54px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1px;
          margin: 20px 0 0;
          overflow-wrap: break-word;
        }

        .bp h2 {
          font-size: clamp(28px, 3.6vw, 40px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.7px;
          margin: 14px 0 0;
          overflow-wrap: break-word;
        }

        .bp h3 {
          color: var(--brand-black);
        }

        .bp p {
          overflow-wrap: break-word;
        }

        /* Breadcrumb */
        .bp-crumbs {
          padding: 112px 0 0;
          font-size: 13px;
          color: #888888;
        }

        .bp-crumbs .bp-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .bp-crumbs a {
          color: #555555;
          text-decoration: none;
        }

        .bp-crumbs a:hover {
          color: var(--brand-orange);
        }

        /* Header */
        .bp-article {
          padding-top: 40px;
        }

        .bp-head {
          padding-bottom: 48px;
        }

        .bp-tags {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .bp-tags li {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--brand-orange);
          padding: 5px 10px;
          border: 1px solid var(--brand-orange);
          border-radius: 2px;
        }

        .bp-dek {
          font-size: 21px;
          line-height: 1.55;
          color: #444444;
          margin: 24px 0 0;
        }

        /* Byline as a small facts row */
        .bp-byline {
          display: grid;
          grid-template-columns: repeat(3, auto);
          justify-content: start;
          gap: 0;
          margin: 36px 0 0;
          font-size: 14px;
        }

        .bp-byline > div {
          padding-right: 28px;
          margin-right: 28px;
          border-right: 1px solid #dddddd;
        }

        .bp-byline > div:last-child {
          border-right: none;
          margin-right: 0;
          padding-right: 0;
        }

        .bp-byline dt {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #888888;
        }

        .bp-byline dd {
          margin: 6px 0 0;
          font-weight: 700;
          color: var(--brand-black);
        }

        /* Cover image: sits wider than the text column, framed with the brand's offset shadow */
        .bp-cover {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .bp-cover-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #f2ece4;
          border: 2px solid var(--brand-black);
          border-radius: 4px;
          box-shadow: 12px 12px 0 var(--brand-orange);
          overflow: hidden;
        }

        .bp-cover-frame img {
          object-fit: cover;
        }

        /* Body */
        .bp-body {
          padding-top: 64px;
          padding-bottom: 24px;
        }

        .bp-body > p {
          font-size: 19px;
          line-height: 1.85;
          color: #2b2b2b;
          margin: 0 0 26px;
        }

        /* Drop cap on the opening paragraph */
        .bp-body > p.bp-first::first-letter {
          float: left;
          font-size: 4.6em;
          line-height: 0.82;
          font-weight: 800;
          color: var(--brand-orange);
          padding: 8px 14px 0 0;
        }

        .bp-sign {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin: 48px 0 0;
          padding-top: 28px;
          border-top: 2px solid var(--brand-black);
        }

        .bp-sign span {
          display: block;
          width: 48px;
          height: 4px;
          background: var(--brand-orange);
          border-radius: 3px;
        }

        .bp-sign p {
          font-size: 17px;
          line-height: 1.7;
          color: #444444;
          margin: 0;
        }

        .bp-body a,
        .bp-sign a {
          color: var(--brand-black);
          font-weight: 700;
          text-decoration: none;
          border-bottom: 2px solid var(--brand-orange);
        }

        .bp-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 36px;
          font-size: 15px;
          font-weight: 700;
          color: var(--brand-black);
          text-decoration: none;
        }

        .bp-back:hover {
          color: var(--brand-orange);
        }

        /* Related articles */
        .bp-related {
          background: #f7f4ef;
          padding: 100px 0;
          border-top: 2px solid var(--brand-black);
        }

        .bp-related-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .bp-related-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #e6dfd5;
          color: var(--brand-black);
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          min-width: 0;
        }

        .bp-related-card:hover {
          transform: translateY(-4px);
          box-shadow: 8px 8px 0 var(--brand-orange);
        }

        .bp-related-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: #f2ece4;
          border-bottom: 1px solid #e6dfd5;
          overflow: hidden;
        }

        .bp-related-thumb img {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .bp-related-card:hover .bp-related-thumb img {
          transform: scale(1.04);
        }

        .bp-related-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px 24px 22px;
          flex-grow: 1;
        }

        .bp-related-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 12px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          color: #888888;
        }

        .bp-related-meta span {
          color: var(--brand-orange);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .bp-related-card h3 {
          font-size: 20px;
          font-weight: 800;
          line-height: 1.3;
          letter-spacing: -0.2px;
          margin: 4px 0 0;
        }

        .bp-related-card p {
          font-size: 15px;
          line-height: 1.65;
          color: #555555;
          margin: 0;
        }

        .bp-related-more {
          margin-top: auto;
          padding-top: 10px;
          font-size: 14px;
          font-weight: 700;
          color: var(--brand-black);
        }

        .bp-related-card:hover .bp-related-more {
          color: var(--brand-orange);
        }

        /* Closing */
        .bp-end {
          padding: 80px 0;
          border-top: 2px solid var(--brand-black);
        }

        .bp-end-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        .bp-end h2 {
          margin-top: 0;
          font-size: clamp(26px, 3.4vw, 36px);
        }

        .bp-end p {
          font-size: 17px;
          color: #444444;
          margin: 12px 0 0;
        }

        .bp-btn {
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

        .bp-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 var(--brand-black);
        }

        .bp-crumbs a:focus-visible,
        .bp-back:focus-visible,
        .bp-body a:focus-visible,
        .bp-sign a:focus-visible,
        .bp-related-card:focus-visible,
        .bp-btn:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .bp-related-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* Mobile */
        @media (max-width: 720px) {
          .bp-wrap,
          .bp-cover {
            padding: 0 20px;
          }

          .bp-crumbs {
            padding-top: 92px;
          }

          .bp-col {
            padding: 0 20px;
          }

          .bp-byline {
            grid-template-columns: minmax(0, 1fr);
            row-gap: 16px;
          }

          .bp-byline > div {
            border-right: none;
            margin-right: 0;
            padding-right: 0;
          }

          .bp-cover-frame {
            box-shadow: 6px 6px 0 var(--brand-orange);
          }

          .bp-body {
            padding-top: 48px;
          }

          .bp-body > p {
            font-size: 17px;
            line-height: 1.8;
          }

          .bp-body > p.bp-first::first-letter {
            font-size: 3.6em;
          }

          .bp-related {
            padding: 72px 0;
          }

          .bp-related-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
          }

          .bp-btn {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 380px) {
          .bp-wrap,
          .bp-cover,
          .bp-col {
            padding-left: 16px;
            padding-right: 16px;
          }

          .bp h1 {
            font-size: 30px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bp-related-card,
          .bp-related-thumb img,
          .bp-btn,
          .bp-back {
            transition: none;
          }

          .bp-btn:hover,
          .bp-related-card:hover {
            transform: none;
          }

          .bp-related-card:hover .bp-related-thumb img {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}