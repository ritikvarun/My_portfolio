import React, { useState, useEffect } from "react";
import { getSkills } from "@/lib/api";

const resolveImage = (path) => {
  if (!path) return "";
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/uploads') || path.startsWith('uploads')) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'https://my-portfolio-kn46.onrender.com';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${backendUrl}${cleanPath}`;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath;
};

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-6 text-black">
        Languages & Frameworks
      </h2>

      {/* Mobile view -> tags style */}
      <div className="flex flex-wrap justify-center gap-3 sm:hidden">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-full bg-[#0e1a2b] text-white text-sm font-medium shadow-md"
          >
            {skill.name}
          </span>
        ))}
      </div>

      {/* Desktop view -> grid style */}
      <div className="hidden sm:grid grid-cols-2  md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-[#47576d] flex flex-col items-center justify-center rounded-lg p-6 shadow-md hover:scale-105 transition"
          >
            <img
              src={resolveImage(skill.image)}
              alt={skill.name}
              className="w-12 h-12 mb-3 object-contain"
              onError={(e) => {
                if (!skill.image.startsWith('/uploads') && !skill.image.startsWith('http')) {
                  // Fallback to absolute dev URL of Next JS for local fallback images if needed
                  e.target.src = `http://localhost:3000/${skill.image.startsWith('/') ? '' : '/'}${skill.image}`;
                }
              }}
            />
            <p className="text-white font-medium">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
