import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Mutation to create a new contract analysis
export const create = mutation({
  args: {
    userId: v.id("users"),
    contractText: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    contractType: v.string(),
    language: v.string(),
    aiModel: v.string(),
  },
  handler: async (ctx, args) => {
    const analysisId = await ctx.db.insert("contractAnalyses", {
      userId: args.userId,
      contractText: args.contractText,
      status: args.status,
      contractType: args.contractType,
      language: args.language,
      aiModel: args.aiModel,
      // Initialize empty arrays and default values
      risks: [],
      opportunities: [],
      summary: "",
      recommendations: [],
      keyClauses: [],
      legalCompliance: "",
      negotiationPoints: [],
      contractDuration: "",
      terminationConditions: "",
      overallScore: 0,
      compensationStructure: {
        baseSalary: "N/A",
        bonuses: "N/A",
        equity: "N/A",
        otherBenefits: "N/A",
      },
      performanceMetrics: [],
      intellectualPropertyClauses: "",
      version: 1,
      creditsUsed: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return analysisId;
  },
});

// Mutation to update contract analysis with results
export const update = mutation({
  args: {
    analysisId: v.id("contractAnalyses"),
    analysis: v.optional(
      v.object({
        risks: v.array(
          v.object({
            risk: v.string(),
            explanation: v.string(),
            severity: v.union(
              v.literal("low"),
              v.literal("medium"),
              v.literal("high")
            ),
          })
        ),
        opportunities: v.array(
          v.object({
            opportunity: v.string(),
            explanation: v.string(),
            impact: v.union(
              v.literal("low"),
              v.literal("medium"),
              v.literal("high")
            ),
          })
        ),
        summary: v.string(),
        recommendations: v.array(v.string()),
        keyClauses: v.array(v.string()),
        legalCompliance: v.string(),
        negotiationPoints: v.array(v.string()),
        contractDuration: v.string(),
        terminationConditions: v.string(),
        overallScore: v.number(),
        compensationStructure: v.object({
          baseSalary: v.string(),
          bonuses: v.string(),
          equity: v.string(),
          otherBenefits: v.string(),
        }),
        performanceMetrics: v.array(v.string()),
        contractType: v.string(),
        intellectualPropertyClauses: v.string(),
        language: v.string(),
      })
    ),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("processing"),
        v.literal("completed"),
        v.literal("failed")
      )
    ),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { analysisId, analysis, status, errorMessage } = args;

    const updatePayload: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (analysis) {
      Object.assign(updatePayload, {
        ...analysis,
        creditsUsed: 10, // Set the credits used
        analyzedAt: new Date().toISOString(),
      });
    }

    if (status) {
      updatePayload.status = status;
    }

    if (errorMessage !== undefined) {
      updatePayload.errorMessage = errorMessage;
    }

    await ctx.db.patch(analysisId, updatePayload);
  },
});

// Query to get contract analysis by ID
export const getById = query({
  args: {
    analysisId: v.id("contractAnalyses"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const analysis = await ctx.db.get(args.analysisId);

    if (!analysis) {
      return null;
    }

    // Verify the analysis belongs to the user
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.userId))
      .first();

    if (!user || analysis.userId !== user._id) {
      throw new ConvexError("Unauthorized access to analysis");
    }

    return analysis;
  },
});

// Query to list user's contract analyses
export const listByUser = query({
  args: {
    userId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.userId))
      .first();

    if (!user) {
      return [];
    }

    const query = ctx.db
      .query("contractAnalyses")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .order("desc");

    if (args.limit) {
      return await query.take(args.limit);
    }

    return await query.collect();
  },
});

// Mutation to delete a contract analysis
export const deleteAnalysis = mutation({
  args: {
    analysisId: v.id("contractAnalyses"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const analysis = await ctx.db.get(args.analysisId);

    if (!analysis) {
      throw new ConvexError("Analysis not found");
    }

    // Verify the analysis belongs to the user
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.userId))
      .first();

    if (!user || analysis.userId !== user._id) {
      throw new ConvexError("Unauthorized to delete this analysis");
    }

    await ctx.db.delete(args.analysisId);
  },
});
