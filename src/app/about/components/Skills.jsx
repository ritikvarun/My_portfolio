"use client";
import React from "react";
import data from "@/json/data.json";

const Skills = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-6 text-black">
        Languages & Frameworks
      </h2>

      {/* Mobile view -> tags style */}
      <div className="flex flex-wrap justify-center gap-3 sm:hidden">
        {data.skills.map((skill, index) => (
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
        {data.skills.map((skill, index) => (
          <div
            key={index}
            className="bg-[#47576d] flex flex-col items-center justify-center rounded-lg p-6 shadow-md hover:scale-105 transition"
          >
            <img
              src={skill.image}
              alt={skill.name}
              className="w-12 h-12 mb-3"
            />
            <p className="text-white font-medium">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
