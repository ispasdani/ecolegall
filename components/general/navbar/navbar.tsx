"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/context/LanguageContext";
import Icon from "../icon/Icon";
import ClerkButton from "../clerkButton/clerkButton";

const Nav = () => {
  const { t, lang } = useLanguage();

  // Function to build correct URLs with language parameter
  const buildUrl = (baseUrl: string) => {
    return baseUrl.replace("{lang}", lang);
  };

  const components: { title: string; href: string; description: string }[] = [
    {
      title: t("public.publicNav.contractAnalyzer.title"),
      href: "/{lang}/contract-analyzer",
      description: t("public.publicNav.contractAnalyzer.description"),
    },
    {
      title: t("public.publicNav.askALegalQuestion.title"),
      href: "/{lang}/legal-question",
      description: t("public.publicNav.askALegalQuestion.description"),
    },
    {
      title: t("public.publicNav.documentAnalyzer.title"),
      href: "/{lang}/document-analyzer",
      description: t("public.publicNav.documentAnalyzer.description"),
    },
    {
      title: t("public.publicNav.generateDocument.title"),
      href: "/{lang}/generate-document",
      description: t("public.publicNav.generateDocument.description"),
    },
  ];

  return (
    <nav className="w-full h-[8vh] px-10 flex items-center justify-between">
      <Icon />

      <NavigationMenu>
        <NavigationMenuList>
          {/* About Us Link */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={buildUrl(t("public.publicNav.aboutUs.href") || "#")}>
                {t("public.publicNav.aboutUs.title")}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Pricing Link */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={buildUrl(t("public.publicNav.pricing.href") || "#")}>
                {t("public.publicNav.pricing.title")}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Products Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t("public.publicNav.products.title")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={buildUrl(component.href)}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Dashboard Link */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                href={buildUrl(t("public.publicNav.dashboard.href") || "#")}
              >
                {t("public.publicNav.dashboard.title")}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div>
        <ClerkButton />
      </div>
    </nav>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default Nav;
