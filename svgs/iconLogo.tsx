import React from "react";
import { cn } from "@/lib/utils";

const IconLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      width="35"
      height="37"
      viewBox="0 0 35 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
    >
      <path
        d="M0 37V33.1053H23.3333V37H0ZM10.9861 27.5553L0 16.5526L4.08333 12.3658L15.1667 23.3684L10.9861 27.5553ZM23.3333 15.1895L12.3472 4.08947L16.5278 0L27.5139 11.0026L23.3333 15.1895ZM32.2778 35.0526L6.90278 9.63947L9.625 6.91316L35 32.3263L32.2778 35.0526Z"
        fill="url(#paint0_linear_13_38)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_13_38"
          x1="17.5"
          y1="0"
          x2="17.5"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00A65F" />
          <stop offset="1" stopColor="#25A18E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconLogo;
