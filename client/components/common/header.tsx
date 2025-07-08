import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4  px-2 lg:px-8 mx-auto">
      <div className="flex lg:flex-1 items-center gap-1">
        <Image
          src="/logo.png"
          alt="Qtezy Logo"
          width={40}
          height={40}
          className="hover:scale-110 transition-transform duration-300 ease-in-out hover:-rotate-12 hover:cursor-pointer"
        />
        <Link href="/">tezy</Link>
      </div>
      <div>
        <Link href="/">Sign In</Link>
      </div>
    </nav>
  );
};

export default Header;
