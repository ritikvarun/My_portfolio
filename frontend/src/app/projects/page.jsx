import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Projects | Ritik Varun Portfolio",
  description:
    "Explore web development and full-stack software projects created by Ritik Varun. Featuring modern web apps, APIs, and custom software solutions.",
  keywords: [
    "Ritik Varun Projects",
    "Ritik Varun Web Applications",
    "Ritik Varun Portfolio Projects",
    "Web Developer Projects",
    "Ritik",
    "varun",
    "ritik varun",
    "Ritik varun",
  ],
  openGraph: {
    title: "Projects | Ritik Varun Portfolio",
    description:
      "Explore web development and full-stack software projects created by Ritik Varun.",
    url: "https://www.ritikvarun.me/projects",
  },
  alternates: {
    canonical: "https://www.ritikvarun.me/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
