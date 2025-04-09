"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { LanguageContext } from "../../context/LanguageContext";

export default function LoginPage() {
    const router = useRouter();
    const { language } = useContext(LanguageContext);
    const [form, setForm] = useState({ username: "", password: "" });

    const texts = {
        title: language === "en" ? "Login" : "Кіру",
        username: language === "en" ? "Username" : "Пайдаланушы аты",
        password: language === "en" ? "Password" : "Құпиясөз",
        loginButton: language === "en" ? "Login" : "Кіру",
        noAccount: language === "en" ? "Don't have an account?" : "Аккаунтыңыз жоқ па?",
        register: language === "en" ? "Register" : "Тіркелу",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);
            alert(
                language === "en"
                    ? `Logged in as ${data.user.username}`
                    : `Пайдаланушы кіру: ${data.user.username}`
            );
            router.push("/");
        } else {
            const errorData = await res.json();
            alert(
                language === "en"
                    ? `Login failed: ${errorData.error}`
                    : `Кіру сәтсіз: ${errorData.error}`
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                        {texts.title}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {texts.username}
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                value={form.username}
                                onChange={(e) =>
                                    setForm({ ...form, username: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {texts.password}
                            </label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 rounded transition"
                        >
                            {texts.loginButton}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        {texts.noAccount}{" "}
                        <span className="text-blue-600 hover:underline cursor-pointer">
                            <Link href="/register">{texts.register}</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
