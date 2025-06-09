import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    imageUrl: v.optional(v.string()),
    clerkId: v.string(),
    name: v.string(),
    credits: v.number(),
    linkedInProfile: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    jobTitle: v.optional(v.string()),

    // Subscription fields (for future use)
    subscriptionId: v.optional(v.string()), // Stripe subscription ID
    subscriptionStatus: v.optional(v.string()), // active, canceled, past_due, etc.
    currentPeriodStart: v.optional(v.string()), // ISO date string
    currentPeriodEnd: v.optional(v.string()), // ISO date string
    cancelAtPeriodEnd: v.optional(v.boolean()), // true if user canceled but subscription is still active
    planId: v.optional(v.id("plans")), // reference to current subscription plan
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  payments: defineTable({
    userId: v.id("users"),
    stripeId: v.string(),
    status: v.string(),
    amount: v.number(),
    planId: v.id("plans"),
    createdAt: v.string(),
  }).index("stripeIdIndex", ["stripeId"]),

  plans: defineTable({
    name: v.string(),
    price: v.number(),
    credits: v.number(),
    imageGeneration: v.number(),
    description: v.string(),
    messageOne: v.string(),
    messageTwo: v.string(),
    messageThree: v.string(),
    messageFour: v.string(),
    messageFive: v.string(),
    messageSix: v.string(),

    // New fields for subscription support (for future use)
    type: v.string(), // "one_time" or "subscription"
    interval: v.optional(v.string()), // "month" or "year" for subscriptions
    stripeProductId: v.optional(v.string()), // Stripe product ID
    stripePriceId: v.optional(v.string()), // Stripe price ID
  }),

  // Contract Analyses table
  contractAnalyses: defineTable({
    userId: v.id("users"),
    contractText: v.string(),

    // File information
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    fileType: v.optional(v.string()),
    fileUrl: v.optional(v.string()), // If you store files in Convex storage

    // Analysis results
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

    // Metadata
    version: v.number(),
    expirationDate: v.optional(v.string()),
    language: v.string(),
    aiModel: v.string(),

    // Credits used for this analysis
    creditsUsed: v.number(),

    // Analysis status
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    errorMessage: v.optional(v.string()),

    // Timestamps (using ISO string format to match your existing schema)
    createdAt: v.string(),
    updatedAt: v.string(),
    analyzedAt: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),

  // Document Analyses table
  documentAnalyses: defineTable({
    userId: v.id("users"),
    documentText: v.string(),

    // File information
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    fileType: v.optional(v.string()),
    fileUrl: v.optional(v.string()),

    // Analysis results
    summary: v.string(),
    keyPoints: v.array(v.string()),
    documentType: v.string(),
    sentiment: v.union(
      v.literal("positive"),
      v.literal("neutral"),
      v.literal("negative"),
      v.literal("mixed")
    ),
    topics: v.array(v.string()),
    entities: v.array(
      v.object({
        name: v.string(),
        type: v.string(), // person, organization, location, etc.
        mentions: v.number(),
      })
    ),

    // Document-specific analysis
    readabilityScore: v.optional(v.number()),
    wordCount: v.number(),
    language: v.string(),

    // Insights and recommendations
    insights: v.array(
      v.object({
        insight: v.string(),
        importance: v.union(
          v.literal("low"),
          v.literal("medium"),
          v.literal("high")
        ),
        category: v.string(),
      })
    ),
    actionItems: v.array(v.string()),

    // Metadata
    aiModel: v.string(),
    confidence: v.number(), // 0-100 confidence score

    // Credits used for this analysis
    creditsUsed: v.number(),

    // Analysis status
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    errorMessage: v.optional(v.string()),

    // Timestamps (using ISO string format to match your existing schema)
    createdAt: v.string(),
    updatedAt: v.string(),
    analyzedAt: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"])
    .index("by_document_type", ["documentType"]),

  // Analysis History table - for tracking all analyses
  analysisHistory: defineTable({
    userId: v.id("users"),
    analysisType: v.union(v.literal("contract"), v.literal("document")),
    analysisId: v.union(v.id("contractAnalyses"), v.id("documentAnalyses")),
    title: v.string(),
    creditsUsed: v.number(),
    createdAt: v.string(), // ISO date string
  })
    .index("by_user", ["userId"])
    .index("by_type", ["analysisType"])
    .index("by_created", ["createdAt"]),

  // Credit Transactions table - for tracking credit usage
  creditTransactions: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("purchase"),
      v.literal("usage"),
      v.literal("refund"),
      v.literal("bonus")
    ),
    amount: v.number(), // positive for credits added, negative for credits used
    balance: v.number(), // balance after transaction
    description: v.string(),
    relatedId: v.optional(v.string()), // ID of related analysis, payment, etc.
    createdAt: v.string(), // ISO date string
  })
    .index("by_user", ["userId"])
    .index("by_created", ["createdAt"])
    .index("by_type", ["type"]),
});
