"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { LanguageContext } from "../context/LanguageContext";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faPlus,
    faBell,
    faListCheck,
    faCircleDollarToSlot,
    faBars,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const { language, toggleLanguage } = useContext(LanguageContext);
    const { user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const texts = {
        projects: language === "en" ? "Projects" : "Жобалар",
        addProject: language === "en" ? "Project" : "Жоба",
        donate: language === "en" ? "Donate" : "Демеу",
        notifications: language === "en" ? "Notifications" : "Хабарламалар",
        about: language === "en" ? "About us" : "Біз туралы",
        login: language === "en" ? "Login" : "Кіру",
        register: language === "en" ? "Register" : "Тіркелу",
    };

    // Close the mobile menu when a link is clicked
    const handleLinkClick = () => setIsMenuOpen(false);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50
                       mx-4 mt-4 mb-6
                     bg-white p-4 border border-gray-200
                       shadow-md rounded-xl
                     text-gray-800"
        >
            {/* Main Navbar Content */}
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link href="/" onClick={handleLinkClick}>
                        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            Qazaq Endowment
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                    <span className="inline-block text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                        <Link href="/projects">
                            <FontAwesomeIcon icon={faListCheck} size="14" /> {texts.projects}
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

                {/* Desktop User/Language */}
                <div className="hidden md:flex items-center space-x-4">
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

                {/* Mobile Hamburger Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="text-gray-600 focus:outline-none"
                    >
                        <FontAwesomeIcon
                            icon={isMenuOpen ? faTimes : faBars}
                            size="lg"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Positioned within the navbar so it drops down) */}
            <div
                className={`md:hidden absolute left-0 right-0 mt-5 bg-white border border-gray-200 shadow-md rounded-xl origin-top overflow-hidden transition-transform duration-300 transform ${isMenuOpen ? " scale-y-100 opacity-100" : " scale-y-0 opacity-0"
                    }`}
            >
                <div className="pt-6 pb-6 pl-8 flex flex-col space-y-4 text-gray-800 text-xl">
                    <span className="block transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                        <Link href="/projects" onClick={handleLinkClick}>
                            <FontAwesomeIcon icon={faListCheck} size="14" /> {texts.projects}
                        </Link>
                    </span>
                    {user && (user.role === "institution" || user.role === "admin") && (
                        <span className="block transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                            <Link href="/projects/create" onClick={handleLinkClick}>
                                <FontAwesomeIcon icon={faPlus} /> {texts.addProject}
                            </Link>
                        </span>
                    )}
                    {user && user.role === "donor" && (
                        <span className="block transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                            <Link href="/donations" onClick={handleLinkClick}>
                                <FontAwesomeIcon icon={faCircleDollarToSlot} /> {texts.donate}
                            </Link>
                        </span>
                    )}
                    <span className="block transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                        <Link href="/about" onClick={handleLinkClick}>
                            {texts.about}
                        </Link>
                    </span>

                    {user ? (
                        <>
                            <span className="block transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                                <Link href="/notifications" onClick={handleLinkClick}>
                                    <FontAwesomeIcon icon={faBell} className="inline-block" /> {texts.notifications}
                                </Link>
                            </span>
                            <span className="block transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                                <Link href="/profile" onClick={handleLinkClick}>
                                    <FontAwesomeIcon icon={faUser} className="inline-block" /> Profile
                                </Link>
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="block transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                                <Link href="/login" onClick={handleLinkClick}>
                                    {texts.login}
                                </Link>
                            </span>
                            <span className="block transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">
                                <Link href="/register" onClick={handleLinkClick}>
                                    {texts.register}
                                </Link>
                            </span>
                        </>
                    )}
                    {/* Mobile Language Select */}
                    <div className="mt-2">
                        <select
                            value={language}
                            onChange={(e) => {
                                toggleLanguage(e.target.value);
                                setIsMenuOpen(false);
                            }}
                            className="bg-blue text-black py-1 px-2 rounded border border-indigo-500"
                        >
                            <option value="en">🇬🇧</option>
                            <option value="kk">🇰🇿</option>
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    );
}
