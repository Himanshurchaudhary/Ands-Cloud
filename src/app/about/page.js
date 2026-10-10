import About from "@/components/sections/About/About";

// SEO metadata for the About page (used in the browser tab and search results)
export const metadata = {
  title: "About Us",
  description:
    "Learn about ANDS Cloud Tech Solutions, our story, mission, vision and the values behind our web, mobile and cloud services.",
};

export default function AboutPage() {
  return <About />;
}