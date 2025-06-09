"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "../ui/sidebar";

import Link from "next/link";

import SidebarItemsMenu from "./sidebarMenuItems";
import { useLanguage } from "@/context/LanguageContext";
import FullLogo from "@/svgs/fullLogo";
import IconLogo from "@/svgs/iconLogo";

const AppSidebar = () => {
  const { open } = useSidebar();
  const { t } = useLanguage(); // Get lang from the context

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-center items-center ">
        <Link
          href={"/"}
          className={`${open ? "w-[120px]" : "scale-70"} flex items-center justify-start`}
        >
          {open ? <FullLogo /> : <IconLogo />}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {t("protected.sidebarApplicationLabel.title")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarItemsMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
