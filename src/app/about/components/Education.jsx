import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faAward,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Achivements from "@/app/about/components/Achivements";

function Wrapper({ children }) {
  return (
    <div className="mx-auto container gap-10 p-10 grid grid-cols-1 my-10">
      <motion.div
        className="flex justify-center items-start flex-col mb-5"
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Education() {
  const [isExpanded, setIsExpanded] = useState(false);

  const achievementsByYear = {
    2024: [
      {
        icon: faMedal,
        title: "1st place (Gold Medal)",
        subtitle: "Uttam fest 2024",
        date: "Jan 2025",
        color: "from-yellow-400 to-orange-500",
      },
    ],
    2023: [
      {
        icon: faAward,
        title: "2nd Place (Trophy)",
        subtitle: "Uttam fest 2023",
        date: "Feb 2023",
        color: "from-blue-500 to-purple-600",
      },
    ],
  };

  // Flatten all achievements into a single array for easier limiting
  const allAchievements = Object.entries(achievementsByYear)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .flatMap(([year, achievements]) =>
      achievements.map((achievement) => ({ ...achievement, year }))
    );

  const visibleAchievements = isExpanded
    ? allAchievements
    : allAchievements.slice(0, 6);
  const hasMoreAchievements = allAchievements.length > 6;

  return (
    <Wrapper>
      <section className="grid gap-8 md:gap-12">
        {" "}
        {/* Header */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Education
          </h1>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Get to know more about my educational background.
          </p>
        </motion.div>
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Section - Left */}
          <motion.div
            className="px-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="font-medium text-lg mb-4">Batch (2023 - 2026)</div>
            <div>
              <h2 className="font-semibold text-xl">
                Uttam Institute of Technology and Management
              </h2>
              <h3 className="text-md font-normal mb-3">
                Bachelor of Computer Applications(BCA) - Pursuning
              </h3>
              <div className="gap-4 mb-4 flex items-stretch md:h-[300px] xl:h-[400px]">
                <div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
                  <Image
                    src="/images/Education/E1.png"
                    width={400}
                    height={225}
                    alt="Education"
                    className="rounded-lg w-full h-full object-cover transition-all duration-300 ease-in-out"
                  />
                </div>
                <div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
                  <Image
                    src="/images/Education/E4.png"
                    width={400}
                    height={225}
                    alt="Education"
                    className="rounded-lg w-full h-full object-cover transition-all duration-300 ease-in-out"
                  />
                </div>
                <div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
                  <Image
                    src="/images/Education/E2.png"
                    width={400}
                    height={225}
                    alt="Education"
                    className="rounded-lg w-full h-full object-cover transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-600 text-justify title text-lg">
                  Aspiring to become a professional Software Engineer, I&rsquo;m
                  currently pursuing my Bachelor&rsquo;s degree{" "}
                  <span className="text-black font-medium">
                    (BCA) Bachelor of Computer Applications
                  </span>{" "}
                  at{" "}
                  <span className="text-black font-medium">
                    Uttam Institute of Technology and Management
                  </span>
                  . My journey in tech is driven by curiosity and
                  creativity—combining web development with cutting-edge AI
                  research and implementation.
                  <br />
                  <br />
                  As the{" "}
                  <span className="text-black font-medium">
                    During my BCA journey, I also participated in Uttam Fest,
                    where I grabbed 2nd position in 1st year and 1st position in
                    2nd year.
                  </span>{" "}
                  <span className="text-black font-medium"></span>{" "}
                  <span className="text-black font-medium"></span>
                  <br />
                  <br />{" "}
                  <span className="text-black font-medium">
                    Web Development
                  </span>{" "}
                  and{" "}
                  <span className="text-black font-medium">
                    Artificial Intelligence
                  </span>
                  . Constantly learning, building, and collaborating—I&rsquo;m
                  excited to keep growing and contributing to the evolving tech
                  landscape.
                </p>
              </div>
            </div>
          </motion.div>{" "}
          {/* Achievements Section - Right */}
          <motion.div
            className="flex flex-col justify-start px-5 md:px-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-semibold text-xl mt-7">Achievements</h2>
            <p className="text-md font-normal mb-3 md:mb-6">
              Some of my achievements during my study.
            </p>

            {/* Achievements Container with transparent bottom effect */}
            <div className="relative">
              <div className="space-y-4">
                {/* Show visible achievements */}
                <AnimatePresence>
                  {visibleAchievements.map((achievement, index) => (
                    <motion.div
                      key={`${achievement.year}-${index}`}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      {/* Year indicator for first achievement of each year */}
                      {index === 0 ||
                      visibleAchievements[index - 1]?.year !==
                        achievement.year ? (
                        <div className="flex items-center gap-3 mb-3 mt-2">
                          <div className="w-8 h-8 rounded-full bg-gray-00 flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">
                              {achievement.year}
                            </span>
                          </div>
                          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                        </div>
                      ) : null}

                      {/* Glassmorphism achievement card with monochrome to color effect */}
                      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                          <div
                            className={`aspect-square w-10 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-primary-foreground transition-all duration-300`}
                          >
                            <FontAwesomeIcon
                              icon={achievement.icon}
                              className="text-white h-5 w-5"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm">{achievement.subtitle}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              {achievement.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {/* Image Certification Section */}
                  <Achivements />
                  {/* Image Certification Section */}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Wrapper>
  );
}
