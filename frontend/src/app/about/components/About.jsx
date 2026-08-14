"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getSettings } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faGraduationCap, faTrophy, faBolt } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  return (
    <section className="relative mx-auto container max-w-7xl px-6 sm:px-10 lg:px-16 my-28">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vmax] h-[40vmax] rounded-full bg-slate-300/[0.12] blur-[140px] pointer-events-none -z-1" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Modern Bento Photo Storyboard */}
        <div className="lg:col-span-5 relative">
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4 h-[440px] sm:h-[480px]">
            {/* Tall Main Featured Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative h-full rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:border-slate-400 transition-all duration-300"
            >
              <Image
                src="/images/About/me4.jpeg"
                alt="Ritik Varun - Full Stack Developer"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-block px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-900 shadow-sm border border-slate-200/80">
                  🏆 Fest Gold Medalist
                </span>
              </div>
            </motion.div>

            {/* Right Column Stack (2 Cards) */}
            <div className="flex flex-col gap-3.5 sm:gap-4 h-full">
              {/* Top Card: Medals */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="group relative flex-1 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:border-slate-400 transition-all duration-300"
              >
                <Image
                  src="/images/About/me6.jpeg"
                  alt="Medals & Awards"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-bold text-slate-900 shadow-sm border border-slate-200/80">
                    Medals & Awards
                  </span>
                </div>
              </motion.div>

              {/* Bottom Card: Lab Sessions */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="group relative flex-1 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:border-slate-400 transition-all duration-300"
              >
                <Image
                  src="/images/About/E4.png"
                  alt="Labs & Tech Coding"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-bold text-slate-900 shadow-sm border border-slate-200/80">
                    Labs & Teamwork
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right: Modern Story & Pillars Bento */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Header Title */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
              01 // Background & Philosophy
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-950 leading-[1.2]">
              Architecting ideas into{" "}
              <span className="font-serif italic font-normal text-gray-500" style={{ fontFamily: "Georgia, serif" }}>
                scalable
              </span>
              , high-performance web products.
            </h2>
          </div>

          {/* Narrative Story Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-slate-600 space-y-3.5 text-base sm:text-lg leading-relaxed">
            {settings?.aboutBio ? (
              <p className="whitespace-pre-line">{settings.aboutBio}</p>
            ) : (
              <>
                <p>
                  Hey there! I'm <strong className="text-slate-950 font-semibold">Ritik Varun</strong>, an aspiring{" "}
                  <strong className="text-slate-950 font-semibold">Full Stack Developer</strong> focused on building strong fundamentals in the MERN stack ecosystem.
                </p>
                <p className="text-sm sm:text-base text-slate-600">
                  Currently pursuing my BCA degree at <span className="text-slate-900 font-medium">Uttam Institute of Technology and Management</span> (affiliated with Dr. Bhim Rao Ambedkar University, Agra).
                </p>
                <p className="text-sm sm:text-base text-slate-600">
                  I love creating clean, reactive user interfaces and robust APIs. Outside of code, I stay curious about design, emerging tech, and continuous learning.
                </p>
              </>
            )}
          </div>

          {/* 4 Interactive Bento Matrix Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {/* Tile 1: Core Stack */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-400 hover:shadow-xs transition-all flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faCode} className="text-sm" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Core Stack
                </p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  React • Next.js • Node
                </p>
              </div>
            </div>

            {/* Tile 2: Education */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-400 hover:shadow-xs transition-all flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faGraduationCap} className="text-sm" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Education
                </p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  BCA @ Uttam Institute, Agra
                </p>
              </div>
            </div>

            {/* Tile 3: Recognition */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-400 hover:shadow-xs transition-all flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faTrophy} className="text-sm" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Recognition
                </p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  1st Place Gold Medalist
                </p>
              </div>
            </div>

            {/* Tile 4: Mindset */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-400 hover:shadow-xs transition-all flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faBolt} className="text-sm" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Mindset
                </p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  Lifelong Learner
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
