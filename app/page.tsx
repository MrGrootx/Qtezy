import BgGrid from "@/components/common/bggrid";
import Faq from "@/components/faq/Faq";
import HeroSection from "@/components/home/HeroSection";
import { SmoothCursor } from "@/components/magicui/SmoothCursor";
import ShortQuotes from "@/components/quotes/ShortQuotes";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <>
      <div className="relative w-full">
        <SmoothCursor />

        <Spotlight
          fill="rgb(255 255 255 / 0.3)"
          key={1}
          className="overflow-hidden"
        />
        <BgGrid className="items-start">
          <HeroSection />
        </BgGrid>

        <div className="container mx-auto px-4 w-full mb-16">
          <ShortQuotes />
        </div>
        <div className=" mx-auto px-4 w-full mb-16">
          <BackgroundBeamsWithCollision className="bg-transparent">
            <Faq />
          </BackgroundBeamsWithCollision>
        </div>
      </div>
    </>
  );
}
