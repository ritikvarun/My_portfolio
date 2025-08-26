import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Ritik Varun | Portfolio",
  description:
    "My name is Ritik Varun, I'm a web developer and I'm passionate about it. I'm currently studying at Uttam Institute of Technology and Management.",

  author: "Ritik Varun",
  siteUrl: "https://www.RitikVarun.my.id",
  applicationName: "Ritik",

  keywords: [
    "Ritik",
    "Ritik Varun",
    "varun",
    "ritik varun",
    "varun ritik",
    "ritik portfolio",
  ],

  openGraph: {
    type: "website",
    url: "https://www.RitikVarun.my.id",
    title: "Ritik Varun | Portfolio",
    site_name: "Ritik Varun | Portfolio",
    description: "My name is Ritik Varun, This is my portfolio website.",
    images: [
      {
        url: "/images/logo.svg",
        alt: "Ritik Varun",
        width: 1200,
        height: 630,
      },
    ],
  },

  alternates: {
    canonical: "https://www.RitikVarun.my.id",
  },

  icons: {
    icon: "/images/logo.svg",      // ✅ favicon
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
