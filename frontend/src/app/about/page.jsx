import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Ritik Varun | Full Stack & Web Developer",
  description:
    "Learn more about Ritik Varun, a web developer studying at Uttam Institute of Technology and Management. Discover his skills, education background, and tech experience.",
  keywords: [
    "About Ritik Varun",
    "Ritik Varun Bio",
    "Ritik Varun Education",
    "Ritik Varun Web Developer",
    "Ritik",
    "varun",
    "ritik varun",
    "Ritik varun",
  ],
  openGraph: {
    title: "About Ritik Varun | Web Developer",
    description:
      "Learn more about Ritik Varun, a web developer studying at Uttam Institute of Technology and Management.",
    url: "https://www.ritikvarun.me/about",
  },
  alternates: {
    canonical: "https://www.ritikvarun.me/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
