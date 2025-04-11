"use client";

import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function ProjectsList({ projects }) {
    const { language } = useContext(LanguageContext);

    if (!Array.isArray(projects) || projects.length === 0) {
        return (
            <div className="text-center text-red-600">
                {language === "en"
                    ? "No projects available at the moment."
                    : "Қазіргі уақытта жобалар жоқ."}
            </div>
        );
    }

    return (
        <>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 md:mb-8 mb-4">
                {language === "en" ? "Projects" : "Жобалар"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform duration-300 hover:scale-105 hover:shadow-xl">
                            <img
                                src={
                                    project.imageUrl ||
                                    "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1"
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
