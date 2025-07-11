import { Button } from "@/components/ui/button";
import React from "react";
import Search from "./Search";
import Categories from "./Categories";

const page = () => {
  return (
    <div className="container mx-auto px-2 lg:px-8">
      <div className="w-full flex justify-center mt-8 p-4">
        <Search />
      </div>
      <div className="px-4 mb-3">
        <Categories />
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1
          className="lg:text-6xl text-2xl font-semibold"
          style={{
            fontFamily: "Satisfy, cursive",
          }}
        >
          Quotes Collections
        </h1>
        <p
          style={{ fontFamily: "Pacifico, cursive" }}
          className="lg:text-xl text-lg text-center mt-4 dark:text-gray-400 text-gray-800"
        >
          Explore timeless quotes, gather inspiration for your path, and
          contribute your own voice to the world.
        </p>
        <Button className="mt-4" size={"lg"}>
          Share Your Quote
        </Button>
      </div>
    </div>
  );
};

export default page;
