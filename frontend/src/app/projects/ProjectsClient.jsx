"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProjects } from "@/lib/api";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DecryptedText from "@/components/ui/DecryptedText";
import Footer from "@/components/Footer/Footer";

const resolveImage = (path) => {
  if (!path) return "/images/projects/p1.jpg";
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

const getShortName = (name) => {
  if (!name) return "Project";
  if (name.toLowerCase().includes("shopx")) return "ShopX";
  if (name.toLowerCase().includes("employee") || name.toLowerCase().includes("ems"))
    return "EMS Portal";
  if (name.toLowerCase().includes("cara")) return "Cara Store";
  if (name.toLowerCase().includes("linkedin")) return "LinkedIn Clone";
  return name;
};

const CATEGORIES = [
  "Full Stack",
  "Frontend",
  "Website Template",
  "Creative Website",
  "AI Project",
  "Other",
];

export default function ProjectsClient() {
  const [projects, setProjects] = useState([]);
  const [lightboxState, setLightboxState] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  // Keyboard navigation for image lightbox (Arrows + Escape)
  useEffect(() => {
    if (!lightboxState) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxState(null);
      } else if (e.key === "ArrowRight") {
        setLightboxState((prev) =>
          prev
            ? {
                ...prev,
                currentIndex: (prev.currentIndex + 1) % prev.images.length,
              }
            : null
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxState((prev) =>
          prev
            ? {
                ...prev,
                currentIndex:
                  (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
              }
            : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxState]);

  const getProjectsByCategory = (cat) => {
    return projects.filter((p) => {
      const pCat =
        p.category ||
        (p.name?.toLowerCase().includes("full") ||
        p.description?.toLowerCase().includes("full-stack")
          ? "Full Stack"
          : "Frontend");
      return pCat === cat;
    });
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 pt-24 pb-24 select-none">
      {/* Top Header Section with Wireframe Globe & "My Projects" (White Theme) */}
      <section className="relative w-full overflow-hidden border-b border-slate-200/80 pb-12 pt-8 md:pt-12 bg-white/60 backdrop-blur-sm">
        {/* Subtle Ambient Light Glows */}
        <div className="absolute top-0 left-1/4 w-[40vmax] h-[40vmax] rounded-full bg-slate-300/[0.15] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[35vmax] h-[35vmax] rounded-full bg-slate-200/[0.2] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          {/* Main Title Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-baseline"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-normal tracking-tight text-slate-950 flex items-baseline">
              <span className="font-sans font-bold">My </span>
              <span
                className="ml-3 sm:ml-4 italic font-serif text-gray-500"
                style={{ fontFamily: "Georgia, serif" }}
              >
                <DecryptedText
                  text="Projects"
                  animateOn="view"
                  loop={true}
                  autoInterval={2000}
                  speed={45}
                  maxIterations={12}
                  sequential={true}
                  revealDirection="start"
                  encryptedClassName="text-slate-400 font-mono"
                />
              </span>
            </h1>
          </motion.div>

          {/* Right Side: Wireframe Sphere & Item Count */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-6 self-end md:self-auto"
          >
            <div className="text-slate-700 font-mono text-sm sm:text-base font-semibold tracking-wider bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <span className="text-slate-900 font-bold mr-1">
                {projects.length}
              </span>{" "}
              items
            </div>

            {/* Wireframe 3D Globe Vector */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 opacity-30">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-slate-600 animate-[spin_40s_linear_infinite]"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              >
                <circle cx="50" cy="50" r="48" />
                <ellipse cx="50" cy="50" rx="48" ry="24" />
                <ellipse cx="50" cy="50" rx="48" ry="10" />
                <ellipse cx="50" cy="50" rx="24" ry="48" />
                <ellipse cx="50" cy="50" rx="10" ry="48" />
                <line x1="50" y1="2" x2="50" y2="98" strokeDasharray="2,2" />
                <line x1="2" y1="50" x2="98" y2="50" strokeDasharray="2,2" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categorized Projects Sections (Full Stack, Frontend, etc.) with 3-Column Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-14 flex flex-col gap-16">
        {CATEGORIES.map((cat) => {
          const catProjects = getProjectsByCategory(cat);
          if (catProjects.length === 0) return null;

          return (
            <div key={cat} className="flex flex-col gap-8">
              {/* Category Header with Divider */}
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-pulse" />
                  <h2
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase"
                    style={{ fontFamily: '"Jost", sans-serif' }}
                  >
                    {cat} Projects
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full shadow-2xs">
                  {catProjects.length}{" "}
                  {catProjects.length === 1 ? "project" : "projects"}
                </span>
              </div>

              {/* 3-Column Grid (1 col on mobile, 2 col on tablet, 3 col on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {catProjects.map((project, index) => {
                  const projectImg =
                    project.images && project.images.length > 0
                      ? project.images[0]
                      : "/images/projects/p1.jpg";

                  return (
                    <Dialog key={project.id || index}>
                      <DialogTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: index * 0.06 }}
                          className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md shadow-slate-200/50 transition-all duration-300 hover:border-slate-400 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer aspect-[16/10]"
                        >
                          {/* Project Preview Image */}
                          <img
                            src={resolveImage(projectImg)}
                            alt={project.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = "/images/projects/p1.jpg";
                            }}
                          />

                          {/* Subtle Bottom Gradient for Badge Contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent pointer-events-none" />

                          {/* Monochromatic Tag Badge at Bottom Left */}
                          <div className="absolute bottom-0 left-0 z-10">
                            <span
                              className="inline-block bg-slate-900 text-white font-mono font-bold text-xs sm:text-sm px-3.5 py-1.5 tracking-wider rounded-tr-xl shadow-md select-none uppercase"
                              style={{
                                fontFamily: '"Courier New", Courier, monospace',
                              }}
                            >
                              {getShortName(project.name)}
                            </span>
                          </div>

                          {/* Hover Inspect Indicator */}
                          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-white/90 border border-slate-200 backdrop-blur-md flex items-center gap-1 text-[11px] font-semibold text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
                            <span>Details</span>
                            <span>↗</span>
                          </div>
                        </motion.div>
                      </DialogTrigger>

                      {/* Clean White Theme Dialog Modal */}
                      <DialogContent
                        onInteractOutside={(e) => {
                          if (lightboxState) e.preventDefault();
                        }}
                        onEscapeKeyDown={(e) => {
                          if (lightboxState) {
                            e.preventDefault();
                            setLightboxState(null);
                          }
                        }}
                        className="sm:max-w-2xl bg-white border border-slate-200 text-slate-900 max-h-[85vh] overflow-y-auto shadow-2xl"
                      >
                        <DialogHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className="bg-slate-900 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded uppercase"
                              style={{
                                fontFamily: '"Courier New", Courier, monospace',
                              }}
                            >
                              {getShortName(project.name)}
                            </span>
                            <span className="text-xs font-mono font-medium text-slate-500">
                              {project.category || cat}
                            </span>
                          </div>
                          <DialogTitle className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                            {project.name}
                          </DialogTitle>
                          <DialogDescription className="text-slate-600 text-sm mt-1">
                            {project.description}
                          </DialogDescription>
                        </DialogHeader>

                        {/* Multi-image gallery in modal with click to view & blur background */}
                        {project.images && project.images.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                            {project.images.map((img, i) => {
                              const fullImgUrl = resolveImage(img);
                              return (
                                <div
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const allImgs = project.images.map(resolveImage);
                                    setLightboxState({
                                      images: allImgs,
                                      currentIndex: i,
                                    });
                                  }}
                                  className="group relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 shadow-sm cursor-zoom-in hover:border-slate-400 hover:shadow-md transition-all duration-200"
                                  title="Click to view image in full size"
                                >
                                  <img
                                    src={fullImgUrl}
                                    alt={`${project.name} preview ${i + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-medium text-xs">
                                    <ZoomIn className="w-4 h-4" />
                                    <span>View</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Project Details Description */}
                        <div className="mt-4 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                          {project.Detail || project.description}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-slate-200">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all font-semibold text-sm flex items-center gap-2 shadow-md"
                            >
                              <span>Live Demo</span>
                              <span>↗</span>
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all font-medium text-sm flex items-center gap-2 border border-slate-300"
                            >
                              <span>GitHub Repo</span>
                              <span>↗</span>
                            </a>
                          )}
                        </div>

                        {/* Fullscreen Image Lightbox Viewer with Blurred Background & Next/Prev Arrows */}
                        <AnimatePresence>
                          {lightboxState && lightboxState.images && lightboxState.images.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxState(null);
                              }}
                              onPointerDown={(e) => e.stopPropagation()}
                              className="fixed inset-0 z-[9999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out pointer-events-auto select-none"
                            >
                              <motion.div
                                initial={{ scale: 0.92, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.92, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center cursor-default pointer-events-auto"
                                onClick={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                              >
                                {/* Top Controls Bar */}
                                <div className="w-full flex items-center justify-between mb-3 text-white">
                                  <span className="font-mono text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                    {lightboxState.currentIndex + 1} / {lightboxState.images.length}
                                  </span>

                                  {/* Close (Cross) Button -> Returns to Project Modal */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      setLightboxState(null);
                                    }}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    className="text-white/80 hover:text-white bg-white/15 hover:bg-white/30 p-2.5 rounded-full transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-110 active:scale-95"
                                    title="Back to project details (Esc)"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>

                                {/* Image with Left/Right Navigation Arrows */}
                                <div className="relative w-full flex items-center justify-center">
                                  {/* Left Arrow Button */}
                                  {lightboxState.images.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setLightboxState((prev) =>
                                          prev
                                            ? {
                                                ...prev,
                                                currentIndex:
                                                  (prev.currentIndex - 1 + prev.images.length) %
                                                  prev.images.length,
                                              }
                                            : null
                                        );
                                      }}
                                      onPointerDown={(e) => e.stopPropagation()}
                                      className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/30 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                                      title="Previous Image (Left Arrow)"
                                    >
                                      <ChevronLeft className="w-6 h-6" />
                                    </button>
                                  )}

                                  {/* Main Large Image */}
                                  <motion.img
                                    key={lightboxState.currentIndex}
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    src={lightboxState.images[lightboxState.currentIndex]}
                                    alt={`Preview ${lightboxState.currentIndex + 1}`}
                                    className="max-h-[75vh] max-w-full w-auto h-auto rounded-2xl shadow-2xl border border-white/15 object-contain"
                                  />

                                  {/* Right Arrow Button */}
                                  {lightboxState.images.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setLightboxState((prev) =>
                                          prev
                                            ? {
                                                ...prev,
                                                currentIndex:
                                                  (prev.currentIndex + 1) % prev.images.length,
                                              }
                                            : null
                                        );
                                      }}
                                      onPointerDown={(e) => e.stopPropagation()}
                                      className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/30 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                                      title="Next Image (Right Arrow)"
                                    >
                                      <ChevronRight className="w-6 h-6" />
                                    </button>
                                  )}
                                </div>

                                {/* Bottom Thumbnails Strip */}
                                {lightboxState.images.length > 1 && (
                                  <div className="flex items-center justify-center gap-2.5 mt-4">
                                    {lightboxState.images.map((thumb, idx) => (
                                      <button
                                        key={idx}
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          setLightboxState((prev) =>
                                            prev ? { ...prev, currentIndex: idx } : null
                                          );
                                        }}
                                        onPointerDown={(e) => e.stopPropagation()}
                                        className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                                          idx === lightboxState.currentIndex
                                            ? "border-emerald-400 scale-105 shadow-lg opacity-100"
                                            : "border-white/20 opacity-50 hover:opacity-100"
                                        }`}
                                      >
                                        <img
                                          src={thumb}
                                          alt={`Thumbnail ${idx + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </DialogContent>
                    </Dialog>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Modern Contact Hub Footer */}
      <Footer />
    </main>
  );
}
