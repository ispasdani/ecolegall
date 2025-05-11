// No 'use client' here - this is a server component

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import LanguageSynchronizer from "@/components/languageTranslations/LanguageSynchronizer";
import React from "react";
import AppSidebar from "@/components/sidebar/appSidebar";
import LanguageSwitcher from "@/components/languageTranslations/LanguageSwitcher";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* Include the language synchronizer client component */}
      <LanguageSynchronizer />

      <main className="w-full">
        <div className="h-[5vh] flex items-center gap-2 border-sidebar-border bg-sidebar border p-2">
          <SidebarTrigger className="cursor-pointer" />
          <LanguageSwitcher />
          <div className="ml-auto"></div>
          <UserButton />
        </div>

        {/* Main Content*/}
        <div className="border-sidebar-border border shadow overflow-y-scroll-auto min-h-[95vh] p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ro" }, { lang: "es" }];
}
