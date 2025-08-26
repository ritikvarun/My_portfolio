import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import data from "@/json/data.json";

const DialogButton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {data.projects.map((project, idx) => (
        <Dialog key={idx}>
          {/* --- CARD --- */}
          <DialogTrigger asChild>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105 p-5 ">
              {/* sirf pehli image card pe dikhani hai */}
              <img
                src={project.images[0]}
                alt={project.name}
                className="w-full h-40 object-cover rounded"
              />
              <div className="p-3">
                <h2 className="font-semibold text-lg">{project.name}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {project.description}
                </p>
              </div>
              <div className="p-3 bg-black text-white">Click me</div>
            </div>
          </DialogTrigger>

          {/* --- DIALOG --- */}
          <DialogContent className="sm:max-w-2xl  bg-white">
            <DialogHeader>
              <DialogTitle>{project.name}</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
            </DialogHeader>

            {/* saari images dialog ke andar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.name} ${i}`}
                  className="rounded-lg object-cover w-full h-32"
                />
              ))}
            </div>
            <div className="break-words w-full">{project.Detail}</div>
            <div className="flex gap-4 mt-4">
              <a
                href={project.demo}
                target="_blank"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
              >
                GitHub
              </a>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default DialogButton;
