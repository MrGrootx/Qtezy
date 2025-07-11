"use client";
import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{   duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
