"use client";

import React, { createContext, useState, useEffect } from "react";

// Create a context with default value "en"
export const LanguageContext = createContext({
    language: "en",
    toggleLanguage: () => { },
});

export function LanguageProvider({ children }) {
    // Initialize the language state; use an initializer that attempts to read
    // from localStorage—this runs only on the client side.
    const [language, setLanguage] = useState("en");

    // On first render, check if a language was previously set in localStorage.
    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    // Whenever the language changes, store it in localStorage.
    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    // Function to change the language
    const toggleLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
