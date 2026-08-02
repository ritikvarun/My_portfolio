import NotesClient from "./NotesClient";

export const metadata = {
  title: "Notes & Code Snippets | Ritik Varun",
  description:
    "A collection of developer guides, code snippets, configurations, and tech solutions published by Ritik Varun.",
  keywords: [
    "Ritik Varun Notes",
    "Ritik Varun Code Snippets",
    "Developer Guides Ritik Varun",
    "Programming Notes",
    "Ritik",
    "varun",
    "ritik varun",
    "Ritik varun",
  ],
  openGraph: {
    title: "Notes & Code Snippets | Ritik Varun",
    description:
      "A collection of developer guides, code snippets, configurations, and tech solutions published by Ritik Varun.",
    url: "https://www.ritikvarun.my.id/notes",
  },
  alternates: {
    canonical: "https://www.ritikvarun.my.id/notes",
  },
};

export default function NotesPage() {
  return <NotesClient />;
}
