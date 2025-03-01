"use client";

import { motion } from "framer-motion";
import React from "react";

const Page = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-[#e3daf7]"
    >
        <h1 className="text-3xl font-bold">Welcome to the Portal</h1>
    </motion.div>
  );
};

export default Page;
