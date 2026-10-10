// Single source of truth for all portfolio projects.
// Used by the portfolio list page, project detail pages and the sitemap.
//
// liveUrl: the public live link. Leave it "" if the project has no public URL yet
// (the "Visit live project" button will then be hidden automatically).
// Only list projects whose clients have agreed to public listing.

export const projects = [
  {
  slug: "the-orchard-engine",
  title: "The Orchard Engine",
  category: "Web",
  year: "2025",
  summary:
    "Online grocery e-commerce platform designed to help customers explore grocery products and order fresh essentials online.",
  description:
    "The Orchard Engine is an online grocery e-commerce website built to provide customers with a convenient online shopping experience. The platform uses a React-based frontend and a Node.js and Express backend, with MySQL for database management. It includes a responsive user interface, online payment technology, and web technologies configured for a smooth browsing experience.",
  features: [
    "Online grocery shopping experience",
    "Product browsing and discovery",
    "Responsive design for desktop and mobile devices",
    "React-based frontend with client-side routing",
    "Node.js and Express backend",
    "MySQL database integration",
    "Razorpay payment integration",
    "Progressive Web App (PWA) support",
    "Open Graph metadata for social media sharing",
    "Website deployment and hosting on Hostinger",
  ],
  tech: [
    "React",
    "React Router",
    "Node.js",
    "Express.js",
    "MySQL",
    "Tailwind CSS",
    "Razorpay",
    "PWA",
    "Open Graph",
    "HTTP/3",
    "Hostinger",
  ],
  liveUrl: "https://theorchardengine.com/",
},
  {
  slug: "orchard-engine-app",
  title: "Orchard Engine - Grocery App",
  category: "Mobile App",
  year: "2026",
  summary:
    "A React Native grocery shopping app that allows customers to browse products, explore categories, manage their cart, and place grocery orders conveniently.",
  description:
    "Orchard Engine is a grocery shopping mobile application developed using React Native for Android. The app provides a convenient shopping experience where customers can browse groceries, fruits, vegetables, and other daily essentials. It connects with the backend API to support product browsing, category navigation, cart management, and order placement. The application is integrated with The Orchard Engine e-commerce platform and is published on the Google Play Store.",
  features: [
    "Cross-platform mobile app development using React Native",
    "Browse groceries, fruits, and vegetables",
    "Product categories and product listings",
    "Shopping cart management",
    "Online grocery order placement",
    "Backend API integration",
    "Mobile-friendly user interface",
    "Android app deployment on Google Play Store",
  ],
  tech: [
    "React Native",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MySQL",
    "REST API",
  ],
  liveUrl:
    "https://play.google.com/store/apps/details?id=com.cloud.orchard",
},
  {
  slug: "kolkata-kart",
  title: "Kolkata Kart - Grocery E-commerce",
  category: "Web",
  year: "2026",
  summary:
    "An online grocery e-commerce platform designed to help customers browse products and conveniently order groceries and daily essentials online.",
  description:
    "Kolkata Kart is an online grocery shopping platform built with React and Tailwind CSS to deliver a responsive and user-friendly shopping experience. The frontend uses React Router for navigation, while Express.js supports the web application backend. The website includes Razorpay as a detected payment technology, Hostinger hosting and CDN infrastructure, and Open Graph metadata for social media sharing.",
  features: [
    "Online grocery shopping platform",
    "React-based frontend",
    "Client-side navigation with React Router",
    "Responsive UI using Tailwind CSS",
    "Express.js web application backend",
    "Razorpay payment technology",
    "Hostinger hosting and CDN",
    "Open Graph metadata for social media sharing",
    "HTTP/3 support",
  ],
  tech: [
    "React",
    "React Router",
    "Express.js",
    "Tailwind CSS",
    "Razorpay",
    "Goober",
    "Open Graph",
    "HTTP/3",
    "Hostinger CDN",
    "Hostinger",
  ],
  liveUrl: "https://www.kolkatakart.in/",
},
  {
  slug: "kolkata-kart-seller-app",
  title: "Kolkata Kart - Seller App",
  category: "Mobile App",
  year: "2026",
  summary:
    "A seller management mobile application designed to help grocery vendors manage their online store, products, inventory, and customer orders.",
  description:
    "Kolkata Kart Seller App is a mobile application designed to help vendors manage their business on the Kolkata Kart e-commerce platform. It provides sellers with a convenient way to manage store operations, maintain product listings, and handle incoming orders from their mobile devices. The app complements the Kolkata Kart customer-facing shopping platform and helps streamline day-to-day seller operations.",
  features: [
    "Seller-focused mobile application",
    "Online store management",
    "Product listing management",
    "Order management",
    "Inventory and stock management",
    "Vendor business management",
    "Integration with the Kolkata Kart platform",
    "Android app distribution through Google Play Store",
  ],
  tech: [
    "Mobile App",
    "Android",
    "REST API",
  ],
  liveUrl:
    "https://play.google.com/store/apps/details?id=com.andscloud.kolkatakartsellerapp",
},
  {
  slug: "docedge-clinic-management",
  title: "DocEdge - Clinic Management System",
  category: "Web",
  year: "2026",
  summary:
    "A clinic management platform designed to help doctors manage patient records, digital prescriptions, appointments, billing, and everyday clinic operations.",
  description:
    "DocEdge is a healthcare management platform designed to simplify daily operations for doctors and clinics. It provides a digital workspace for managing patient information, creating and customizing prescriptions, organizing clinical records, and streamlining administrative workflows. The platform is built with a React-based frontend and uses React Router for navigation. Its production infrastructure includes Nginx on Ubuntu, Cloudflare CDN, and security and analytics tools to support website performance, monitoring, and protection.",
  features: [
    "Clinic and patient record management",
    "Digital prescription management",
    "Customizable prescription workflows",
    "Patient information management",
    "Doctor-focused clinic workflows",
    "React-based frontend interface",
    "Client-side navigation using React Router",
    "reCAPTCHA integration for security",
    "Website analytics using Google Analytics 4",
    "User behavior insights with Microsoft Clarity",
    "Google Tag Manager integration",
    "Cloudflare CDN integration",
    "Nginx web server and reverse proxy",
    "Ubuntu-based server infrastructure",
  ],
  tech: [
    "React",
    "React Router",
    "Lucide",
    "Nginx",
    "Ubuntu",
    "Cloudflare",
    "Google Analytics 4",
    "Microsoft Clarity",
    "Google Tag Manager",
    "reCAPTCHA",
    "cdnjs",
  ],
  liveUrl: "https://docedge.in/",
},
  
];

// "All" plus each unique category, used by the filter buttons
export const categories = ["All", ...new Set(projects.map((p) => p.category))];

// Find one project by its URL slug. Returns undefined if not found.
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}