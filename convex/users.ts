import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

// Query to get a user by their clerkId.
export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
    return user; // Return null instead of throwing
  },
});

// Mutation to create a new user, with optional LinkedIn and GitHub profile fields.
export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
    credits: v.number(),
    // Optional new fields:
    linkedInProfile: v.optional(v.string()),
    githubProfile: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      name: args.name,
      credits: args.credits,
      // If the profiles are not provided, they can be stored as empty strings
      linkedInProfile: args.linkedInProfile || "",
      githubProfile: args.githubProfile || "",
    });
  },
});

// Mutation to update an existing user.
// You can update email, imageUrl, and the new profile fields.
export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    // Make these fields optional so that you can update one or several at a time.
    imageUrl: v.optional(v.string()),
    email: v.optional(v.string()),
    linkedInProfile: v.optional(v.string()),
    githubProfile: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    // Build an update object that includes only the fields provided in args.
    const updatePayload: Record<string, unknown> = {};

    if (args.imageUrl !== undefined) {
      updatePayload.imageUrl = args.imageUrl;
    }
    if (args.email !== undefined) {
      updatePayload.email = args.email;
    }
    if (args.linkedInProfile !== undefined) {
      updatePayload.linkedInProfile = args.linkedInProfile;
    }
    if (args.githubProfile !== undefined) {
      updatePayload.githubProfile = args.githubProfile;
    }

    await ctx.db.patch(user._id, updatePayload);
  },
});

// Mutation to delete a user by their clerkId.
export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});

// Mutation to deduct credits from a user
export const deductCredits = mutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new ConvexError("User not found");
    }

    if (user.credits < args.amount) {
      throw new ConvexError("Insufficient credits");
    }

    const newCredits = user.credits - args.amount;

    await ctx.db.patch(args.userId, {
      credits: newCredits,
    });

    return newCredits;
  },
});

// Mutation to add credits to a user (for purchases, refunds, etc.)
export const addCredits = mutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new ConvexError("User not found");
    }

    const newCredits = user.credits + args.amount;

    await ctx.db.patch(args.userId, {
      credits: newCredits,
    });

    return newCredits;
  },
});

// Query to get user's current credit balance
export const getCreditBalance = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!user) {
      return 0;
    }

    return user.credits;
  },
});
