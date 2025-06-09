import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

interface User {
  _id: Id<"users">;
  clerkId: string;
  credits: number;
}

interface ContractAnalysisResult {
  risks: Array<{
    risk: string;
    explanation: string;
    severity: "low" | "medium" | "high";
  }>;
  opportunities: Array<{
    opportunity: string;
    explanation: string;
    impact: "low" | "medium" | "high";
  }>;
  summary: string;
  recommendations: string[];
  keyClauses: string[];
  legalCompliance: string;
  negotiationPoints: string[];
  contractDuration: string;
  terminationConditions: string;
  overallScore: number;
  compensationStructure: {
    baseSalary: string;
    bonuses: string;
    equity: string;
    otherBenefits: string;
  };
  performanceMetrics: string[];
  contractType: string;
  intellectualPropertyClauses: string;
  language: string;
}

const analyzeContractWithGemini = async (
  contractText: string,
  contractType: string = "general",
  language: string = "en"
): Promise<ContractAnalysisResult> => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const prompt = `
    You are an expert legal analyst specializing in contract review. Analyze the following ${contractType} contract and provide a comprehensive analysis.
    
    IMPORTANT: Your response MUST be a valid JSON object with the exact structure specified below. Do not include any text before or after the JSON object.

    Analyze from the perspective of the party receiving/signing the contract and provide:

    {
      "risks": [
        {
          "risk": "Brief title of the risk",
          "explanation": "Detailed explanation of why this is a risk and its potential implications",
          "severity": "low" | "medium" | "high"
        }
      ],
      "opportunities": [
        {
          "opportunity": "Brief title of the opportunity",
          "explanation": "Detailed explanation of the benefit and how to leverage it",
          "impact": "low" | "medium" | "high"
        }
      ],
      "summary": "A comprehensive 3-4 paragraph summary of the contract including its purpose, main parties involved, key obligations, and overall assessment",
      "recommendations": [
        "Specific, actionable recommendation for improving the contract or protecting interests"
      ],
      "keyClauses": [
        "Direct quote or summary of important clause from the contract"
      ],
      "legalCompliance": "Assessment of the contract's compliance with standard legal requirements and any potential legal concerns",
      "negotiationPoints": [
        "Specific clause or term that could be negotiated with suggested improvements"
      ],
      "contractDuration": "The specific duration/term of the contract including start date, end date, and any renewal provisions",
      "terminationConditions": "Detailed summary of how and when the contract can be terminated by either party",
      "overallScore": 75,
      "compensationStructure": {
        "baseSalary": "Base salary amount and payment frequency if applicable, or 'N/A'",
        "bonuses": "Bonus structure and conditions if applicable, or 'N/A'",
        "equity": "Equity compensation details if applicable, or 'N/A'",
        "otherBenefits": "Other benefits like insurance, vacation, etc. if applicable, or 'N/A'"
      },
      "performanceMetrics": [
        "Specific performance metric or KPI mentioned in the contract"
      ],
      "contractType": "${contractType}",
      "intellectualPropertyClauses": "Summary of IP ownership, work product, and confidentiality provisions",
      "language": "${language}"
    }

    Requirements for analysis:
    1. Identify at least 5 risks and 5 opportunities (more for complex contracts)
    2. Each risk and opportunity must have a detailed explanation
    3. Severity and impact levels must be strictly "low", "medium", or "high"
    4. Overall score must be a number between 1-100 representing contract favorability
    5. All arrays must contain at least one item (use "None identified" if truly nothing found)
    6. For employment contracts, focus on compensation, IP, non-compete clauses
    7. For service contracts, focus on deliverables, payment terms, liability
    8. For sales contracts, focus on warranties, payment, delivery terms
    9. Be specific and quote relevant sections when identifying key clauses
    10. Provide actionable recommendations that reference specific sections

    Contract text to analyze:
    ${contractText}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Clean up the response to ensure valid JSON
    text = text.trim();
    // Remove any markdown code blocks
    text = text.replace(/```json\n?|\n?```/g, "");
    // Remove any leading/trailing whitespace
    text = text.trim();

    try {
      const analysis = JSON.parse(text);

      // Validate the response structure
      if (!analysis.risks || !Array.isArray(analysis.risks)) {
        throw new Error("Invalid response structure: missing risks array");
      }
      if (!analysis.opportunities || !Array.isArray(analysis.opportunities)) {
        throw new Error(
          "Invalid response structure: missing opportunities array"
        );
      }
      if (typeof analysis.overallScore !== "number") {
        throw new Error(
          "Invalid response structure: overallScore must be a number"
        );
      }

      return analysis;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.error("Raw response:", text);
      throw new Error("Failed to parse AI response. Please try again.");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to analyze contract with AI");
  }
};

export const analyzeContract = action({
  args: {
    contractText: v.string(),
    contractType: v.optional(v.string()),
    language: v.optional(v.string()),
    userId: v.string(),
  },
  handler: async (
    ctx,
    args
  ): Promise<{
    success: boolean;
    analysisId: string;
    analysis: ContractAnalysisResult;
    creditsUsed: number;
    remainingCredits: number;
  }> => {
    // Verify if the user exists and has credits
    const user = (await ctx.runQuery(api.users.getUserById, {
      clerkId: args.userId,
    })) as User | null;

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user has enough credits (assuming 10 credits per analysis)
    const creditsRequired = 10;
    if (user.credits < creditsRequired) {
      throw new Error(
        "Insufficient credits. Please purchase more credits to continue."
      );
    }

    const { contractText, contractType = "general", language = "en" } = args;

    try {
      // Create initial analysis record with pending status
      const analysisId = (await ctx.runMutation(api.contractAnalyses.create, {
        userId: user._id,
        contractText,
        status: "processing",
        contractType,
        language,
        aiModel: "gemini-2.0-flash-exp",
      })) as Id<"contractAnalyses">;

      try {
        // Perform the AI analysis
        const analysisResult = await analyzeContractWithGemini(
          contractText,
          contractType,
          language
        );

        // Update the analysis record with results
        await ctx.runMutation(api.contractAnalyses.update, {
          analysisId,
          analysis: analysisResult,
          status: "completed",
        });

        // Deduct credits from user
        await ctx.runMutation(api.users.deductCredits, {
          userId: user._id,
          amount: creditsRequired,
        });

        // Record credit transaction
        await ctx.runMutation(api.creditTransactions.create, {
          userId: user._id,
          type: "usage",
          amount: -creditsRequired,
          description: `Contract analysis - ${contractType}`,
          relatedId: analysisId,
        });

        return {
          success: true,
          analysisId,
          analysis: analysisResult,
          creditsUsed: creditsRequired,
          remainingCredits: user.credits - creditsRequired,
        };
      } catch (analysisError) {
        // Update analysis record with error status
        await ctx.runMutation(api.contractAnalyses.update, {
          analysisId,
          status: "failed",
          errorMessage:
            analysisError instanceof Error
              ? analysisError.message
              : "Analysis failed",
        });

        throw analysisError;
      }
    } catch (error) {
      console.error("Error in contract analysis:", error);
      throw error;
    }
  },
});

// Helper action to get contract analysis by ID
export const getContractAnalysis = action({
  args: {
    analysisId: v.id("contractAnalyses"),
    userId: v.string(),
  },
  handler: async (ctx, args): Promise<any> => {
    const analysis = await ctx.runQuery(api.contractAnalyses.getById, {
      analysisId: args.analysisId,
      userId: args.userId,
    });

    if (!analysis) {
      throw new Error("Analysis not found");
    }

    return analysis;
  },
});
