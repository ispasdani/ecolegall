import { cn } from "@/lib/utils";
import React from "react";

const Analytics: React.FC<{
  className?: string;
  color: string;
}> = ({ className, color }) => {
  return (
    <div className="md:[&>*]:scale-100 [&>*]:scale-75">
      <div
        className={cn(
          "w-[220px] h-[242px] rounded-2xl overflow-hidden bg-[#FFFFFF]",
          "shadow-[0px_7px_15px_0px_#3333331A,0px_27px_27px_0px_#33333317,0px_60px_36px_0px_#3333330D,0px_106px_43px_0px_#33333303,0px_166px_47px_0px_#33333300]",
          className
        )}
      >
        <div
          className={
            "h-10 font-normal text-sm flex items-center p-4 text-neutral-700"
          }
          style={{
            backgroundColor: color,
          }}
        >
          Analytics
        </div>
        <div className="p-2 space-y-2">
          <p className="text-sm p-1 text-neutral-700">Contract Stats</p>
          <div className="px-1">
            <p className="text-base -mb-1.5">Lease Agreements</p>
            <label className="text-xs text-neutral-700">
              77% <span className="text-yellow-500">| Moderate Risk</span>
            </label>
          </div>
          <div className="px-1">
            <p className="text-base -mb-1.5">Employment Contracts</p>
            <label className="text-xs text-neutral-700">
              90% <span className="text-green-500">| Good</span>
            </label>
          </div>
          <div className="px-1">
            <p className="text-base -mb-1.5">Sales Contracts</p>
            <label className="text-xs text-neutral-700">
              21% <span className="text-red-500">| High Risk</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
