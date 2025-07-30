"use client";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { usePathname } from "next/navigation";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="relative flex flex-col min-h-screen">
        {!isAdmin && <Header />}
        <main className="flex-1">
          <Providers>{children}</Providers>
          <Toaster />
        </main>
        {!isAdmin && <Footer />}
      </div>
    </ThemeProvider>
  );
}
