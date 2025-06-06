import ShieldPolicy from "@/svgs/shieldPolicy";
import React from "react";

const Icon = () => {
  return (
    <div className="flex items-center justify-center">
      <ShieldPolicy />{" "}
      <p className="text-3xl font-semibold tracking-tight ml-1">
        Eco<span className="text-blue-500">Legall</span>
      </p>
    </div>
  );
};

export default Icon;
