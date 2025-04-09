"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { LanguageContext } from "../../../context/LanguageContext";

export default function CreateProjectPage() {
    const { language } = useContext(LanguageContext);
    const router = useRouter();
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        title_en: "",
        title_kk: "",
        description_en: "",
        description_kk: "",
        targetBudget: "",
        imageUrl: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        fetch("/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!(data.role === "institution" || data.role === "admin")) {
                    setError(
                        language === "en"
                            ? "Only institutions or admins can create projects."
                            : "Тек мекемелер немесе әкімшілер ғана жобаны құра алады."
                    );
                }
            })
            .catch((err) => {
                console.error(err);
                router.push("/login");
            });
    }, [router, language]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert(
                language === "en"
                    ? "You must be logged in to create a project."
                    : "Жоба құру үшін жүйеге кіру қажет."
            );
            return;
        }

        const res = await fetch("/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            const data = await res.json();
            alert(
                language === "en"
                    ? "Project created successfully!"
                    : "Жоба сәтті құрылды!"
            );
            router.push(`/projects/${data.id}`);
        } else {
            const errData = await res.json();
            alert(
                language === "en"
                    ? `Failed to create project: ${errData.error}`
                    : `Жоба құрылмады: ${errData.error}`
            );
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
                <Navbar />
                <div className="max-w-md mx-auto mt-12 pt-28 p-6 bg-white rounded-lg shadow-lg text-center">
                    <p className="text-red-600 font-bold">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center pt-28">
                <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        {language === "en" ? "Create New Project" : "Жаңа жоба құру"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title (English) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {language === "en" ? "Title (English)" : "Атауы (Ағылшынша)"}
                            </label>
                            <input
                                type="text"
                                value={form.title_en}
                                onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                required
                            />
                        </div>
                        {/* Title (Kazakh) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {language === "en" ? "Title (Kazakh)" : "Атауы (Қазақша)"}
                            </label>
                            <input
                                type="text"
                                value={form.title_kk}
                                onChange={(e) => setForm({ ...form, title_kk: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                required
                            />
                        </div>
                        {/* Description (English) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {language === "en" ? "Description (English)" : "Сипаттама (Ағылшынша)"}
                            </label>
                            <textarea
                                value={form.description_en}
                                onChange={(e) =>
                                    setForm({ ...form, description_en: e.target.value })
                                }
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                required
                            />
                        </div>
                        {/* Description (Kazakh) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {language === "en" ? "Description (Kazakh)" : "Сипаттама (Қазақша)"}
                            </label>
                            <textarea
                                value={form.description_kk}
                                onChange={(e) =>
                                    setForm({ ...form, description_kk: e.target.value })
                                }
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                required
                            />
                        </div>
                        {/* Target Budget */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {language === "en" ? "Target Budget" : "Керекті сома"}
                            </label>
                            <input
                                type="number"
                                value={form.targetBudget}
                                onChange={(e) =>
                                    setForm({ ...form, targetBudget: e.target.value })
                                }
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                required
                            />
                        </div>
                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {language === "en" ? "Image URL" : "Сурет URL"}
                            </label>
                            <input
                                type="text"
                                value={form.imageUrl}
                                onChange={(e) =>
                                    setForm({ ...form, imageUrl: e.target.value })
                                }
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 rounded transition"
                        >
                            {language === "en" ? "Create Project" : "Жобаны құру"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
