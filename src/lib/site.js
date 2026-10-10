// Shared site-wide values used by SEO metadata across pages
export const SITE_NAME = "ANDS Cloud Tech Solutions";

// Base URL of the website. Set NEXT_PUBLIC_SITE_URL in .env.local (and in hosting) to your real domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");