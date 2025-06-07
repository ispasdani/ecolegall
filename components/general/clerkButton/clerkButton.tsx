"use client";

import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import React from "react";
import { UserButton } from "@clerk/nextjs";

const ClerkButton = () => {
  const { sessionId } = useAuth();

  if (!sessionId) {
    return (
      <SignInButton
        // eslint-disable-next-line
        // @ts-ignore

        style={{ boxShadow: "0px 4px 14.8px rgba(0, 0, 0, 0.2)" }}
        className="cursor-pointer flex items-center justify-center w-full md:w-36 h-10 rounded-xl border border-emerald-600 bg-gradient-to-b from-emerald-500 to-[#25a18e] text-base font-semibold text-white hover:from-white hover:to-white hover:border-2 hover:text-emerald-600"
      >
        Get Started
      </SignInButton>
    );
  }

  return <UserButton />;
};

export default ClerkButton;
