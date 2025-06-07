"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { useLanguage } from "@/context/LanguageContext";
import ClerkButton from "../clerkButton/clerkButton";
import FullLogo from "@/svgs/fullLogo";

const Nav = () => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Function to build correct URLs with language parameter
  const buildUrl = (baseUrl: string) => {
    return baseUrl.replace("{lang}", lang);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

  // Navigation items for mobile menu
  const mobileNavItems = [
    {
      title: t("public.publicNav.aboutUs.title"),
      href: buildUrl(t("public.publicNav.aboutUs.href") || "#"),
    },
    {
      title: t("public.publicNav.pricing.title"),
      href: buildUrl(t("public.publicNav.pricing.href") || "#"),
    },
    {
      title: t("public.publicNav.dashboard.title"),
      href: buildUrl(t("public.publicNav.dashboard.href") || "#"),
    },
  ];

  return (
    <nav className="w-full h-[10vh] flex items-center justify-between">
      <FullLogo />

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {/* About Us Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href={buildUrl(t("public.publicNav.aboutUs.href") || "#")}
                >
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
                <Link
                  href={buildUrl(t("public.publicNav.pricing.href") || "#")}
                >
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
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={toggleMenu}
        >
          {isOpen ? (
            <motion.svg
              initial={{ rotate: 0 }}
              animate={{ rotate: 180 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </motion.svg>
          )}
        </motion.button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.1,
              type: "spring",
              stiffness: 1000,
              damping: 30,
            }}
            className="fixed inset-0 pt-10 flex flex-col justify-start items-center w-full h-full bg-[#FAFAFA] z-50"
          >
            {/* Close button in mobile overlay */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggleMenu}
              className="fixed top-4 right-4"
            >
              <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            </motion.button>

            {/* Mobile Navigation Items */}
            <ul className="py-2 flex flex-col items-center w-full gap-4 mt-10">
              {mobileNavItems.map((item) => (
                <Link
                  onClick={() => setIsOpen(false)}
                  href={item.href}
                  key={item.title}
                >
                  <li className="px-4 py-2 text-base font-bold hover:text-accent-foreground">
                    {item.title}
                  </li>
                </Link>
              ))}

              {/* Products Section in Mobile */}
              <li className="px-4 py-2 text-base font-bold">
                {t("public.publicNav.products.title")}
              </li>

              {/* Product Sub-items */}
              {components.map((component) => (
                <Link
                  onClick={() => setIsOpen(false)}
                  href={buildUrl(component.href)}
                  key={component.title}
                  className="ml-4"
                >
                  <li className="px-4 py-1 text-sm text-muted-foreground hover:text-accent-foreground">
                    {component.title}
                  </li>
                </Link>
              ))}
            </ul>

            {/* Mobile ClerkButton */}
            <div className="w-3/4 my-4">
              <ClerkButton />
            </div>
          </motion.div>
        )}
      </div>

      {/* Desktop ClerkButton */}
      <div className="hidden md:block">
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
