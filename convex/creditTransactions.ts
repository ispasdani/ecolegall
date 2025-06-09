import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to create a credit transaction
export const create = mutation({
  args: {
    userId: v.id("users"),
    type: v.union(
      v.literal("purchase"),
      v.literal("usage"),
      v.literal("refund"),
      v.literal("bonus")
    ),
    amount: v.number(),
    description: v.string(),
    relatedId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get the user's current balance
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const newBalance = user.credits + args.amount;

    // Create the transaction record
    const transactionId = await ctx.db.insert("creditTransactions", {
      userId: args.userId,
      type: args.type,
      amount: args.amount,
      balance: newBalance,
      description: args.description,
      relatedId: args.relatedId,
      createdAt: new Date().toISOString(),
    });

    return transactionId;
  },
});

// Query to get user's credit transactions
export const listByUser = query({
  args: {
    userId: v.string(),
    limit: v.optional(v.number()),
    type: v.optional(
      v.union(
        v.literal("purchase"),
        v.literal("usage"),
        v.literal("refund"),
        v.literal("bonus")
      )
    ),
  },
  handler: async (ctx, args) => {
    // Get user by clerkId
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.userId))
      .first();

    if (!user) {
      return [];
    }

    let query = ctx.db
      .query("creditTransactions")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .order("desc");

    // Filter by type if provided
    if (args.type) {
      const filteredTransactions = await query.collect();
      const filtered = filteredTransactions.filter((t) => t.type === args.type);
      return args.limit ? filtered.slice(0, args.limit) : filtered;
    }

    if (args.limit) {
      return await query.take(args.limit);
    }

    return await query.collect();
  },
});

// Query to get credit usage statistics
export const getUsageStats = query({
  args: {
    userId: v.string(),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get user by clerkId
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.userId))
      .first();

    if (!user) {
      return {
        totalPurchased: 0,
        totalUsed: 0,
        totalRefunded: 0,
        totalBonus: 0,
        currentBalance: 0,
      };
    }

    let transactions = await ctx.db
      .query("creditTransactions")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect();

    // Filter by date range if provided
    if (args.startDate || args.endDate) {
      transactions = transactions.filter((t) => {
        const transactionDate = new Date(t.createdAt);
        if (args.startDate && transactionDate < new Date(args.startDate)) {
          return false;
        }
        if (args.endDate && transactionDate > new Date(args.endDate)) {
          return false;
        }
        return true;
      });
    }

    // Calculate statistics
    const stats = transactions.reduce(
      (acc, transaction) => {
        switch (transaction.type) {
          case "purchase":
            acc.totalPurchased += transaction.amount;
            break;
          case "usage":
            acc.totalUsed += Math.abs(transaction.amount);
            break;
          case "refund":
            acc.totalRefunded += transaction.amount;
            break;
          case "bonus":
            acc.totalBonus += transaction.amount;
            break;
        }
        return acc;
      },
      {
        totalPurchased: 0,
        totalUsed: 0,
        totalRefunded: 0,
        totalBonus: 0,
        currentBalance: user.credits,
      }
    );

    return stats;
  },
});
