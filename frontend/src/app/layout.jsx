import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  metadataBase: new URL("https://www.ritikvarun.my.id"),
  title: {
    default: "Ritik Varun | Full Stack & Web Developer Portfolio",
    template: "%s | Ritik Varun",
  },
  description:
    "Official Portfolio of Ritik Varun - Web Developer & Full Stack Software Engineer. Explore my projects, skills, education, and technical code notes.",
  author: "Ritik Varun",
  applicationName: "Ritik Varun Portfolio",
  keywords: [
    "Ritik",
    "Ritik Varun",
    "varun",
    "ritik varun",
    "varun ritik",
    "Ritik varun",
    "ritik portfolio",
    "Ritik Varun portfolio",
    "Ritik Varun Web Developer",
    "Full Stack Developer Ritik Varun",
    "Software Engineer Portfolio",
  ],
  verification: {
    google: "s_IXJ79C6e3hQYHygqegGmpszew91H6z5O_uSeRslKU",
  },
  openGraph: {
    type: "website",
    url: "https://www.ritikvarun.my.id",
    title: "Ritik Varun | Web Developer Portfolio",
    siteName: "Ritik Varun Portfolio",
    description:
      "Explore Ritik Varun's portfolio featuring modern web applications, frontend & backend projects, and developer notes.",
    images: [
      {
        url: "/images/logo.svg",
        alt: "Ritik Varun Portfolio Logo",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritik Varun | Web Developer Portfolio",
    description: "Explore Ritik Varun's portfolio featuring modern web applications and projects.",
    images: ["/images/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.ritikvarun.my.id",
  },
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.ritikvarun.my.id/#person",
        name: "Ritik Varun",
        alternateName: ["Ritik", "varun", "ritik varun", "varun ritik"],
        url: "https://www.ritikvarun.my.id",
        jobTitle: "Web Developer & Full Stack Engineer",
        sameAs: [
          "https://github.com/ritikvarun",
          "https://www.linkedin.com/in/ritikvarun",
        ],
        description:
          "Ritik Varun is a passionate Web Developer studying at Uttam Institute of Technology and Management, building modern web applications.",
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ritikvarun.my.id/#website",
        url: "https://www.ritikvarun.my.id",
        name: "Ritik Varun Portfolio",
        publisher: {
          "@id": "https://www.ritikvarun.my.id/#person",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="s_IXJ79C6e3hQYHygqegGmpszew91H6z5O_uSeRslKU" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
