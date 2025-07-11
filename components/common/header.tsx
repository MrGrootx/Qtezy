"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./ThemeToggle";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Menu, ShieldUser } from "lucide-react";
import { checkAdminStatus } from "@/lib/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Header = () => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (isLoaded && user) {
        try {
          const adminStatus = await checkAdminStatus();
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error("Failed to check admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setIsChecking(false);
    };

    verifyAdminStatus();
  }, [user, isLoaded]);


  return (
    <nav className="container flex items-center justify-between py-4  px-2 lg:px-8 mx-auto">
      <Link href="/" className="flex lg:flex-1 items-center gap-1 group ">
        <Image
          src="/logo.png"
          alt="Qtezy Logo"
          width={40}
          height={40}
          className="transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12 brightness-0 dark:brightness-100"
        />

        <h4 className="text-2xl font-bold transition-transform duration-300 ease-in-out">
          tezy
        </h4>
      </Link>
      <div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer lg:hidden"
              asChild
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="p-6">
              <SheetTitle className="text-lg font-semibold mb-6">
                Navigation
              </SheetTitle>
              <div className="flex flex-col space-y-4">
                {!isChecking && isAdmin && (
                  <Button
                    variant="destructive"
                    className="justify-start gap-3 h-12"
                    asChild
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <Link href="/admin">
                      <ShieldUser className="h-5 w-5" />
                      Admin Dashboard
                    </Link>
                  </Button>
                )}

                <SignedIn>
                  <Button
                    variant="default"
                    className="justify-start gap-3 h-12"
                    asChild
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </SignedIn>

                <SignedOut>
                  <Button
                    variant="outline"
                    className="justify-start gap-3 h-12"
                    asChild
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </SignedOut>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">Theme</span>
                  <ModeToggle />
                </div>

                <SignedIn>
                  <div className="flex items-center justify-between py-2 border-t pt-4 z-40">
                    <span className="text-sm font-medium">Account</span>
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonPopoverCard: { pointerEvents: "initial" },
                        },
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="lg:block hidden">
        <div className="flex items-center gap-2">
          {!isChecking && isAdmin && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="cursor-pointer"
                  asChild
                >
                  <Link href="/admin">
                    <ShieldUser className="h-[1.2rem] w-[1.2rem]" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Admin Dashboard</p>
              </TooltipContent>
            </Tooltip>
          )}
          <SignedIn>
            <Button className="hover:cursor-pointer" size={"sm"} asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn>
          <ModeToggle />
          <SignedOut>
            <Button className="hover:cursor-pointer" size={"sm"} asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>

          <Suspense fallback={<div>Loading...</div>}>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default Header;
