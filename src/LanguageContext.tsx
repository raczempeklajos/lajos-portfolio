
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Defines the languages supported by the portfolio.
export type Language = "en" | "hu";

// Describes the data and functions available through the language context.
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

// Creates a shared context for accessing and updating the selected language.
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Provides the selected language and its setter to child components.
export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Initializes the language from localStorage.
  // English is used as the default if Hungarian was not previously selected.
  const [language, setLanguage] = useState<Language>(() => {
    return localStorage.getItem("portfolio-language") === "hu"
      ? "hu"
      : "en";
  });

  // Persists language changes and updates the HTML document language.
  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Makes the language state accessible to all wrapped components.
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for accessing the language context from any child component.
export function useLanguage() {
  const context = useContext(LanguageContext);

  // Prevents the hook from being used outside the LanguageProvider.
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
