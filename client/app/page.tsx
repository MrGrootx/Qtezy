import BgGrid from "@/components/common/bggrid";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <>
      <div className="relative w-full">
        <BgGrid className="items-start">
          <HeroSection />
        </BgGrid>
      </div>
    </>
  );
}
