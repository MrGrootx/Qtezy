import BgGrid from "@/components/common/bggrid";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section>
      <BgGrid>
        <SignIn
          appearance={{

            elements: {
              card: "bg-neutral-900 shadow-lg", // Tailwind classes
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
            },
          }}
        />
      </BgGrid>
    </section>
  );
}
