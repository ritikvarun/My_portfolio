"use client";
import { motion } from "framer-motion";
import React from "react";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import Marquee from "@/components/Marquee";
// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const HeroMain = () => {
  return (
    <>
      {/* // MainSection Start */}
      <div className="mx-auto mt-10 grid grid-cols-1 gap-4 p-10  md:grid-cols-2 md:px-20 overflow-hidden">
        {/* Image Section Start */}
        <div>
          <motion.div
            className=" md:flex col-span-1 mx-auto justify-center items-center "
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.7,
              type: "spring",
            }}
          >
            <div className=" rounded-full h-auto w-[350px] md:w-auto m-auto  lg:px-12 grayscale hover:grayscale-0 transition-all ease duration-300">
              <Image
                src="/images/Ritik.JPG"
                height={550}
                width={400}
                alt="Ritik"
                className=" w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
        {/* Image Section End  */}

        {/* Text Section Start */}
        <div>
          <motion.h3
            className="uppercase text-xl mb-3 font-normal text tracking-[.5rem] text-gray-500"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
            }}
          >
            RITIK VARUN
          </motion.h3>
          <motion.h1
            className="text-black text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold my-2 md:my-5"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
            }}
          >
            Frontend Developer
          </motion.h1>
          <motion.p
            className="title text-md  2xl:text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem]"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.4,
              type: "spring",
            }}
          >
            Hi, I’m Ritik Varun 👋<br />
            I am a dedicated Web Developer with
            experience in building modern, responsive, and scalable websites. I
            specialize in JavaScript, React, Node.js, and Express, and I am also
            familiar with Next.js and MongoDB. I enjoy solving problems, writing
            clean code, and creating impactful digital solutions.
          </motion.p>

          <motion.div
            className=" space-x-4 mt-10"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              type: "spring",
            }}
          >
            <Button variation="primary">
              <Link
                href={"/docs/cv.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download CV
              </Link>
            </Button>
          </motion.div>
        </div>
        {/* Text Section End */}
      </div>
      {/* // MainSection End */}
      {/* About Section Start */}
      <div>
        <div className="relative md:h-screen w-screen gap-4 flex justify-center items-center flex-col overflow-hidden">
          <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
            {/* About Image Section Start */}
            <motion.div
              className="bg-slate-300 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] grayscale hover:grayscale-0"
              initial={{
                x: 300,
                opacity: 0,
                z: -100,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
                z: 0,
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <Image
                src="/images/ritik.jpg"
                layout="fill"
                className="object-cover"
                alt="About"
              />
            </motion.div>
            {/* About Image Section End*/}
          </div>
          <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
            {/* About Text Section Start */}
            <motion.h1
              className="bg-white lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
              }}
            >
              About Me
            </motion.h1>
            <motion.p
              className="title  text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] mb-5"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
              }}
            >
              A brief introduction about me and my interest.
              <Marquee />
            </motion.p>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
              }}
            >
              <Button variation="primary">
                <Link href="/about">About Me</Link>
              </Button>
            </motion.div>
            {/* About Text Section End */}
          </div>
        </div>
      </div>
      {/* About Section End */}
      {/* Project Section Start */}
      <div>
        <div className="relative md:h-screen w-screen gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
          <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
            {/* Project Image Section Start */}
            <motion.div
              className="bg-slate-300 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] grayscale hover:grayscale-0 "
              initial={{
                x: 300,
                opacity: 0,
                z: -100,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
                z: 0,
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <Image
                src="/images/ritik.jpg"
                layout="fill"
                className="object-cover"
                alt="Projects"
              />
            </motion.div>
            {/* Project Image Section End*/}
          </div>
          <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
            {/* Project Text Section Start*/}
            <motion.h1
              className="bg-white lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
              }}
            >
              My Projects
            </motion.h1>
            <motion.p
              className="title  text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] mb-5"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
              }}
            >
              This is some of my projects that I have done{" "}
              <span className="bg-transparent md:bg-gray-100 bg-opacity-50 xl:bg-transparent">
                {" "}
                and currently working on.
              </span>
            </motion.p>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
              }}
            >
              <Button variation="primary">
                <Link href="/projects">My Projects</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Project Section End */}
      {/* Contact Section Start */}
      <div>
        <div className="relative md:h-screen w-screen  gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
          <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
            {/* Contact Image Section Start  */}
            <motion.div
              className="bg-slate-300 rounded-sm h-[400px] md:h-[600px] w-[70vw] md:w-[30vw] grayscale hover:grayscale-0"
              initial={{
                x: 300,
                opacity: 0,
                z: -100,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
                z: 0,
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <Image
                src="/images/Contact.png"
                layout="fill"
                className="object-cover"
                alt="Ritik Setup"
              />
            </motion.div>
            {/* Contact Image Section End  */}
          </div>
          <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 overflow-hidden">
            {/* Contact Text Section Start  */}
            <motion.h1
              className="bg-white lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold mb-3"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
              }}
            >
              Get In Touch
            </motion.h1>

            <motion.p
              className="title text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] md:mb-5"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
              }}
            >
              Feel free to contact me if you have any{" "}
              <span className="bg-transparent md:bg-gray-100 bg-opacity-50 xl:bg-transparent">
                questions or just want to say hi.
              </span>
            </motion.p>
            <motion.p
              className="title text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] mb-5"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
              }}
            >
              <a href="mailto:ritikvarun@gmail.com">Ritikvarun64@gmail.com</a>
            </motion.p>
            {/* Contact Text Section End  */}
            {/* icons */}
            <div className="flex justify-center items-center space-x-4">
              <motion.a
                href="mailto:ritikvarun@gmail.com"
                className="flex justify-center items-center bg-gray-700 w-14 h-14 rounded-full text-gray-100 hover:bg-gray-400 transition-all ease-in-out duration-300"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  y: { delay: 0.1 },
                  opacity: { delay: 0.2 },
                }}
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
              </motion.a>

              <motion.a
                href="https://github.com/Ritikvarun"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-gray-700 w-14 h-14 rounded-full text-gray-100 hover:bg-gray-400 transition-all ease-in-out duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  y: { delay: 0.2 },
                  opacity: { delay: 0.3 },
                }}
              >
                <FontAwesomeIcon icon={faGithub} className="text-3xl" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/arjun_rk_0021"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-gray-700 w-14 h-14 rounded-full text-gray-100 hover:bg-gray-400 transition-all ease-in-out duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  y: { delay: 0.3 },
                  opacity: { delay: 0.4 },
                }}
              >
                <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ritik-varun-0b6795274/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-gray-700 w-14 h-14 rounded-full text-gray-100 hover:bg-gray-400 transition-all ease-in-out duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  y: { delay: 0.4 },
                  opacity: { delay: 0.5 },
                }}
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-3xl" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section End */}
    </>
  );
};

export default HeroMain;
