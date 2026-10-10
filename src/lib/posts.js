// Blog posts. Add a new object here to publish a new article.
// body: each string is one paragraph.
// image: path to the WebP file inside the public folder (for example public/posts/my-post.webp).
// imageAlt: a short description of the picture, used by screen readers and search engines.
export const posts = [
  {
    slug: "why-choose-nextjs-for-business-websites",
    title: "Why Next.js Is a Strong Choice for Business Websites",
    summary:
      "Next.js gives you fast pages, good SEO and easy hosting. Here is why many businesses choose it.",
    date: "2026-09-15",
    author: "ANDS Cloud Team",
    tags: ["Web Development", "Next.js", "SEO"],
    image: "/posts/Modern Workspace Website Mockup.webp",
    imageAlt: "A business website built with Next.js, shown on a laptop screen",
    body: [
      "A business website needs to load fast, rank well in search engines and be easy to update. Next.js covers all three needs in one framework.",
      "Pages can be rendered on the server or built ahead of time, so visitors see content quickly. Search engines can read the content easily, which helps SEO.",
      "If you plan to grow later with a dashboard, user accounts or an online store, the same project can handle those features without a rewrite.",
    ],
  },
  {
    slug: "steps-to-launch-a-mobile-app",
    title: "Steps to Launch a Mobile App on the Play Store",
    summary:
      "From a working build to a published app, here are the main steps and common mistakes to avoid.",
    date: "2026-08-20",
    author: "ANDS Cloud Team",
    tags: ["Mobile Apps", "React Native", "Play Store"],
    image: "/posts/Modern Checklist App Desk Scene.webp",
    imageAlt: "A smartphone showing a mobile app ready for release on the Play Store",
    body: [
      "Publishing an app takes more than a working build. You need a signed release, a privacy policy URL, store listing content and test coverage on real devices.",
      "Keep the signing key safe from day one. A mismatched key can block future updates, so store it in a secure place and back it up.",
      "Review the store policies before you submit, and prepare screenshots that show the real app experience.",
    ],
  },
  {
    slug: "choosing-hosting-for-your-website",
    title: "How to Choose the Right Hosting for Your Website",
    summary:
      "Shared hosting, VPS, or a managed platform: each suits different needs. Here is how to decide.",
    date: "2026-07-05",
    author: "ANDS Cloud Team",
    tags: ["Cloud & Hosting", "VPS", "Deployment"],
    image: "/posts/Cloud Upload Server Stack.webp",
    imageAlt: "Server racks and cloud hosting infrastructure for a website",
    body: [
      "The right hosting depends on traffic, budget and how much control you need. A small brochure site does well on a managed platform.",
      "A VPS gives full control and is useful for custom backends and databases, but it needs regular maintenance and security updates.",
      "Whatever you choose, set up an SSL certificate, automated backups and uptime monitoring from the start.",
    ],
  },
];

// Find one post by its slug. Returns undefined if not found.
export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

// Format "2026-09-15" as "15 Sep 2026" for display
export function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}