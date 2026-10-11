import About from "@/components/sections/About/About";

export const metadata = {
  title: "About ANDS Cloud - Software Company in Patna",
  description:
    "ANDS Cloud (ANDS Cloud Tech Solutions) is a Patna-based software company building web, mobile and cloud solutions. Learn our story, mission, vision and values.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ANDS Cloud | ANDS Cloud Tech Solutions",
    description:
      "ANDS Cloud is a Patna-based software company for web, mobile and cloud solutions.",
    url: "https://andscloud.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <About />;
}