import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  isArabic: boolean;
  toggleLanguage: () => void;
  setLanguage: (isArabic: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize from localStorage or default to false (English)
  const [isArabic, setIsArabic] = useState<boolean>(() => {
    const savedLanguage = localStorage.getItem('takamul-language');
    return savedLanguage === 'ar';
  });

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('takamul-language', isArabic ? 'ar' : 'en');
    // Update document direction
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
  }, [isArabic]);

  const toggleLanguage = () => {
    setIsArabic(prev => !prev);
  };

  const setLanguage = (newIsArabic: boolean) => {
    setIsArabic(newIsArabic);
  };

  const value: LanguageContextType = {
    isArabic,
    toggleLanguage,
    setLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 