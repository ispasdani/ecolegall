import React from "react";
import IconBoxHero from "../general/iconBoxHero";
import { motion } from "framer-motion";
import Banner from "../general/banner";
import { transition, variants } from "@/lib/data";
import Analytics from "../general/analytics";

const text = "Your legal guide. Instant answers. Document analyzer and Advisor";

const Hero = () => {
  const words = text.split(" ");
  return (
    <div className="md:h-[912px] h-[710px] p-4 relative rounded-[35px] border border-[#E6E6E6]  overflow-hidden">
      <div
        className="absolute -z-20 top-0 left-0 w-full h-full"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e6e6e6 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      >
        <div className="absolute -z-10 md:top-24 md:left-36 top-4 left-4 rotate-[-15.11deg]">
          <IconBoxHero />
        </div>

        <div className="absolute -z-10 md:bottom-80 md:right-44 bottom-64 right-11 rotate-[14deg]">
          <IconBoxHero />
        </div>

        <div className="absolute -z-10 md:bottom-52 bottom-36 md:-left-5 -left-14 rotate-[12deg] hidden md:block">
          <motion.div className="rotate-[5deg] scale-[0.9]">
            <Analytics color="#e2e8f0" />
          </motion.div>
        </div>

        <motion.div className="w-full h-5/6 flex flex-col items-center justify-center">
          <Banner />

          <h1 className="md:text-5xl text-2xl font-bold text-center md:w-4/6 w-full mt-8">
            {words.map((word, index) => (
              <React.Fragment key={index}>
                <motion.span
                  className="inline-block"
                  transition={transition}
                  variants={variants}
                >
                  {word}
                </motion.span>
                {index < words.length - 1 && " "}
              </React.Fragment>
            ))}
          </h1>

          <motion.p
            transition={transition}
            variants={variants}
            className="md:text-lg text-sm font-medium leading-[23px] text-center tracking-tight max-w-2xl mx-auto w-[95%] mt-9 text-neutral-600"
          >
            Perform document analysis with human-level precision more faster and
            efficient. Simplify legal work. Instant answears for your legal
            questions.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
