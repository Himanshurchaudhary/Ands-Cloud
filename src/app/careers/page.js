import { SITE_NAME, SITE_URL } from "@/lib/site";

const APPLY_EMAIL = "support@andscloud.com"; // change to your real hiring email

const pageTitle = "Careers at ANDS Cloud Tech Solutions";
const pageDescription =
  "Join ANDS Cloud (ANDS Cloud Tech Solutions). Explore open roles in web development, mobile apps and cloud engineering in Patna, Bihar, India.";

const pageUrl = `${SITE_URL}/careers`;

// Open positions. Remove a job here when it is filled.
const jobs = [
  {
    id: "frontend-developer",
    title: "Frontend Developer (Next.js / React)",
    type: "Full-time",
    location: "PATNA, BIHAR, India",
    experience: "1 to 3 years",
    datePosted: "2026-10-01",
    summary:
      "Build fast, responsive websites and web apps for our clients using Next.js and React.",
    responsibilities: [
      "Build pages and components from design files",
      "Work with APIs and handle form and data flows",
      "Optimize performance and SEO for client websites",
    ],
    requirements: [
      "Solid knowledge of JavaScript, React and Next.js",
      "Comfortable with CSS and responsive layouts",
      "Basic understanding of Git and deployment",
    ],
  },
  {
    id: "react-native-developer",
    title: "React Native Developer (Expo)",
    type: "Full-time",
    location: "PATNA, BIHAR, India",
    experience: "1 to 3 years",
    datePosted: "2026-10-01",
    summary:
      "Develop and publish Android and iOS apps for our clients using React Native and Expo.",
    responsibilities: [
      "Build screens, navigation and app features",
      "Integrate REST APIs and handle authentication",
      "Prepare builds and support Play Store releases",
    ],
    requirements: [
      "Hands-on experience with React Native and Expo",
      "Experience publishing at least one app to a store",
      "Familiarity with Node.js backends is a plus",
    ],
  },
  {
    id: "backend-developer",
    title: "Backend Developer (Node.js)",
    type: "Full-time",
    location: "PATNA, BIHAR, India",
    experience: "1 to 3 years",
    datePosted: "2026-10-01",
    summary:
      "Design and build APIs, databases and business logic for web and mobile products.",
    responsibilities: [
      "Build REST APIs with Express",
      "Design MongoDB and MySQL data models",
      "Write clean, documented and tested code",
    ],
    requirements: [
      "Strong knowledge of Node.js and Express",
      "Experience with MongoDB or MySQL",
      "Understanding of authentication and security basics",
    ],
  },
];

const perks = [
  {
    title: "Real projects",
    text: "Work on web platforms, mobile apps and cloud systems from day one.",
  },
  {
    title: "Learn fast",
    text: "Regular code reviews and hands-on mentoring from senior developers.",
  },
  {
    title: "Clear growth path",
    text: "Clear expectations and room to take on more ownership as you grow.",
  },
];

// SEO metadata for the Careers page
export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  keywords: [
    "careers",
    "web developer jobs Patna",
    "React Native developer jobs",
    "Node.js developer jobs",
    "Next.js developer jobs",
  ],
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

function pad(number) {
  return String(number).padStart(2, "0");
}

export default function CareersPage() {
  // JSON-LD: one JobPosting per open role, so search engines can show them in job results
  const jobsJsonLd = jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.datePosted,
    employmentType: job.type.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        addressCountry: "IN",
      },
    },
  }));

  return (
    <main className="cr">
      {jobsJsonLd.map((json, index) => (
        <script
          key={jobs[index].id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
        />
      ))}

      {/* Dark hero with a large headline */}
      <section className="cr-hero">
        <div className="cr-wrap">
          <p className="cr-status">
            <span className="cr-dot" aria-hidden="true" />
            <span>
              {pad(jobs.length)} open {jobs.length === 1 ? "position" : "positions"}
            </span>
          </p>

          <h1>
            Build the future of <span>digital business</span> with us
          </h1>

          <p className="cr-intro">
            We are a small, focused team that ships real products. If you enjoy building things that people use,
            we would like to hear from you.
          </p>
        </div>
      </section>

      {/* Perks: three columns with a shared top rule */}
      <section className="cr-perks" aria-label="Why work with us">
        <div className="cr-wrap cr-perk-row">
          {perks.map((perk, index) => (
            <div className="cr-perk" key={perk.title}>
              <span className="cr-perk-no">{pad(index + 1)}</span>
              <h3>{perk.title}</h3>
              <p>{perk.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section className="cr-jobs" aria-labelledby="openings-title">
        <div className="cr-wrap">
          <div className="cr-section-head">
            <p className="cr-label">Open positions</p>
            <h2 id="openings-title">
              Current <span>openings</span>
            </h2>
          </div>

          <div className="cr-list">
            {jobs.map((job, index) => (
              <article className="cr-job" key={job.id} id={job.id} aria-labelledby={`${job.id}-title`}>
                <div className="cr-job-top">
                  <div className="cr-job-head">
                    <span className="cr-job-no">{pad(index + 1)}</span>
                    <div>
                      <h3 id={`${job.id}-title`}>{job.title}</h3>
                      <ul className="cr-facts" aria-label="Job details">
                        <li>{job.type}</li>
                        
                        <li>{job.experience}</li>
                      </ul>
                    </div>
                  </div>

                  <a
                    className="cr-apply"
                    href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                  >
                    Apply now <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>

                <p className="cr-job-summary">{job.summary}</p>

                <div className="cr-job-cols">
                  <div>
                    <h4>Responsibilities</h4>
                    <ul className="cr-list-items">
                      {job.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Requirements</h4>
                    <ul className="cr-list-items">
                      {job.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Open application */}
      <section className="cr-end">
        <div className="cr-wrap cr-end-inner">
          <div>
            <h2>Do not see a role that fits?</h2>
            <p>Send us your resume anyway. We will reach out when a suitable opening comes up.</p>
          </div>
          <a
            className="cr-btn"
            href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent("General application")}`}
          >
            Send your resume <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Page styles. Every class starts with "cr-" so it cannot clash with other pages */}
      <style>{`
        .cr {
          background: #ffffff;
          color: var(--brand-black);
        }

        .cr-wrap {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .cr-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--brand-orange);
          margin: 0;
        }

        .cr h1 {
          font-size: clamp(42px, 7vw, 92px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -2.5px;
          color: #ffffff;
          margin: 28px 0 0;
          max-width: 1000px;
        }

        .cr h1 span {
          color: var(--brand-orange);
        }

        .cr h2 {
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.9px;
          margin: 0;
        }

        .cr h2 span {
          color: var(--brand-orange);
        }

        .cr h3 {
          color: var(--brand-black);
        }

        /* Hero: dark, with a pulsing status dot */
        .cr-hero {
          background: var(--brand-black);
          padding: 150px 0 110px;
          position: relative;
          overflow: hidden;
        }

        .cr-hero::after {
          content: "";
          position: absolute;
          right: -120px;
          top: -120px;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 2px solid rgba(255, 110, 40, 0.35);
          pointer-events: none;
        }

        .cr-status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          padding: 8px 14px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #dddddd;
        }

        .cr-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--brand-orange);
          box-shadow: 0 0 0 0 rgba(255, 110, 40, 0.6);
          animation: cr-pulse 2s ease-out infinite;
        }

        @keyframes cr-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 110, 40, 0.6);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 110, 40, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 110, 40, 0);
          }
        }

        .cr-intro {
          font-size: 19px;
          line-height: 1.7;
          color: #bbbbbb;
          max-width: 620px;
          margin: 32px 0 0;
        }

        /* Perks */
        .cr-perks {
          padding: 0;
          border-bottom: 1px solid #e6e6e6;
        }

        .cr-perk-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .cr-perk {
          padding: 48px 36px 52px 0;
          border-top: 3px solid var(--brand-black);
          margin-top: -1px;
        }

        .cr-perk + .cr-perk {
          padding-left: 36px;
          border-left: 1px solid #e6e6e6;
        }

        .cr-perk-no {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          font-weight: 700;
          color: var(--brand-orange);
        }

        .cr-perk h3 {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.3px;
          margin: 14px 0 10px;
        }

        .cr-perk p {
          font-size: 16px;
          line-height: 1.7;
          color: #555555;
          margin: 0;
        }

        /* Jobs */
        .cr-jobs {
          padding: 110px 0;
          background: #fbf9f6;
        }

        .cr-section-head {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 56px;
        }

        .cr-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cr-job {
          position: relative;
          background: #ffffff;
          border: 1px solid #ebe5dc;
          padding: 40px 40px 36px 44px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        /* Thick orange bar on the left edge, revealed on hover */
        .cr-job::before {
          content: "";
          position: absolute;
          left: -1px;
          top: -1px;
          bottom: -1px;
          width: 6px;
          background: var(--brand-orange);
          transform: scaleY(0.25);
          transform-origin: top;
          transition: transform 0.35s ease;
        }

        .cr-job:hover {
          border-color: var(--brand-black);
          box-shadow: 10px 10px 0 #ffe3cf;
        }

        .cr-job:hover::before {
          transform: scaleY(1);
        }

        .cr-job-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .cr-job-head {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .cr-job-no {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          font-weight: 700;
          color: var(--brand-orange);
          padding-top: 8px;
        }

        .cr-job h3 {
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin: 0 0 12px;
        }

        .cr-facts {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 6px 18px;
        }

        .cr-facts li {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          color: #666666;
        }

        .cr-facts li + li::before {
          content: "/";
          margin-right: 18px;
          color: var(--brand-orange);
        }

        .cr-apply {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          background: var(--brand-black);
          color: #ffffff;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .cr-apply:hover {
          background: var(--brand-orange);
          transform: translateX(3px);
        }

        .cr-job-summary {
          font-size: 17px;
          line-height: 1.7;
          color: #444444;
          margin: 0;
          max-width: 760px;
        }

        .cr-job-cols {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          padding-top: 24px;
          border-top: 1px dashed #d8cfc3;
        }

        .cr-job h4 {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #888888;
          margin: 0 0 14px;
        }

        .cr-list-items {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cr-list-items li {
          position: relative;
          padding-left: 22px;
          font-size: 15px;
          line-height: 1.6;
          color: #444444;
        }

        .cr-list-items li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 10px;
          height: 2px;
          background: var(--brand-orange);
        }

        /* Closing: black strip with orange button */
        .cr-end {
          background: var(--brand-black);
          padding: 96px 0;
        }

        .cr-end-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        .cr-end h2 {
          color: #ffffff;
          font-size: clamp(28px, 3.6vw, 40px);
        }

        .cr-end p {
          font-size: 17px;
          color: #bbbbbb;
          margin: 14px 0 0;
        }

        .cr-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 32px;
          background: var(--brand-orange);
          color: #ffffff;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .cr-btn:hover {
          transform: translate(-2px, -2px);
          background: #ffffff;
          color: var(--brand-black);
        }

        .cr-apply:focus-visible,
        .cr-btn:focus-visible {
          outline: 2px dashed var(--brand-orange);
          outline-offset: 4px;
        }

        /* Tablet and mobile */
        @media (max-width: 860px) {
          .cr-hero {
            padding: 120px 0 80px;
          }

          .cr-perk-row {
            grid-template-columns: 1fr;
          }

          .cr-perk,
          .cr-perk + .cr-perk {
            padding: 36px 0;
            padding-left: 0;
            border-left: none;
          }

          .cr-perk + .cr-perk {
            border-top: 1px solid #e6e6e6;
          }

          .cr-job-cols {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 560px) {
          .cr-job {
            padding: 30px 24px 28px 28px;
          }

          .cr-job-head {
            flex-direction: column;
            gap: 10px;
          }

          .cr-job-no {
            padding-top: 0;
          }

          .cr-apply {
            width: 100%;
            justify-content: center;
          }

          .cr-jobs {
            padding: 80px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cr-dot {
            animation: none;
          }

          .cr-job,
          .cr-job::before,
          .cr-apply,
          .cr-btn {
            transition: none;
          }

          .cr-job:hover::before {
            transform: scaleY(0.25);
          }

          .cr-apply:hover,
          .cr-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}