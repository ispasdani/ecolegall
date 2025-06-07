"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleSend = () => {
    if (!message.trim() && files.length === 0) return;
    console.log("Sending:", { message, files });
    setMessage("");
    setFiles([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3 p-4">
      {/* File Previews */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, idx) => (
            <div key={idx} className="text-sm text-muted-foreground px-2">
              📎 {file.name}
            </div>
          ))}
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
        {/* Left: Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full px-4 py-1 text-sm"
            >
              Select Agent
            </Button>
          </DropdownMenuTrigger>

          {/* 👇 Updated part below */}
          <DropdownMenuPortal forceMount={true}>
            <DropdownMenuContent className="z-50">
              <DropdownMenuItem>Agent 1</DropdownMenuItem>
              <DropdownMenuItem>Agent 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>

        {/* Middle: Input */}
        <Input
          className="mx-4 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Attach */}
          <Button
            variant="outline"
            className="rounded-full px-3 py-1 text-sm"
            asChild
          >
            <label
              htmlFor="file-upload"
              className="flex items-center cursor-pointer"
            >
              <Paperclip className="h-4 w-4" />
              <span className="ml-1">Attach</span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </Button>

          {/* Send */}
          <Button
            onClick={handleSend}
            className="bg-black text-white rounded-full px-4 py-2 hover:bg-black/90"
          >
            <Send className="h-4 w-4" />
            <span className="ml-1">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
