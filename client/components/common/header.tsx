"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./ThemeToggle";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { ShieldUser } from "lucide-react";
import { checkAdminStatus } from "@/lib/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Header = () => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

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
          className="transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
        />

        <h4 className="text-2xl font-bold transition-transform duration-300 ease-in-out">
          Qtezy
        </h4>
      </Link>
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

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
