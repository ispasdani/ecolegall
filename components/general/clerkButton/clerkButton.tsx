"use client";

import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import React from "react";

const ClerkButton = () => {
  const { sessionId } = useAuth();

  if (!sessionId) {
    return <SignInButton />;
  }

  return <SignOutButton signOutOptions={{ sessionId }} />;
};

export default ClerkButton;
