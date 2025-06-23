import { createLegalAIPrompt } from "@/utils/legal-ai-prompt";

export interface LegalChatResponse {
  success: boolean;
  response: string;
  creditsUsed: number;
  remainingCredits: number;
}

export const askLegalQuestion = async (
  question: string,
  apiKey: string,
  userId?: string
): Promise<LegalChatResponse> => {
  if (!apiKey) {
    throw new Error("Google Generative AI API key is required");
  }

  try {
    // Import Google Generative AI dynamically to avoid server-side issues
    const { GoogleGenerativeAI } = await import("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    const prompt = createLegalAIPrompt(question);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from AI");
    }

    // For now, return mock credit data
    // You can integrate with your Convex backend later
    return {
      success: true,
      response: text,
      creditsUsed: 5, // Adjust based on your credit system
      remainingCredits: 95, // This should come from your user system
    };
  } catch (error) {
    console.error("Error calling Google Generative AI:", error);
    throw new Error(
      error instanceof Error
        ? `AI Service Error: ${error.message}`
        : "Failed to get response from AI service"
    );
  }
};
