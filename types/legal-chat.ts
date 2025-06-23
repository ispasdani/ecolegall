export interface LegalChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface LegalChatResponse {
  success: boolean;
  response: string;
  creditsUsed: number;
  remainingCredits: number;
  conversationId?: string;
}

export interface LoadingState {
  isLoading: boolean;
  stage: "thinking" | "searching" | "generating" | "idle";
  message: string;
}
