"use client";

import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faBell, faListCheck, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const { language, toggleLanguage } = useContext(LanguageContext);
    const { user } = useContext(AuthContext);

    const texts = {
        projects: language === "en" ? "Projects" : "Жобалар",
        addProject: language === "en" ? "Project" : "Жоба",
        donate: language === "en" ? "Donate" : "Демеу",
        notifications: language === "en" ? "Notifications" : "Хабарламалар",
        about: language === "en" ? "About us" : "Біз туралы",
        login: language === "en" ? "Login" : "Кіру",
        register: language === "en" ? "Register" : "Тіркелу",
    };

    return (
        <nav
            className="
        fixed top-0 left-0 right-0 z-50 
        mx-4 mt-4 mb-6
        flex items-center justify-between 
        bg-white p-4 border border-gray-200 
        shadow-md rounded-xl
        text-gray-800
      "
        >
            <div className="text-2xl font-bold">
                <Link href="/">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                        Qazaq Endowment
                    </span>
                </Link>
            </div>
            <div className="flex space-x-6">
                <span className="inline-block text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                    <Link href="/projects">
                        <FontAwesomeIcon icon={faListCheck} size={14} /> {texts.projects}
                    </Link>
                </span>

                {user && (user.role === "institution" || user.role === "admin") && (
                    <span className="inline-block text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                        <Link href="/projects/create">
                            <FontAwesomeIcon icon={faPlus} /> {texts.addProject}
                        </Link>
                    </span>
                )}

                {user && user.role === "donor" && (
                    <span className="inline-block text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                        <Link href="/donations">
                            <FontAwesomeIcon icon={faCircleDollarToSlot} /> {texts.donate}
                        </Link>
                    </span>
                )}
                <span className="inline-block text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                    <Link href="/about">{texts.about}</Link>
                </span>
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <Link href="/notifications">
                            <FontAwesomeIcon
                                icon={faBell}
                                className="inline-block text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </Link>
                        <Link href="/profile">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="inline-block text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="inline-block text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                            <Link href="/login">{texts.login}</Link>
                        </span>
                        <span className="inline-block text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                            <Link href="/register">{texts.register}</Link>
                        </span>
                    </>
                )}
                <div>
                    <select
                        value={language}
                        onChange={(e) => toggleLanguage(e.target.value)}
                        className="bg-blue text-black py-1 px-2 rounded border border-indigo-500"
                    >
                        <option value="en">🇬🇧</option>
                        <option value="kk">🇰🇿</option>
                    </select>
                </div>
            </div>
        </nav>
    );
}
