"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const Header = ({
  className,
  title = "Features that will make your life easier",
  subtitle = "Streamline your hiring process with powerful tools for sourcing, evaluating, and onboarding top talent - all in one platform.",
  badge = "Advantages",
}: {
  className?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-3 my-16 md:my-24 tracking-tight text-center",
        className
      )}
    >
      <Badge
        variant="outline"
        className="text-md font-normal shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
      >
        {badge}
      </Badge>
      <h1 className="md:text-4xl font-semibold mb-5 lg:text-5xl text-2xl text-center">
        {title}
      </h1>
      <p className="text-center w-72 md:w-[670px] md:text-base lg:text-lg text-sm px-1">
        {subtitle}
      </p>
    </div>
  );
};

export default Header;
