import React from "react";
import { Cover } from "../ui/cover";
import { ShinyButton } from "../ui/ShinyButton";
import ShinyText from "../reactbits/ShinyText";
import Statistics from "./Statistics";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section>
      <h3
        className="text-3xl  md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center md:mt-6 relative z-20 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-800 dark:via-white dark:to-white"
        style={{ fontFamily: "Pacifico, cursive" }}
      >
        Quotes that inspire <br /> at <Cover>thoughts that last</Cover>
      </h3>
      <span className="block max-w-3xl mx-auto text-center mt-4 px-4 text-sm sm:text-base md:text-lg lg:text-xl relative z-20 leading-relaxed">
        Discover wisdom, find inspiration, and{" "}
        <ShinyText
          text="share meaningful quotes"
          disabled={false}
          speed={3}
          className="custom-class font-semibold"
        />{" "}
        that touch the heart and mind.
      </span>

      <div className="flex justify-center items-center mt-6 gap-4">
        {/* <ShinyButton>Share Your Quote</ShinyButton> */}
        <Button
          style={{
            zIndex: 20,
          }}
          size={"lg"}
          className="cursor-pointer"
        >
          Share Your Quote
        </Button>
      </div>

      <div className=" max-w-7xl mx-auto mt-8 p-4   shadow-lg relative z-10">
        <Statistics />
      </div>
    </section>
  );
};

export default HeroSection;
