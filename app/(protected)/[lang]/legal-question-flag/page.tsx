"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/components/legal-chat/ChatMessage";
import { LoadingIndicator } from "@/components/legal-chat/LoadingIndicator";
import { ChatInput } from "@/components/legal-chat/ChatInput";
import { askLegalQuestion } from "@/services/legal-chat-service";
import { Scale, AlertTriangle, Settings, Info } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface LoadingState {
  isLoading: boolean;
  stage: "thinking" | "searching" | "generating" | "idle";
}

const LegalConsultant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    stage: "idle",
  });
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(true);
  const [remainingCredits, setRemainingCredits] = useState<number>(100);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingState]);

  useEffect(() => {
    // Check for API key in localStorage
    const savedApiKey = localStorage.getItem("google_ai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("google_ai_api_key", apiKey.trim());
      setShowApiKeyInput(false);
      toast.success("API Key Saved", {
        description: "Your Google AI API key has been saved locally.",
      });
    }
  };

  const simulateLoadingStages = async (onComplete: () => Promise<void>) => {
    const stages: Array<LoadingState["stage"]> = [
      "thinking",
      "searching",
      "generating",
    ];

    for (let i = 0; i < stages.length; i++) {
      setLoadingState({ isLoading: true, stage: stages[i] });
      await new Promise((resolve) =>
        setTimeout(resolve, 1500 + Math.random() * 1000)
      );
    }

    await onComplete();

    setLoadingState({ isLoading: false, stage: "idle" });
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!apiKey.trim()) {
      toast.error("API Key Required", {
        description: "Please enter your Google AI API key first.",
      });
      setShowApiKeyInput(true);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);

    await simulateLoadingStages(async () => {
      try {
        const response = await askLegalQuestion(userMessage, apiKey);

        if (response.success) {
          const assistantMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: response.response,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, assistantMsg]);
          setRemainingCredits(response.remainingCredits);

          toast.success("Legal Analysis Complete", {
            description: `Used ${response.creditsUsed} credits. ${response.remainingCredits} remaining.`,
          });
        }
      } catch (error) {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `I apologize, but I encountered an error while processing your legal question: ${error instanceof Error ? error.message : "Unknown error"}. Please try again or check your API key.`,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMsg]);

        toast.error("Error", {
          description: "Failed to get legal consultation. Please try again.",
        });
      }
    });
  };

  const clearChat = () => {
    setMessages([]);
    toast.success("Chat Cleared", {
      description: "Your conversation history has been cleared.",
    });
  };

  const clearApiKey = () => {
    setApiKey("");
    localStorage.removeItem("google_ai_api_key");
    setShowApiKeyInput(true);
    toast.success("API Key Removed", {
      description: "Your API key has been removed from local storage.",
    });
  };

  if (showApiKeyInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto pt-20">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Legal Consultant Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  To use the Legal Consultant, please enter your Google
                  Generative AI API key. It will be stored locally in your
                  browser.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Google AI API Key
                </label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Google AI API key"
                  className="font-mono text-sm"
                />
              </div>

              <Button
                onClick={saveApiKey}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!apiKey.trim()}
              >
                Save API Key & Continue
              </Button>

              <p className="text-xs text-gray-600 text-center">
                Your API key is stored locally and never sent to our servers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Legal Consultant
                </h1>
                <p className="text-sm text-gray-600">
                  Romanian & EU Legal Expert
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {remainingCredits} Credits
              </Badge>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiKeyInput(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>

              {messages.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearChat}>
                  Clear Chat
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-80px)] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-1">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welcome to Legal Consultant
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Ask any legal question related to Romanian or European Union
                law. I'm here to provide expert legal guidance and analysis.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
                <Card
                  className="p-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() =>
                    handleSendMessage(
                      "What are my rights as an employee in Romania regarding overtime pay?"
                    )
                  }
                >
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Employment Law
                  </p>
                  <p className="text-sm text-gray-700">
                    What are my rights regarding overtime pay in Romania?
                  </p>
                </Card>

                <Card
                  className="p-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() =>
                    handleSendMessage(
                      "How does GDPR affect small businesses in the EU?"
                    )
                  }
                >
                  <p className="text-sm font-medium text-green-600 mb-1">
                    Data Protection
                  </p>
                  <p className="text-sm text-gray-700">
                    How does GDPR affect small businesses in the EU?
                  </p>
                </Card>

                <Card
                  className="p-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() =>
                    handleSendMessage(
                      "What are the requirements for starting a SRL company in Romania?"
                    )
                  }
                >
                  <p className="text-sm font-medium text-purple-600 mb-1">
                    Corporate Law
                  </p>
                  <p className="text-sm text-gray-700">
                    Requirements for starting a SRL company in Romania?
                  </p>
                </Card>

                <Card
                  className="p-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() =>
                    handleSendMessage(
                      "What are consumer protection rights when buying online in the EU?"
                    )
                  }
                >
                  <p className="text-sm font-medium text-orange-600 mb-1">
                    Consumer Rights
                  </p>
                  <p className="text-sm text-gray-700">
                    Consumer protection rights when buying online in the EU?
                  </p>
                </Card>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          <LoadingIndicator stage={loadingState.stage} />

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={loadingState.isLoading}
            remainingCredits={remainingCredits}
          />
        </div>
      </div>
    </div>
  );
};

export default LegalConsultant;
