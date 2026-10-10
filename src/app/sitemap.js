const baseUrl = "https://andscloud.com";

export default function sitemap() {
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/blog/why-choose-nextjs-for-business-websites", priority: 0.7 },
    { path: "/blog/steps-to-launch-a-mobile-app", priority: 0.7 },
    { path: "/blog/choosing-hosting-for-your-website", priority: 0.7 },
    { path: "/careers", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/blog") ? "monthly" : "weekly",
    priority,
  }));
}