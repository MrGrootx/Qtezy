"use client";
import Loader from "@/components/Loader";


export default function LoadingQuotes() {
  return (
    <>
      <div className="flex items-center justify-center h-[400px] md:h-[800px] overflow-hidden">
        <Loader />
      </div>
    </>
  );
}
