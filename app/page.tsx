import BgGrid from "@/components/common/bggrid";
import HeroSection from "@/components/home/HeroSection";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <>
      <div className="relative w-full">
        <BgGrid className="items-start">
          <Spotlight
            fill="rgb(255 255 255 / 0.4)"
            key={1}
            className="overflow-hidden"
          />
          <HeroSection />
        </BgGrid>
        <div className="container mx-auto px-4 w-full">1</div>
      </div>
    </>
  );
}
