import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Github, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const footer = () => {
  return (
    <div className="container mx-auto px-4 w-full">
      <Separator />
      <div className="mt-8 mb-8 flex-col lg:flex-row flex  items-center justify-between space-y-2 w-full">
        <div>
          <Link
            href="/"
            className="flex items-center gap-1 mb-1 justify-center lg:justify-start"
          >
            <Image
              src={"/logo.png"}
              alt="Qtezy Logo"
              width={20}
              height={20}
              priority
            />
            <small className="font-semibold">tezy</small>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Weekly wisdom. Pure inspiration, no spam.
          </p>
        </div>
        <div className="space-x-2">
          <Link href={"https://github.com/MrGrootx"} target="_blank">
            <Button variant="outline" size={"icon"} className="cursor-pointer">
              <Instagram />
            </Button>
          </Link>
          <Link href={"https://github.com/MrGrootx"} target="_blank">
            <Button variant="outline" size={"icon"} className="cursor-pointer">
              <Github />
            </Button>
          </Link>
        </div>
      </div>
      <Separator />
      <div className="mt-8 mb-8 flex-col lg:flex-row flex items-center justify-between space-y-2 w-full">
        <small className="text-sm text-gray-500 dark:text-gray-400 ">
          © {new Date().getFullYear()} Qtezy. All rights reserved.
        </small>
        <small className="text-sm text-gray-500 dark:text-gray-400 ">
          Made with ❤️ for quote lovers everywhere
        </small>
      </div>
    </div>
  );
};

export default footer;
