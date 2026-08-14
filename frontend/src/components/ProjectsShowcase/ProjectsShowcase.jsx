"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjects } from "@/lib/api";
import DecryptedText from "@/components/ui/DecryptedText";

const resolveProjectImage = (img) => {
  if (!img) return "/images/projects/p1.jpg";
  if (img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }
  if (img.startsWith("/uploads") || img.startsWith("uploads")) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
      : "https://my-portfolio-kn46.onrender.com";
    const cleanPath = img.startsWith("/") ? img : `/${img}`;
    return `${backendUrl}${cleanPath}`;
  }
  const cleanPath = img.startsWith("/") ? img : `/${img}`;
  return cleanPath;
};

// Short tag display name helper
const getShortName = (name) => {
  if (!name) return "Project";
  if (name.toLowerCase().includes("shopx")) return "ShopX";
  if (name.toLowerCase().includes("employee") || name.toLowerCase().includes("ems")) return "EMS Portal";
  if (name.toLowerCase().includes("cara")) return "Cara Store";
  if (name.toLowerCase().includes("linkedin")) return "LinkedIn Clone";
  return name.split(" ")[0];
};

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  const displayProjects = projects.slice(0, 6);

  return (
    <section className="relative w-full py-20 bg-[#f8fafc] text-slate-900 overflow-hidden select-none border-t border-slate-200/80">
      {/* Ambient background light glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vmax] h-[55vmax] rounded-full bg-lime-400/[0.06] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[35vmax] h-[35vmax] rounded-full bg-blue-400/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold tracking-widest uppercase text-slate-700 shadow-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
            Selected Works
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[0.2em] text-slate-950 uppercase"
            style={{ fontFamily: '"Courier New", Courier, monospace' }}
          >
            <DecryptedText
              text="PROJECTS"
              animateOn="view"
              loop={true}
              autoInterval={2000}
              speed={45}
              maxIterations={12}
              sequential={true}
              revealDirection="start"
              encryptedClassName="text-slate-400 font-mono"
            />
          </h2>
        </motion.div>

        {/* 2-Column Grid for balanced layout (1 on mobile, 2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayProjects.map((project, index) => {
            const projectImg =
              project.images && project.images.length > 0
                ? project.images[0]
                : "/images/projects/p1.jpg";

            const projectUrl = project.demo || project.github || "/projects";

            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md shadow-slate-200/50 transition-all duration-300 hover:border-slate-400 hover:shadow-xl hover:-translate-y-1.5 aspect-[16/10]"
              >
                <a
                  href={projectUrl}
                  target={projectUrl.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="block w-full h-full relative"
                >
                  {/* Project Preview Image */}
                  <img
                    src={resolveProjectImage(projectImg)}
                    alt={project.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "/images/projects/p1.jpg";
                    }}
                  />

                  {/* Subtle Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent pointer-events-none" />

                  {/* Monochromatic Tag at Bottom Left */}
                  <div className="absolute bottom-0 left-0 z-10">
                    <span
                      className="inline-block bg-slate-900 text-white font-mono font-bold text-xs sm:text-sm px-3.5 py-1.5 tracking-wider rounded-tr-xl shadow-md select-none uppercase"
                      style={{ fontFamily: '"Courier New", Courier, monospace' }}
                    >
                      {getShortName(project.name)}
                    </span>
                  </div>

                  {/* Hover External Link Indicator */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-slate-200 backdrop-blur-md flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-sm">
                    <span className="text-xs font-bold">↗</span>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Centered "Check out all ➔" Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-14 md:mt-16 flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-sm sm:text-base border border-slate-800 shadow-xl transition-all duration-200 hover:gap-4 active:scale-95"
          >
            <span>Check out all</span>
            <span className="text-lg">➔</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
