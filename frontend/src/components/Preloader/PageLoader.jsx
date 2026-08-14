"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const words = [
  "WEB ARCHITECT",
  "FULL STACK DEVELOPER",
  "UI / UX CRAFTSMAN",
  "RITIK VARUN",
];

export default function PageLoader({ isLoading, onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const startTime = Date.now();
    const duration = 1850; // 1.85s duration

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 25) setWordIndex(0);
    else if (progress < 55) setWordIndex(1);
    else if (progress < 85) setWordIndex(2);
    else setWordIndex(3);

    if (progress === 100 && !isLoading) {
      const exitTimeout = setTimeout(() => {
        setIsFinished(true);
        if (onLoadingComplete) {
          setTimeout(onLoadingComplete, 900);
        }
      }, 350);
      return () => clearTimeout(exitTimeout);
    }
  }, [progress, isLoading, onLoadingComplete]);

  // Staggered shutter column count
  const columnCount = 5;

  return (
    <AnimatePresence>
      {!isFinished && (
        <div className="fixed inset-0 z-[999999] pointer-events-none select-none overflow-hidden flex flex-col justify-between p-6 md:p-12">
          {/* Staggered Shutter Panels Exit Animation (White / Light Theme) */}
          <div className="absolute inset-0 flex z-0">
            {Array.from({ length: columnCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                exit={{
                  y: "-100%",
                  transition: {
                    duration: 0.85,
                    ease: [0.85, 0, 0.15, 1],
                    delay: i * 0.05,
                  },
                }}
                className="flex-1 h-full bg-[#f8fafc] border-r border-slate-200/70 relative"
              >
                {/* Subtle vertical accent line on bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-slate-400/40 to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Ambient Soft Glow & Grid */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-[35vmax] h-[35vmax] rounded-full bg-slate-200/50 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[30vmax] h-[30vmax] rounded-full bg-blue-100/40 blur-[100px]" />
            {/* Subtle Light Grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
          </div>

          {/* Top HUD Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="relative z-10 flex items-center justify-between text-xs tracking-widest uppercase font-mono text-slate-500"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-800 font-bold">PORTFOLIO v2.6</span>
            </div>

            <div className="hidden sm:flex items-center gap-6 text-[11px] text-slate-500 font-medium">
              <span>AGRA, IN</span>
              <span className="text-slate-300">/</span>
              <span className="text-emerald-700 font-semibold">AVAILABLE FOR ROLES</span>
            </div>
          </motion.div>

          {/* Center Dynamic Word Reveal & Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
            className="relative z-10 flex flex-col items-center justify-center my-auto"
          >
            {/* Geometric Dashed Orbital Ring with User Avatar */}
            <div className="relative mb-8 flex items-center justify-center">
              <motion.div
                className="w-28 h-28 rounded-full border border-dashed border-slate-300 absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-200 shadow-xl shadow-slate-200/80 flex items-center justify-center relative overflow-hidden p-1">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src="/images/Me/avatar.jpg"
                    alt="Ritik Varun"
                    fill
                    sizes="80px"
                    priority
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Kinetic Text Swapper */}
            <div className="h-10 overflow-hidden flex items-center justify-center mb-2">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={wordIndex}
                  initial={{ y: 28, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -28, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-widest text-slate-900 uppercase text-center"
                  style={{ fontFamily: '"Jost", sans-serif' }}
                >
                  {words[wordIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>

            <p className="text-[11px] font-mono tracking-[0.35em] text-slate-500 uppercase mt-1 font-medium">
              Crafting Digital Excellence
            </p>
          </motion.div>

          {/* Bottom Luxury Counter & Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="relative z-10 flex flex-col gap-4"
          >
            {/* Progress Bar Container */}
            <div className="w-full flex items-center gap-4">
              <div className="flex-1 h-[3px] bg-slate-200/90 rounded-full overflow-hidden relative shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-950 relative rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  {/* Subtle Shimmer head */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-800 rounded-full blur-sm opacity-60" />
                </motion.div>
              </div>

              {/* Big Digital Counter Number */}
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-slate-950 tabular-nums min-w-[80px] text-right">
                {progress < 10 ? `0${progress}` : progress}
                <span className="text-xs text-slate-400 ml-1 font-normal">%</span>
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500 tracking-widest uppercase font-medium">
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
                <span>Loading Experience assets</span>
              </div>
              <span className="hidden sm:inline-block">Designed & Built by Ritik</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
