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

    // Subscription fields
    subscriptionId: v.optional(v.string()), // Stripe subscription ID
    subscriptionStatus: v.optional(v.string()), // active, canceled, past_due, etc.
    currentPeriodStart: v.optional(v.string()), // ISO date string
    currentPeriodEnd: v.optional(v.string()), // ISO date string
    cancelAtPeriodEnd: v.optional(v.boolean()), // true if user canceled but subscription is still active
    planId: v.optional(v.id("plans")), // reference to current subscription plan
  }),
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

    // New fields for subscription support
    type: v.string(), // "one_time" or "subscription"
    interval: v.optional(v.string()), // "month" or "year" for subscriptions
    stripeProductId: v.optional(v.string()), // Stripe product ID
    stripePriceId: v.optional(v.string()), // Stripe price ID
  }),
});
