import React from "react";
import { Cover } from "../ui/cover";
import { ShinyButton } from "../ui/ShinyButton";
 
const HeroSection = () => {
  return (
    <section>
      <h3 className="text-3xl  md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Quotes that inspire <br /> at <Cover>thoughts that last</Cover>
      </h3>
      <p className="text-lg  md:text-lg lg:text-xl max-w-2xl mx-auto text-center mt-4 relative z-20">
        Discover wisdom, find inspiration, and{" "}
        <span className="font-semibold text-gray-400 hover:translate-y-6 transition-all">
          share meaningful quotes
        </span>{" "}
        that touch the heart and mind.
      </p>
      <div className="flex justify-center items-center mt-6 gap-4">
        <ShinyButton>Share Your Quote</ShinyButton>
      </div>
    </section>
  );
};

export default HeroSection;
