"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSkills } from "@/lib/api";
import localData from "@/json/data.json";

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

const categorizeSkills = (skillsList) => {
  const groups = [
    {
      id: "languages",
      title: "Programming",
      subtitle: "Languages",
      skills: [],
    },
    {
      id: "web",
      title: "Web",
      subtitle: "Development",
      skills: [],
    },
    {
      id: "backend",
      title: "Backend &",
      subtitle: "Databases",
      skills: [],
    },
    {
      id: "devops",
      title: "DevOps &",
      subtitle: "Cloud",
      skills: [],
    },
    {
      id: "tools",
      title: "Tools &",
      subtitle: "Optimization",
      skills: [],
    },
  ];

  const categoryMap = {
    javascript: "languages",
    typescript: "languages",
    "react.js": "web",
    react: "web",
    "next.js": "web",
    next: "web",
    "tailwind css": "web",
    tailwind: "web",
    "node.js": "backend",
    node: "backend",
    "express.js": "backend",
    express: "backend",
    mongodb: "backend",
    mongo: "backend",
    "rest apis": "backend",
    rest: "backend",
    razorpay: "backend",
    resend: "backend",
    vercel: "devops",
    render: "devops",
    cloudinary: "devops",
    git: "tools",
    github: "tools",
    postman: "tools",
    "technical seo": "tools",
    seo: "tools",
  };

  const seen = new Set();
  const normalize = (str) => (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  skillsList.forEach((skill) => {
    const normKey = normalize(skill.name);
    if (!normKey || seen.has(normKey)) return;
    seen.add(normKey);

    const nameLower = (skill.name || "").toLowerCase().trim();
    let targetId = categoryMap[nameLower];

    if (!targetId) {
      if (nameLower.includes("script") || nameLower.includes("java") || nameLower.includes("c++") || nameLower.includes("python")) {
        targetId = "languages";
      } else if (nameLower.includes("react") || nameLower.includes("next") || nameLower.includes("css") || nameLower.includes("html") || nameLower.includes("tailwind")) {
        targetId = "web";
      } else if (nameLower.includes("node") || nameLower.includes("express") || nameLower.includes("sql") || nameLower.includes("mongo") || nameLower.includes("api") || nameLower.includes("pay") || nameLower.includes("resend")) {
        targetId = "backend";
      } else if (nameLower.includes("vercel") || nameLower.includes("render") || nameLower.includes("cloud") || nameLower.includes("aws") || nameLower.includes("docker")) {
        targetId = "devops";
      } else {
        targetId = "tools";
      }
    }

    const group = groups.find((g) => g.id === targetId) || groups[groups.length - 1];
    group.skills.push(skill);
  });

  return groups.filter((g) => g.skills.length > 0);
};

const Skills = () => {
  const [skills, setSkills] = useState(localData.skills || []);

  useEffect(() => {
    getSkills().then((data) => {
      if (data && data.length > 0) {
        setSkills(data);
      }
    });
  }, []);

  const categorizedGroups = categorizeSkills(skills);

  return (
    <section className="relative mx-auto container max-w-7xl px-6 sm:px-10 lg:px-16 my-24">
      {/* Category Sections Stacked */}
      <div className="space-y-12">
        {categorizedGroups.map((group, groupIdx) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
            className="space-y-4"
          >
            {/* Header Style matching reference */}
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                {group.title}{" "}
                <span className="font-normal text-zinc-700">{group.subtitle}</span>
              </h3>
              <span className="text-xl sm:text-2xl font-light text-zinc-400">→</span>
            </div>

            {/* Grid matching reference screenshot in clean white/light theme */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4">
              {group.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="group relative aspect-square bg-white border border-zinc-200/90 hover:border-zinc-400 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between cursor-pointer select-none"
                >
                  {/* Subtle hover gradient glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Icon */}
                  <div className="w-full flex-1 flex items-center justify-center p-1">
                    <img
                      src={resolveImage(skill.image)}
                      alt={skill.name}
                      className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        if (
                          !skill.image?.startsWith("/uploads") &&
                          !skill.image?.startsWith("http")
                        ) {
                          e.target.src = `http://localhost:3000/${skill.image?.startsWith("/") ? "" : "/"}${skill.image}`;
                        }
                      }}
                    />
                  </div>

                  {/* Label */}
                  <p className="text-[11px] sm:text-[12px] font-medium text-zinc-600 group-hover:text-zinc-900 text-center tracking-tight truncate w-full pt-1 transition-colors">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
