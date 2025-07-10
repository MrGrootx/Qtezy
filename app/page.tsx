import BgGrid from "@/components/common/bggrid";
import HeroSection from "@/components/home/HeroSection";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <>
      <div className="relative w-full">
        <Spotlight
          fill="rgb(255 255 255 / 0.3)"
          key={1}
          className="overflow-hidden"
        />

        <BgGrid className="items-start">
          <HeroSection />
        </BgGrid>
        <div className="container mx-auto px-4 w-full">1</div>
      </div>
    </>
  );
}
