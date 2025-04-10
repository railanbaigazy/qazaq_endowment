"use client";

import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { LanguageContext } from "../../context/LanguageContext";

export default function AboutUsPage() {
    const { language } = useContext(LanguageContext);

    const texts =
        language === "en"
            ? {
                heading: "About Qazaq Endowment",
                paragraph:
                    "Qazaq Endowment is dedicated to empowering communities and fostering innovation throughout Kazakhstan. Our mission is to develop sustainable projects that make lasting impacts in various sectors. We believe that by supporting innovative ideas and sustainable development, we can make a true difference in the lives of people.",
            }
            : {
                heading: "Qazaq Endowment туралы",
                paragraph:
                    "Qazaq Endowment Қазақстанда қоғамды қолдау және инновацияны дамытуға бағытталған. Біздің миссиямыз – әртүрлі салаларда ұзақ мерзімді әсер ететін тұрақты жобаларды жүзеге асыру. Инновациялық идеяларды және тұрақты дамуды қолдау арқылы біз адамдардың өміріне шын мәнінде әсер ете аламыз деп сенеміз.",
            };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-4xl mx-auto py-16 pt-28 px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800">
                    {texts.heading}
                </h1>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed text-justify">
                    {texts.paragraph}
                </p>
            </main>
        </div>
    );
}
