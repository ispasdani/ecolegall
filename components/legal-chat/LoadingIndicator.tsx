import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Scale, Search, Brain, PenTool } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingIndicatorProps {
  stage: "thinking" | "searching" | "generating" | "idle";
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  stage,
}) => {
  const getStageInfo = () => {
    switch (stage) {
      case "thinking":
        return {
          icon: <Brain className="h-4 w-4 text-blue-600 animate-pulse" />,
          message: "Analyzing your legal question...",
          color: "text-blue-600",
        };
      case "searching":
        return {
          icon: <Search className="h-4 w-4 text-green-600 animate-pulse" />,
          message: "Searching legal databases and sources...",
          color: "text-green-600",
        };
      case "generating":
        return {
          icon: <PenTool className="h-4 w-4 text-purple-600 animate-pulse" />,
          message: "Crafting comprehensive legal response...",
          color: "text-purple-600",
        };
      default:
        return null;
    }
  };

  const stageInfo = getStageInfo();

  if (!stageInfo || stage === "idle") return null;

  return (
    <div className="flex gap-3 mb-6">
      <Avatar className="h-8 w-8 bg-blue-600">
        <AvatarFallback>
          <Scale className="h-4 w-4 text-white" />
        </AvatarFallback>
      </Avatar>

      <Card className="max-w-[80%] p-4 bg-gray-50 border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          {stageInfo.icon}
          <span className={`text-sm font-medium ${stageInfo.color}`}>
            {stageInfo.message}
          </span>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </Card>
    </div>
  );
};
