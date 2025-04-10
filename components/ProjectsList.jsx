"use client";

import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function ProjectsList({ projects }) {
    const { language } = useContext(LanguageContext);

    return (
        <>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
                {language === "en" ? "Projects" : "Жобалар"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform duration-300 hover:scale-105 hover:shadow-xl">
                            <img
                                src={
                                    project.imageUrl ||
                                    "https://via.placeholder.com/400x300?text=No+Image"
                                }
                                alt={
                                    language === "en" ? project.title_en : project.title_kk
                                }
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {language === "en" ? project.title_en : project.title_kk}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {(language === "en"
                                        ? project.description_en
                                        : project.description_kk
                                    ).slice(0, 100)}
                                    ...
                                </p>
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="text-sm text-gray-600">
                                        {language === "en" ? "By: " : "Ұйым: "}
                                        {project.creator && project.creator.username
                                            ? project.creator.username
                                            : "N/A"}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        ₸{project.targetBudget}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
