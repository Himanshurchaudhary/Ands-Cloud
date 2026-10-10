import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const metadata = {
  metadataBase: new URL("https://andscloud.com"),
  title: {
    default: "ANDS Cloud Tech Solutions",
    template: "%s | ANDS Cloud Tech Solutions",
  },
  description:
    "ANDS Cloud Tech Solutions - web development, mobile apps, cloud hosting aur custom software services.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ANDS Cloud Tech Solutions",
    description:
      "Web development, mobile apps, cloud hosting aur custom software services.",
    url: "https://andscloud.com",
    siteName: "ANDS Cloud Tech Solutions",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}