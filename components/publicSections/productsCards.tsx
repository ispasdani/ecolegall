"use client";

import React from "react";

import { motion } from "framer-motion";
import ContractIcon from "@/svgs/contractIcon";
import AskALegalQuestionIcon from "@/svgs/askALegalQuestionIcon";
import DocumentAnalyzerIcon from "@/svgs/documentAnalyzerIcon";
import DocumentGenerationIcon from "@/svgs/documentGenerationIcon";
import AdvisorIcon from "@/svgs/advisorIcon";

const ProductsCards = () => {
  const products = [
    {
      title:
        "Centralise system to search for candidates, easy access to the entire database.",
      icon: <ContractIcon />,
    },
    {
      title:
        "Accelerated speed to shortlist candidates, make notes as you scan and decide later.",
      icon: <AskALegalQuestionIcon />,
    },
    {
      title:
        "Data is backed up every 2 seconds so that you never lose a single candidate ever again.",
      icon: <DocumentAnalyzerIcon />,
    },
    {
      title:
        "Centralise system to search for candidates, easy access to the entire database....",
      icon: <DocumentGenerationIcon />,
    },
    {
      title: "Centralise system to search for candidates, easy access to the",
      icon: <AdvisorIcon />,
    },
  ];
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl mx-auto grid lg:grid-cols-3 lg:grid-rows-1 grid-cols-1 grid-rows-3 gap-10 align-center">
        {products.map((product, idx) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: idx * 0.1 }}
            className="space-y-4  flex items-center justify-center flex-col"
          >
            <div className="size-14 flex items-center justify-center">
              {product.icon}
            </div>
            <p className="text-center max-w-xs mx-auto">{product.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsCards;
