"use client";

import Image from "next/image";
import React from "react";

import { Dots } from "@/svgs/dots";
import { ContentCard } from "./contentCard";
import ChartCard from "./chartCard";
import { HorizontalDots } from "@/svgs/horizontalDots";
import IconBoxHero from "../iconBoxHero";
import Analytics from "../analytics";
import Avatar from "../avatar";
import AttachIcon from "@/svgs/attachIcon";
import AiAgentIcon from "@/svgs/aiAgentIcon";

const Grids = () => {
  return (
    <div className="relative flex justify-center items-center w-full">
      <div className="absolute z-20 lg:-top-16 lg:left-[120px] -top-10 left-0 rotate-[-15.11deg]">
        <div>
          <IconBoxHero />
        </div>
      </div>
      <div className="lg:w-10/12 w-full space-y-5">
        <div className="flex lg:flex-row flex-col gap-5">
          <div className="relative bg-[#FFFFFF] h-[483px] lg:w-2/5 w-full flex flex-col items-center rounded-[26px] p-5 border">
            <div className="absolute w-[70%] h-[160px] border border-[#DBDCDF] bg-[#ffffff] mt-24 shadow-[0px_3px_8px_-1px_#3232470D,0px_0px_1px_0px_#0C1A4B3D] rounded-3xl" />
            <div className="w-[85%] h-[189px] bg-[#FFFFFF] mt-10 py-5 space-y-2 z-10 border border-[#DBDCDF] shadow-[0px_3px_8px_-1px_#3232470D,0px_0px_1px_0px_#0C1A4B3D] rounded-3xl">
              <div className="flex justify-between px-5">
                <div className="p-3 bg-[#E4ECF7] rounded-xl">
                  <AiAgentIcon />
                </div>
                <HorizontalDots />
              </div>
              <h1 className="font-semibold px-5">Analyzing web results...</h1>
              <div className="px-5">
                <div className="flex justify-between text-[#84859E]">
                  <span>0%</span>
                  <span>100%</span>
                </div>
                <div className="mt-2">
                  <div className="w-full h-2 bg-[#E4ECF7] rounded-full overflow-hidden">
                    <div className="h-2 bg-[#4C6FFF] rounded-full w-[70%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <ContentCard
              title="AI-Agent that works for you"
              description="Our AI-Agent will crawl the internet to gather and analyze legal information. It will let you know when job is done!"
              className="mt-24 "
            />
          </div>
          <div className="bg-[#FFFFFF] h-[483px] lg:w-3/5 w-full flex flex-col items-center rounded-[26px] p-5 border overflow-hidden">
            <div className="relative w-full h-[293px] mt-5 flex flex-col items-center">
              <div className="absolute -left-[100px] scale-125 top-7 rotate-[12deg]">
                <div>
                  <Analytics color="#DFEBF3" />
                </div>
              </div>
              <div className="absolute -right-[100px] scale-125 top-7 rotate-[-20deg]">
                <div>
                  <Analytics color="#DFEBF3" />
                </div>
              </div>
              <div className="space-y-3 z-10">
                {[
                  {
                    avatar: 1,
                    name: "AI-Powered Chat",
                    description: "Get precise answers within seconds.",
                    src: "/assets/avatar.png",
                  },
                  {
                    avatar: 2,
                    name: "Multi-Language Support",
                    description: "40+ languages supported.",
                    src: "/assets/avatar.png",
                  },
                  {
                    avatar: 3,
                    name: "Privacy",
                    description: "You own your data.",
                    src: "/assets/avatar.png",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 lg:w-[400px] w-[270px] h-20 bg-white border rounded-xl shadow-[0px_3px_8px_-1px_#3232470D,0px_0px_1px_0px_#0C1A4B3D]"
                  >
                    <div className="flex items-center">
                      <Avatar src={item.src} badge="/assets/avatar_badge.png" />
                      <div className="grid ml-4">
                        <h1 className="font-semibold">{item.name}</h1>
                        <p className="font-normal text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Dots />
                    </div>
                  </div>
                ))}
              </div>
              <ContentCard
                title="Simplify legal work"
                description="Explore from a vast library of cases and legal databases."
                className="mt-8"
              />
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-5">
          <ChartCard />
          <div className="bg-[#EBEBEB] h-[483px] lg:w-2/5 overflow-hidden w-full mr-0 flex flex-col items-center justify-center rounded-[26px] p-5 border-4 border-dashed border-[#D5D5D5]">
            <AttachIcon className="rotate-[-16deg] scale-180" />
            <ContentCard
              title="Easy document upload"
              description="Upload any kind of documents and you will get a concise report based on it in seconds."
              className="mt-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grids;
