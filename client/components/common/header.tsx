import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./ThemeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
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
