import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  remainingCredits?: number;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  remainingCredits,
}) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <Card className="p-4 bg-white border-t shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask your legal question here... (e.g., What are my rights as an employee in Romania? How does GDPR affect my business?)"
              className="min-h-[50px] max-h-[120px] resize-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 h-[50px] px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {remainingCredits !== undefined && (
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span className="font-medium">
              Credits remaining: {remainingCredits}
            </span>
          </div>
        )}
      </form>
    </Card>
  );
};
