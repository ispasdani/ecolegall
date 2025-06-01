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
import ListItem from "./listItem";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "../icon/Icon";
import ClerkButton from "../clerkButton/clerkButton";

const Nav = () => {
  const { t, lang } = useLanguage(); // Get lang from the context

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
    <NavigationMenu viewport={false} className="h-[8vh] px-10">
      <NavigationMenuList>
        <Icon />
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Aplicatii</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Privacy Policy</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <ClerkButton />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Nav;
