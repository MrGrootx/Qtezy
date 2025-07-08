import BgGrid from "@/components/common/bggrid";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section>
      <BgGrid className="items-start">
        <SignIn
          appearance={{
            elements: {
              card: "bg-neutral-900 shadow-lg",
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
            },
          }}
        />
      </BgGrid>
    </section>
  );
}
