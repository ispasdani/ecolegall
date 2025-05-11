"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import ContractIcon from "@/svgs/contractIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarItemsMenu = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <SidebarMenu>
      <SidebarMenuItem key={t("protected.sidebarContract.title")}>
        <SidebarMenuButton asChild>
          <Link
            href={t("protected.sidebarContract.url")}
            className={cn(
              {
                "!bg-primary !text-white":
                  pathname === t("protected.sidebarContract.url"),
              },
              "list-none"
            )}
          >
            <ContractIcon />
            <span>{t("protected.sidebarContract.title")}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarItemsMenu;
