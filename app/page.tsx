// app/page.tsx
"use client";

import Footer from "@/components/general/footer";
import Grids from "@/components/general/grids/grids";
import Header from "@/components/general/headers";
import Nav from "@/components/general/navbar/navbar";
import LanguageSwitcher from "@/components/languageTranslations/LanguageSwitcher";
import AboutUs from "@/components/publicSections/aboutUsSection";
import FAQSection from "@/components/publicSections/faq";
import Hero from "@/components/publicSections/hero";
import MapSection from "@/components/publicSections/mapSection";
import Pricing from "@/components/publicSections/pricingSection";
import ProductPreview from "@/components/publicSections/productPreview";
import Products from "@/components/publicSections/products";
import ProductsCards from "@/components/publicSections/productsCards";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="w-full px-20">
      <Nav />
      <Hero />
      <Products />
      <ProductsCards />
      <ProductPreview />
      <Header />
      <Grids />
      <Header
        badge="Availability"
        title="We are available everywhere"
        subtitle="Our platform is available in all countries. Currently we support legal databases from 11 countries and we currently work in adding more."
        className="mt-40 md:mt-40"
      />
      <MapSection />
      <Header
        badge="Pricing"
        title="Pricing so simple, you buy credits instantly"
        subtitle="Pick from our packs and get started in minutes, simple for everyone. Pay what you use. No subscription needed!"
        className="mt-3"
      />
      <Pricing />

      <Header
        badge="About Us"
        title="Regular updates from us"
        subtitle="This is the section where we will try to do our best to keep you updated with the latest changes and improvements that we make. We want to be be like an open book."
        className="my-10"
      />
      <AboutUs />

      <FAQSection />
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
      <Footer />
    </main>
  );
}
