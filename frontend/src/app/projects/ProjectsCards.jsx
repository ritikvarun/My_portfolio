import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProjects } from "@/lib/api";

const resolveImage = (path) => {
  if (!path) return "";
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/uploads') || path.startsWith('uploads')) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${backendUrl}${cleanPath}`;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath;
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const categories = ["Full Stack", "Frontend", "AI Project", "Other"];

  const getProjectsByCategory = (cat) => {
    return projects.filter(p => {
      const pCat = p.category || "Frontend";
      return pCat === cat;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      {categories.map((cat) => {
        const catProjects = getProjectsByCategory(cat);
        if (catProjects.length === 0) return null;

        return (
          <div key={cat} className="flex flex-col gap-6">
            {/* Category Title */}
            <div className="border-b border-gray-300 pb-3 flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">{cat} Projects</h2>
              <span className="text-xs bg-gray-250 border border-gray-350 text-gray-700 font-bold px-3 py-1 rounded-full">{catProjects.length}</span>
            </div>

            {/* Grid of cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {catProjects.map((project, idx) => (
                <Dialog key={idx}>
                  {/* --- CARD --- */}
                  <DialogTrigger asChild>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105 p-5 cursor-pointer flex flex-col justify-between">
                      <div>
                        {project.images && project.images.length > 0 ? (
                          <img
                            src={resolveImage(project.images[0])}
                            alt={project.name}
                            className="w-full h-44 object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-sm rounded">
                            No image available
                          </div>
                        )}
                        <div className="pt-4 pb-2">
                          <h3 className="font-bold text-lg text-black">{project.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="p-2.5 bg-gray-800 text-white rounded text-center text-sm font-semibold mt-3 hover:bg-black transition-colors">
                        View Details
                      </div>
                    </div>
                  </DialogTrigger>

                  {/* --- DIALOG --- */}
                  <DialogContent className="sm:max-w-2xl bg-white max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-black">{project.name}</DialogTitle>
                      <DialogDescription className="text-gray-500 text-sm">{project.description}</DialogDescription>
                    </DialogHeader>

                    {/* All images inside dialog */}
                    {project.images && project.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                        {project.images.map((img, i) => (
                          <img
                            key={i}
                            src={resolveImage(img)}
                            alt={`${project.name} ${i}`}
                            className="rounded-lg object-cover w-full h-32 border border-gray-100"
                          />
                        ))}
                      </div>
                    )}
                    <div className="break-words w-full mt-4 text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {project.Detail}
                    </div>
                    <div className="flex gap-4 mt-6">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-850 transition-colors text-sm font-semibold"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors text-sm font-semibold"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsSection;
