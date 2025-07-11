// components/sidebar/SidebarItemsMenu.tsx
"use client";

import GenerateDocument from "@/app/(protected)/[lang]/generate-document/page";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import AskALegalQuestionIcon from "@/svgs/askALegalQuestionIcon";
import ContractIcon from "@/svgs/contractIcon";
import DashboardIcon from "@/svgs/dashboardIcon";
import DocumentAnalyzerIcon from "@/svgs/documentAnalyzerIcon";
import DocumentGenerationIcon from "@/svgs/documentGenerationIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarItemsMenu = () => {
  const pathname = usePathname();
  const { t, lang } = useLanguage(); // Get lang from the context

  // Function to build correct URLs with language parameter
  const buildUrl = (baseUrl: string) => {
    return baseUrl.replace("{lang}", lang);
  };

  // Function to check if a path is active, accounting for the language parameter
  const isActive = (baseUrl: string) => {
    const fullPath = buildUrl(baseUrl);
    return (
      pathname === fullPath || pathname.endsWith(baseUrl.replace("{lang}", ""))
    );
  };

  return (
    <SidebarMenu>
      {/* Dashboard Item */}
      <SidebarMenuItem key={t("protected.sidebarDashboard.title")}>
        <SidebarMenuButton asChild>
          <Link
            href={buildUrl(t("protected.sidebarDashboard.url"))}
            className={cn(
              {
                "!bg-primary !text-white": isActive(
                  t("protected.sidebarDashboard.url")
                ),
              },
              "list-none"
            )}
          >
            <DashboardIcon
              fill={`${isActive(t("protected.sidebarDashboard.url")) ? "white" : "#25A18E"}`}
            />
            <span>{t("protected.sidebarDashboard.title")}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {/* ------------ */}
      {/* Contract Analyzer Item */}
      <SidebarMenuItem key={t("protected.sidebarContract.title")}>
        <SidebarMenuButton asChild>
          <Link
            href={buildUrl(t("protected.sidebarContract.url"))}
            className={cn(
              {
                "!bg-primary !text-white": isActive(
                  t("protected.sidebarContract.url")
                ),
              },
              "list-none"
            )}
          >
            <ContractIcon
              fill={`${isActive(t("protected.sidebarContract.url")) ? "white" : "#25A18E"}`}
            />
            <span>{t("protected.sidebarContract.title")}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {/* ------------ */}
      {/* Ask A Question Item */}
      <SidebarMenuItem key={t("protected.sidebarAskAQuestion.title")}>
        <SidebarMenuButton asChild>
          <Link
            href={buildUrl(t("protected.sidebarAskAQuestion.url"))}
            className={cn(
              {
                "!bg-primary !text-white": isActive(
                  t("protected.sidebarAskAQuestion.url")
                ),
              },
              "list-none"
            )}
          >
            <AskALegalQuestionIcon
              fill={`${isActive(t("protected.sidebarAskAQuestion.url")) ? "white" : "#25A18E"}`}
            />
            <span>{t("protected.sidebarAskAQuestion.title")}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {/* ------------ */}
      {/* Document Analyzer Item */}
      <SidebarMenuItem key={t("protected.sidebarDocumentAnalyzer.title")}>
        <SidebarMenuButton asChild>
          <Link
            href={buildUrl(t("protected.sidebarDocumentAnalyzer.url"))}
            className={cn(
              {
                "!bg-primary !text-white": isActive(
                  t("protected.sidebarDocumentAnalyzer.url")
                ),
              },
              "list-none"
            )}
          >
            <DocumentAnalyzerIcon
              fill={`${isActive(t("protected.sidebarDocumentAnalyzer.url")) ? "white" : "#25A18E"}`}
            />
            <span>{t("protected.sidebarDocumentAnalyzer.title")}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {/* ------------ */}
      {/* Generate Document Item */}
      <SidebarMenuItem key={t("protected.sidebarGenerateDocument.title")}>
        <SidebarMenuButton asChild>
          <Link
            href={buildUrl(t("protected.sidebarGenerateDocument.url"))}
            className={cn(
              {
                "!bg-primary !text-white": isActive(
                  t("protected.sidebarGenerateDocument.url")
                ),
              },
              "list-none"
            )}
          >
            <DocumentGenerationIcon
              fill={`${isActive(t("protected.sidebarGenerateDocument.url")) ? "white" : "#25A18E"}`}
            />
            <span>{t("protected.sidebarGenerateDocument.title")}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {/* ------------ */}
    </SidebarMenu>
  );
};

export default SidebarItemsMenu;
