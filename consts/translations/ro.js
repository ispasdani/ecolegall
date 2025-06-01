export default {
  public: {
    title: "Platformă AI Juridică",
    subtitle: "Asistență juridică bazată pe AI pentru contracte și documente",
    loginButton: "Conectare",
    signupButton: "Înregistrare",
    features: {
      feature1: "Analiză Contracte",
      feature2: "Asistent AI Juridic",
      feature3: "Management Documente",
    },
    publicNav: {
      aboutUs: {
        title: "Despre Noi",
        href: "",
      },
      pricing: { title: "Preturi", href: "" },
      products: { title: "Aplicatii", href: "" },
      dashboard: { title: "Dashboard", href: "" },
      contractAnalyzer: {
        title: "Analizor de Contracte",
        href: "/{lang}/contract-analyzer",
        description:
          "Un dialog modal care întrerupe utilizatorul cu un conținut important și așteaptă un răspuns.",
      },
      askALegalQuestion: {
        title: "Pune o Întrebare Legală",
        href: "/{lang}/legal-question",
        description:
          "Permite utilizatorilor care văd să previzualizeze conținutul disponibil în spatele unui link.",
      },
      documentAnalyzer: {
        title: "Analizor de Documente",
        href: "/{lang}/document-analyzer",
        description:
          "Afișează un indicator care arată progresul finalizării unei sarcini, de obicei sub forma unei bare de progres.",
      },
      generateDocument: {
        title: "Generează Document",
        href: "/{lang}/generate-document",
        description: "Separă conținutul vizual sau semantic.",
      },
    },
  },
  protected: {
    common: {
      dashboard: "Tablou de bord",
      settings: "Setări",
      logout: "Deconectare",
    },
    contractChecker: {
      title: "Verificator Contracte",
      description: "Analizează-ți contractele pentru posibile probleme.",
      uploadButton: "Încarcă Contract",
    },
    legalAI: {
      title: "Asistent AI Juridic",
      description:
        "Obține sfaturi juridice bazate pe AI și analiză de documente.",
      askQuestion: "Pune o întrebare juridică",
    },
    sidebarApplicationLabel: {
      title: "Aplicatii",
    },
    sidebarDashboard: {
      title: "Acasa",
      url: "/{lang}/dashboard",
    },
    sidebarContract: {
      title: "Analizeaza Contract",
      url: "/{lang}/contract-analyzer",
    },
    sidebarAskAQuestion: {
      title: "Pune o intrebare",
      url: "/{lang}/legal-question",
    },
    sidebarDocumentAnalyzer: {
      title: "Analizeaza Documente",
      url: "/{lang}/document-analyzer",
    },
    sidebarGenerateDocument: {
      title: "Redacteaza Documente",
      url: "/{lang}/generate-document",
    },
  },
};
