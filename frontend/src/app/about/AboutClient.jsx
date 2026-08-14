"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { getSettings } from "@/lib/api";
import About from "@/app/about/components/About.jsx";
import Skills from "@/app/about/components/Skills.jsx";
import Education from "./components/Education";
import Quote from "./components/quote";
import DecryptedText from "@/components/ui/DecryptedText";
import Footer from "@/components/Footer/Footer";

const resolveImage = (path) => {
  if (!path) return "/images/Me/Me2.jpg";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("/uploads") || path.startsWith("uploads")) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
      : "https://my-portfolio-kn46.onrender.com";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${backendUrl}${cleanPath}`;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath;
};

const AboutClient = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getSettings().then(setSettings);
  }, []);

  const handleDownloadCV = () => {
    const cvUrl = settings?.resumeUrl || "/RItik.pdf";
    if (cvUrl.includes("res.cloudinary.com") && cvUrl.includes("/image/upload/")) {
      const downloadUrl = cvUrl.replace("/image/upload/", "/image/upload/fl_attachment/");
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    window.open(cvUrl, "_blank");
  };

  return (
    <>
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 sm:px-10 md:px-16 lg:px-20 max-w-7xl mx-auto">
          {/* Subtle Grid Background Lattice */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_90%)]"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
            {/* Left Content Column (Below photo on mobile, left on desktop) */}
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-6 sm:space-y-7">
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-baseline gap-3"
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black">
                  <span
                    className="italic font-serif font-normal text-gray-500 mr-3"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    About
                  </span>
                  <DecryptedText
                    text="me"
                    animateOn="view"
                    loop={true}
                    autoInterval={3000}
                    speed={50}
                    maxIterations={10}
                    encryptedClassName="text-gray-400 font-mono"
                  />
                </h1>
              </motion.div>

              {/* Bio Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl font-normal"
              >
                {settings?.bio ||
                  "Not that average pick-me guy. I'm a full-stack developer, designer, and a tech enthusiast. I love to design beautiful and user-friendly interfaces. Always curious to learn new things :)"}
              </motion.p>

              {/* Action Buttons Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                {/* My CV Button */}
                <button
                  onClick={handleDownloadCV}
                  className="px-7 py-3 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  My CV
                </button>

                {/* My Projects Button */}
                <Link
                  href="/projects"
                  className="px-7 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  My Projects
                </Link>
              </motion.div>

              {/* Social Icons Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3 pt-2"
              >
                {/* GitHub */}
                <a
                  href={settings?.githubUrl || "https://github.com/Ritikvarun"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 rounded-xl bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faGithub} className="text-lg" />
                </a>

                {/* LinkedIn */}
                <a
                  href={settings?.linkedinUrl || "https://www.linkedin.com/in/ritik-varun-0b6795274/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-xl bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
                </a>

                {/* Instagram */}
                <a
                  href={settings?.instagramUrl || "https://www.instagram.com/arjun_rk_0021"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-10 h-10 rounded-xl bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                </a>

                {/* Email */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(settings?.contactEmail || "ritikvarun64@gmail.com")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send Email via Gmail"
                  title="Open Gmail to send email"
                  className="w-10 h-10 rounded-xl bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-base" />
                </a>
              </motion.div>
            </div>

            {/* Right Visual Image (Enlarged - on top on mobile, right on desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 order-1 lg:order-2 relative flex justify-center lg:justify-end items-center"
            >
              {/* Soft Ambient Gray Glow */}
              <div className="absolute w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-slate-400/20 blur-3xl -z-1 pointer-events-none" />

              <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[500px] aspect-[4/5] overflow-hidden shadow-2xl shadow-black/15 ring-1 ring-black/10 hover:scale-[1.01] transition-all duration-500">
                <Image
                  src={resolveImage(settings?.aboutImage)}
                  alt="Ritik Varun - Full Stack Developer"
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>
        {/* Hero End */}

        {/* Detailed Story & Image Grid */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Education Section */}
        <Education />

        {/* Quote Section */}
        <Quote />
      </main>

      {/* Modern Contact Hub Footer */}
      <Footer />
    </>
  );
};

export default AboutClient;
