"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getSkills } from "@/lib/api";
import "./skills-marquee.css";

const resolveImage = (path) => {
  if (!path) return "";
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

export default function SkillsMarquee() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then((data) => {
      if (data && data.length > 0) {
        setSkills(data);
      }
    });
  }, []);

  if (!skills || skills.length === 0) return null;

  // Split or duplicate for 2 rows of continuous infinite flow
  const half = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, half);
  const row2 = skills.slice(half);

  return (
    <section className="relative w-full py-12 bg-gradient-to-b from-transparent via-slate-100/60 to-transparent border-y border-slate-200/60 overflow-hidden select-none my-6">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Header Label */}
      <div className="text-center mb-8 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 border border-slate-300/60 text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-slate-700 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Tech Stack & Expertise
        </div>
        <h3
          className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
          style={{ fontFamily: '"Jost", sans-serif' }}
        >
          Technologies & Tools I Work With
        </h3>
      </div>

      {/* Row 1: LTR Direction */}
      <div className="skills-marquee-container mb-4">
        <div className="skills-marquee-track skills-marquee-track-ltr">
          {[...row1, ...row1, ...row1, ...row1].map((skill, index) => (
            <div key={`row1-${index}`} className="skill-pill">
              <img
                src={resolveImage(skill.image)}
                alt={skill.name}
                onError={(e) => {
                  if (
                    !skill.image.startsWith("/uploads") &&
                    !skill.image.startsWith("http")
                  ) {
                    e.target.src = `/${skill.image.startsWith("/") ? skill.image.slice(1) : skill.image}`;
                  }
                }}
              />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: RTL Direction */}
      <div className="skills-marquee-container">
        <div className="skills-marquee-track skills-marquee-track-rtl">
          {[...row2, ...row2, ...row2, ...row2].map((skill, index) => (
            <div key={`row2-${index}`} className="skill-pill">
              <img
                src={resolveImage(skill.image)}
                alt={skill.name}
                onError={(e) => {
                  if (
                    !skill.image.startsWith("/uploads") &&
                    !skill.image.startsWith("http")
                  ) {
                    e.target.src = `/${skill.image.startsWith("/") ? skill.image.slice(1) : skill.image}`;
                  }
                }}
              />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
