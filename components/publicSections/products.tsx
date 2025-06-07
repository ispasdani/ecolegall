"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

const Products = ({ className }: { className?: string }) => {
  return (
    <motion.div
      // initial={{ opacity: 0, y: -20 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.9, delay: 0.2 }}
      className={cn(
        "flex flex-col items-center justify-center space-y-3 my-16 md:my-24",
        className
      )}
    >
      <Badge
        variant="outline"
        className="text-md font-normal shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
      >
        Products
      </Badge>
      <h1 className="md:text-4xl font-semibold mb-5 lg:text-5xl text-2xl md:w-4/6 w-full text-center">
        All-in-One Legal Assistance at Your Fingertips
      </h1>
      <p className="text-center w-72 md:w-[670px] md:text-base lg:text-lg text-sm px-1">
        Our mission is to provide a legal guidance and expert consultations. Get
        the clarity you need faster than ever.
      </p>
    </motion.div>
  );
};

export default Products;
