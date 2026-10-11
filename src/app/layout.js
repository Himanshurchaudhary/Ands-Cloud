import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const SITE_URL = "https://andscloud.com";

// Jab LinkedIn / Instagram / Facebook profile ban jaye, unke links yahan daalo
const socialLinks = [
  // "https://www.linkedin.com/company/your-page",
  // "https://www.instagram.com/your-page",
  // "https://www.facebook.com/your-page",
];

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ANDS Cloud - Web, Mobile App & Cloud Software Company in Patna",
    template: "%s | ANDS Cloud",
  },
  description:
    "ANDS Cloud (ANDS Cloud Tech Solutions) builds websites, mobile apps, cloud hosting and custom software for businesses across India. Based in Patna, Bihar.",
  openGraph: {
    title: "ANDS Cloud - Web, Mobile App & Cloud Software Company in Patna",
    description:
      "Websites, mobile apps, cloud hosting and custom software for businesses across India.",
    url: SITE_URL,
    siteName: "ANDS Cloud Tech Solutions",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Organization schema: Google ko batata hai ki "ANDS Cloud" ki official site yahi hai
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ANDS Cloud Tech Solutions",
  alternateName: "ANDS Cloud",
  url: SITE_URL,
  email: "support@andscloud.com",
  telephone: "+91 7563883929",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}