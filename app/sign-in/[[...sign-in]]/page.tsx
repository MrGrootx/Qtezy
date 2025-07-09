import BgGrid from "@/components/common/bggrid";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section>
      <BgGrid className="items-start">
        <SignIn />
      </BgGrid>
    </section>
  );
}
