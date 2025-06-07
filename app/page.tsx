// app/page.tsx
"use client";

import Grids from "@/components/general/grids/grids";
import Header from "@/components/general/headers";
import LanguageSwitcher from "@/components/languageTranslations/LanguageSwitcher";
import Hero from "@/components/publicSections/hero";
import ProductPreview from "@/components/publicSections/productPreview";
import Products from "@/components/publicSections/products";
import ProductsCards from "@/components/publicSections/productsCards";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="w-full">
      <Hero />
      <Products />
      <ProductsCards />
      <ProductPreview />
      <Header />
      <Grids />
      <header className="">
        <h1>{t("public.title")}</h1>
        <div className="header-right">
          <LanguageSwitcher />
        </div>
      </header>

      <section className="hero">
        <h2>{t("public.subtitle")}</h2>

        <div className="features">
          <div className="feature">
            <h3>{t("public.features.feature1")}</h3>
          </div>
          <div className="feature">
            <h3>{t("public.features.feature2")}</h3>
          </div>
          <div className="feature">
            <h3>{t("public.features.feature3")}</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
