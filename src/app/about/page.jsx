"use client";
import { useEffect } from "react";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/Button";
import About from "@/app/about/components/About.jsx";
import Skills from "@/app/about/components/Skills.jsx";
import Education from "./components/Education";
import Quote from "./components/quote";
const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="overflow-hidden">
        <div className="relative h-screen mt-20 gap-4 p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
          {/* Hero Start */}
          <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.6 }}
              transition={{ ease: "circOut", duration: 1 }}
              className="bg-slate-300 rounded-sm h-[300px] md:h-[500px] w-[50vw] md:w-[20vw] grayscale hover:grayscale-0 "
            >
              <Image
                src="/images/ritik.jpg"
                alt="Ritik Varun"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </div>
          <div className="z-10 w-full absolute md:w-auto md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 pt-4 backdrop-filter backdrop-blur-sm md:backdrop-blur-none bg-gray-100 bg-opacity-50 md:bg-transparent md:pt-0">
            <h1 className="md:bg-white bg-transparent lg:bg-transparent bg-opacity-50 md:px-0 text-black text-5xl md:text-8xl font-bold">
              About Me
            </h1>

            <p className="title text-xl mt-4 tracking-wider text-gray-900 leading-[1.7rem] mb-5 ">
              A brief introduction about me and{" "}
              <span className="bg-transparent md:bg-gray-100 bg-opacity-50 xl:bg-transparent">
                {" "}
                my interest.
              </span>
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              onClick={() => {
                window.scrollTo({
                  top: 1000,
                  behavior: "smooth",
                });
              }}
              className="mb-3"
            >
              <Button variation="primary">Scroll Down</Button>
            </motion.div>
          </div>
        </div>
        {/* Hero End */}

        {/* About Start */}
        <About />
        {/* end about */}

        {/* skills */}
        <Skills />
        {/* end skills */}

        {/* experience */}

        {/* end experience */}

        {/* Education */}
        <Education />
        {/* end Education */}

        {/* Quote */}
        <Quote />
        {/* end Quote */}
      </main>
    </>
  );
};

export default AboutPage;
