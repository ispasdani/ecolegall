export default {
  public: {
    title: "Legal AI Platform",
    subtitle: "AI-powered legal assistance for contracts and documents",
    loginButton: "Login",
    signupButton: "Sign Up",
    features: {
      feature1: "Contract Analysis",
      feature2: "Legal AI Assistant",
      feature3: "Document Management",
    },
    publicNav: {
      contractAnalyzer: {
        title: "Contract Analyzer",
        href: "/{lang}/contract-analyzer",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      askALegalQuestion: {
        title: "Ask a Legal Question",
        href: "/{lang}/legal-question",
        description:
          "For sighted users to preview content available behind a link.",
      },
      documentAnalyzer: {
        title: "Document Analyzer",
        href: "/{lang}/document-analyzer",
        description:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      },
      generateDocument: {
        title: "Generate Document",
        href: "/{lang}/generate-document",
        description: "Visually or semantically separates content.",
      },
    },
  },
  protected: {
    common: {
      dashboard: "Dashboard",
      settings: "Settings",
      logout: "Logout",
    },
    contractChecker: {
      title: "Contract Checker",
      description: "Analyze your contracts for potential issues.",
      uploadButton: "Upload Contract",
    },
    legalAI: {
      title: "Legal AI Assistant",
      description: "Get AI-powered legal advice and document analysis.",
      askQuestion: "Ask a legal question",
    },
    sidebarApplicationLabel: {
      title: "Applications",
    },
    sidebarDashboard: {
      title: "Dashboard",
      url: "/{lang}/dashboard",
    },
    sidebarContract: {
      title: "Contract Analyzer",
      url: "/{lang}/contract-analyzer",
    },
    sidebarAskAQuestion: {
      title: "Ask a Legal Question",
      url: "/{lang}/legal-question",
    },
    sidebarDocumentAnalyzer: {
      title: "Document Analyzer",
      url: "/{lang}/document-analyzer",
    },
    sidebarGenerateDocument: {
      title: "Generate Document",
      url: "/{lang}/generate-document",
    },
  },
};
