// app/page.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/general/LanguageSwitcher";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      <header className="bg-red-300">
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
