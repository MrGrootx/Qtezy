import BgGrid from "@/components/common/bggrid";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <BgGrid>
      <SignUp
        appearance={{
          elements: {
            card: "bg-neutral-900 shadow-lg",
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
          },
        }}
      ></SignUp>
    </BgGrid>
  );
}
