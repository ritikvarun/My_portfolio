"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import Marquee from "@/components/Marquee";
// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { getSettings } from "@/lib/api";
import { cn } from "@/lib/utils";
import PageLoader from "@/components/Preloader/PageLoader";
import SkillsMarquee from "@/components/SkillsMarquee/SkillsMarquee";
import ProjectsShowcase from "@/components/ProjectsShowcase/ProjectsShowcase";
import CursorGrid from "./CursorGrid";
import DecryptedText from "@/components/ui/DecryptedText";
import Footer from "@/components/Footer/Footer";

const resolveImage = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("/uploads") || path.startsWith("uploads")) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
      : "http://localhost:5000";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${backendUrl}${cleanPath}`;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath;
};

const resolveWhatsappUrl = (val) => {
  if (!val) return "";
  if (val.startsWith("http://") || val.startsWith("https://")) {
    return val;
  }
  const cleanNumber = val.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}`;
};

const HeroMain = () => {
  const [settings, setSettings] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleDownloadCV = () => {
    if (!settings?.resumeUrl) return;
    const cvUrl = settings.resumeUrl;

    // For Cloudinary image/upload PDFs — inject fl_attachment to force download
    if (
      cvUrl.includes("res.cloudinary.com") &&
      cvUrl.includes("/image/upload/")
    ) {
      const downloadUrl = cvUrl.replace(
        "/image/upload/",
        "/image/upload/fl_attachment/",
      );
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // For anything else — open directly in new tab
    window.open(cvUrl, "_blank");
  };

  return (
    <>
      {loaderVisible && (
        <PageLoader
          isLoading={!settings}
          onLoadingComplete={() => setLoaderVisible(false)}
        />
      )}
      {settings && (
        <>
          {/* // MainSection Start */}
          <div
            className={cn(
              "relative",
              "mx-auto",
              "mt-10",
              "grid",
              "grid-cols-1",
              "gap-4",
              "p-10",
              "md:grid-cols-2",
              "md:px-20",
              "overflow-hidden",
            )}
          >
            {/* Image Section Start */}
            <div className="relative flex justify-center items-center overflow-hidden rounded-2xl">
              {/* Background Cursor Grid behind image only */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <CursorGrid
                  cellSize={70}
                  color="#6B7280"
                  radius={150}
                  falloff="smooth"
                  holdTime={800}
                  fadeDuration={1800}
                  lineWidth={1.2}
                  maxOpacity={0.8}
                  fillOpacity={0}
                  gridOpacity={0}
                  cellRadius={0}
                  clickPulse
                  pulseSpeed={280}
                  autoFlash={true}
                  flashInterval={3800}
                />
              </div>

              <motion.div
                className={cn(
                  "relative",
                  "z-10",
                  "md:flex",
                  "col-span-1",
                  "mx-auto",
                  "justify-center",
                  "items-center",
                )}
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.7,
                  type: "spring",
                }}
              >
                <div
                  className={cn(
                    "rounded-full",
                    "h-auto",
                    "w-[330px]",
                    "md:w-auto",
                    "m-auto",
                    "lg:px-12",
                    "hover:grayscale-0",
                    "transition-all",
                    "ease",
                    "duration-300",
                  )}
                >
                  <Image
                    src={resolveImage(settings.profileImage)}
                    height={550}
                    width={400}
                    alt={settings.developerName}
                    className={cn("w-full", "h-full", "object-cover")}
                  />
                </div>
              </motion.div>
            </div>
            {/* Image Section End  */}

            {/* Text Section Start */}
            <div className="relative z-10">
              <motion.h3
                className={cn(
                  "uppercase",
                  "text-xl",
                  "mb-3",
                  "font-normal",
                  "text",
                  "tracking-[.5rem]",
                  "text-gray-500",
                )}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                }}
              >
                <DecryptedText
                  text={settings.developerName || "Ritik Varun"}
                  animateOn="view"
                  loop={true}
                  autoInterval={3000}
                  speed={45}
                  maxIterations={12}
                  encryptedClassName="text-gray-400 font-mono"
                />
              </motion.h3>
              <motion.h1
                className={cn(
                  "text-black",
                  "text-5xl",
                  "md:text-6xl",
                  "lg:text-7xl",
                  "2xl:text-8xl",
                  "font-bold",
                  "my-2",
                  "md:my-5",
                )}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                }}
              >
                <DecryptedText
                  text={settings.developerTitle || "Full Stack MERN Developer"}
                  animateOn="view"
                  loop={true}
                  autoInterval={3000}
                  speed={35}
                  maxIterations={14}
                  encryptedClassName="text-gray-400 font-mono"
                />
              </motion.h1>
              <motion.p
                className={cn(
                  "title",
                  "text-md",
                  "2xl:text-xl",
                  "mt-4",
                  "tracking-wider",
                  "text-gray-500",
                  "leading-[1.7rem]",
                )}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                }}
              >
                {settings.bio}
              </motion.p>

              <motion.div
                className={cn("flex", "items-center", "gap-4", "mt-10")}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                }}
              >
                <Button variation="primary">
                  <Link href="/projects">
                    Projects
                  </Link>
                </Button>
                <Button variation="outline">
                  <Link href="/about">
                    About Me
                  </Link>
                </Button>
              </motion.div>
            </div>
            {/* Text Section End */}
          </div>
          {/* // MainSection End */}
          {/* Skills Infinite Marquee Section Start */}
          <SkillsMarquee />
          {/* Skills Infinite Marquee Section End */}
          {/* About Section Start */}
          <section className="my-24 px-6 sm:px-10 md:px-16 lg:px-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* About Text Section */}
              <motion.div
                className="lg:col-span-7 space-y-6 order-2 lg:order-1"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/5 border border-zinc-900/10 text-xs font-semibold tracking-widest uppercase text-zinc-700">
                  <span className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" />
                  About Me
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
                  <DecryptedText
                    text="Crafting Modern Web Experiences with Passion & Code"
                    speed={30}
                    maxIterations={10}
                    loop={true}
                    autoInterval={3000}
                    encryptedClassName="text-zinc-400 font-mono"
                  />
                </h2>

                <div className="p-6 sm:p-7 rounded-3xl bg-white/70 backdrop-blur-md border border-zinc-200/80 shadow-lg shadow-black/5 space-y-4">
                  <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-normal">
                    {settings.aboutQuote || "A dedicated Full Stack Developer passionate about creating intuitive, responsive, and high-performance digital solutions."}
                  </p>
                  <div className="pt-3 border-t border-zinc-200/60">
                    <Marquee />
                  </div>
                </div>

                {/* Tech Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-zinc-100/90 border border-zinc-200/70 text-center">
                    <p className="text-lg font-bold text-zinc-900">MERN</p>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">Stack Architecture</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-zinc-100/90 border border-zinc-200/70 text-center">
                    <p className="text-lg font-bold text-zinc-900">Next.js</p>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">React & Performance</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-zinc-100/90 border border-zinc-200/70 text-center col-span-2 sm:col-span-1">
                    <p className="text-lg font-bold text-zinc-900">Clean UI</p>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">Modern UX Design</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variation="primary">
                    <Link href="/about" className="inline-flex items-center gap-2">
                      <span>Explore Full Journey</span>
                      <span className="text-lg leading-none">→</span>
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* About Image Section */}
              <motion.div
                className="lg:col-span-5 relative flex justify-center items-center order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Ambient backdrop glow */}
                <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-slate-400/20 via-zinc-300/30 to-transparent blur-3xl -z-1 pointer-events-none" />

                <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] aspect-[4/5] overflow-hidden shadow-2xl shadow-black/15 ring-1 ring-black/10 hover:scale-[1.01] transition-all duration-500">
                  <Image
                    src={resolveImage(settings.aboutImage)}
                    fill
                    className="object-cover"
                    alt="About Ritik Varun"
                  />
                </div>

                {/* Floating identity badge */}
                <div className="absolute -bottom-4 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl border border-zinc-200/80 flex items-center gap-3 z-20">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
                    RV
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">{settings.developerName || "Ritik Varun"}</p>
                    <p className="text-[10px] text-zinc-500 font-medium">{settings.developerTitle || "Full Stack Developer"}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          {/* About Section End */}
          {/* Project Section Start */}
          <ProjectsShowcase />
          {/* Project Section End */}
          {/* Footer & Contact Hub Start */}
          <Footer />
          {/* Footer & Contact Hub End */}
          {/* Contact Section End */}
        </>
      )}
    </>
  );
};

export default HeroMain;
