"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const about = () => {

  return (
    <>
      <div className="relative mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex justify-center items-start flex-col mb-5 ">
          <div className="images relative w-full  aspect-square">
            <div className="absolute top-14 left-1 w-[55%]  aspect-square transition-all ease duration-300">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                className="w-full h-full"
              >
                <Image
                  src="/images/About/me3.jpeg"
                  alt="Ritik"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </div>
            <div className="absolute  right-1 w-[40%]  aspect-square transition-all ease duration-300">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  x: -100,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                transition={{ delay: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src="/images/About/me1.jpeg"
                  alt="Alvalens"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </div>
            <div className="absolute bottom-16 right-1 w-[40%]  aspect-square transition-all ease duration-300">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  x: -100,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.5,
                }}
                className="w-full h-full"
              >
                <Image
                  src="/images/About/me5.jpeg"
                  alt="Alvalens"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div
          className="flex justify-center items-start flex-col mb-5 md:px-10"
          initial={{
            opacity: 0,
            x: 200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.5,

            type: "spring",
          }}
        >
          <h2 className="text-2xl font-bold tracking-wider mb-3">
            RITIK VARUN
          </h2>
          <p className="text-gray-600 text-justify title text-lg">
            Hey there, I'm Ritik Varun, a
            <span className="text-black font-medium">
              {" "}
              BCA student and an aspiring Full Stack Developer
            </span>{" "}
            <span className="text-black font-medium">
              {" "}
              currently focused on building a strong foundation in MERN stack
              development.
            </span>{" "}
            I’m currently pursuing my{" "}
            <span className="text-black font-medium">
              BCA degree at Uttam Institute of Technology and Management
              (affiliated with Dr. Bhim Rao Ambedkar University, Agra).
            </span>{" "}
            I love working on projects that combine modern web technologies with
            fresh ideas—whether it’s creating responsive, scalable websites or
            exploring AI tools. I enjoy pushing my limits and learning every
            day.
            <span className="text-black font-medium">
              {" "}
              Apart from coding, I stay curious about design and emerging
              technologies, because in today’s fast-changing digital world, I
              believe being a lifelong learner is the real superpower.
            </span>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default about;
