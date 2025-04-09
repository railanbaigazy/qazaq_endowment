"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { LanguageContext } from "../../../context/LanguageContext";

export default function ProjectDetailPage() {
    const { language } = useContext(LanguageContext);
    const params = useParams();
    const projectId = params.id;

    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [donationAmount, setDonationAmount] = useState("");
    const [transparencyForm, setTransparencyForm] = useState({
        comment_en: "",
        comment_kk: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (projectId) {
            fetch(`/api/projects/${projectId}`)
                .then((res) => res.json())
                .then((data) => setProject(data))
                .catch((err) => {
                    console.error("Error fetching project details:", err);
                    setError(
                        language === "en"
                            ? "Error fetching project details."
                            : "Жоба мәліметтерін жүктеу кезінде қате орын алды."
                    );
                });
        }
    }, [projectId, language]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("/api/users/profile", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => setCurrentUser(data))
                .catch((err) => console.error("Error fetching current user:", err));
        }
    }, []);

    const isCreator = currentUser && project && project.creatorId === currentUser.id;
    const isDonor = currentUser && currentUser.role === "donor";

    const progress = project && project.targetBudget > 0
        ? Math.min((project.collectedBudget / project.targetBudget) * 100, 100)
        : 0;

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;
        const updatedData = {
            title_en: project.title_en,
            title_kk: project.title_kk,
            description_en: project.description_en,
            description_kk: project.description_kk,
            targetBudget: parseFloat(project.targetBudget),
            imageUrl: project.imageUrl,
        };
        try {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });
            if (res.ok) {
                const updatedProject = await res.json();
                setProject(updatedProject);
                alert(
                    language === "en"
                        ? "Project updated successfully."
                        : "Жоба сәтті жаңартылды."
                );
            } else {
                const errData = await res.json();
                alert(
                    language === "en"
                        ? `Update failed: ${errData.error}`
                        : `Жаңарту сәтсіз: ${errData.error}`
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDonate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert(
                language === "en"
                    ? "You must be logged in to donate."
                    : "Демеу жасау үшін жүйеге кіру қажет."
            );
            return;
        }
        const res = await fetch("/api/donations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                projectId: projectId,
                amount: parseFloat(donationAmount),
            }),
        });
        if (res.ok) {
            alert(
                language === "en"
                    ? "Donation successful!"
                    : "Демеу сәтті жасалды!"
            );
            setDonationAmount("");

            const resProject = await fetch(`/api/projects/${projectId}`);
            const updatedProject = await resProject.json();
            setProject(updatedProject);
        } else {
            const errData = await res.json();
            alert(
                language === "en"
                    ? `Donation failed: ${errData.error}`
                    : `Демеу сәтсіз: ${errData.error}`
            );
        }
    };

    const handleAddTransparencyComment = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const res = await fetch(`/api/projects/${projectId}/transparency`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(transparencyForm),
            });
            if (res.ok) {
                alert(
                    language === "en"
                        ? "News added."
                        : "Жаңалық жазылды."
                );
                setTransparencyForm({
                    comment_en: "",
                    comment_kk: "",
                    imageUrl: "",
                });

                const resProject = await fetch(`/api/projects/${projectId}`);
                const updatedProject = await resProject.json();
                setProject(updatedProject);
            } else {
                const errData = await res.json();
                alert(
                    language === "en"
                        ? `Failed to add news: ${errData.error}`
                        : `Жаңалық қосылмады: ${errData.error}`
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto mt-8 pt-28 text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto mt-8 pt-28 text-center">
                    <p className="text-gray-600">
                        {language === "en"
                            ? "Loading project details..."
                            : "Жоба мәліметтері жүктелуде..."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center pt-28">
                <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-md">
                    {/* Project Image */}
                    <img
                        src={
                            project.imageUrl ||
                            "https://via.placeholder.com/800x400?text=No+Image"
                        }
                        alt={language === "en" ? project.title_en : project.title_kk}
                        className="w-full h-64 object-cover rounded mb-6"
                    />

                    {/* Project Title */}
                    <h1 className="text-3xl font-bold text-gray-800">
                        {language === "en" ? project.title_en : project.title_kk}
                    </h1>

                    {/* Creation Date */}
                    <p className="text-sm text-gray-500 mt-2">
                        {language === "en" ? "Created on:" : "Құрылған күні:"}{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                    </p>

                    {/* Project Description */}
                    <p className="mt-4 text-gray-700">
                        {language === "en" ? project.description_en : project.description_kk}
                    </p>

                    {/* Budget Progress Bar */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-800">
                                {language === "en"
                                    ? `Collected: ₸${project.collectedBudget}`
                                    : `Жиналған сома: ₸${project.collectedBudget}`}
                            </span>
                            <span className="text-sm text-gray-800">
                                {language === "en"
                                    ? `Target: ₸${project.targetBudget}`
                                    : `Мақсат: ₸${project.targetBudget}`}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-4 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Creator / Institution Name */}
                    {project.creator && (
                        <p className="mt-2 text-gray-600">
                            {language === "en"
                                ? "Posted by: " + project.creator.username
                                : "Жобаны құрған: " + project.creator.username}
                        </p>
                    )}

                    {/* Transparency Comments (Visible to everyone) */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {language === "en" ? "News" : "Жаңалықтар"}
                        </h2>
                        {project.transparencyComments && project.transparencyComments.length > 0 ? (
                            <ul className="space-y-4">
                                {project.transparencyComments.map((comment) => (
                                    <li key={comment.id} className="p-3 border border-gray-200 rounded">
                                        <p className="text-gray-700">
                                            {language === "en" ? comment.comment_en : comment.comment_kk}
                                        </p>
                                        {comment.imageUrl && (
                                            <img
                                                src={comment.imageUrl}
                                                alt="Comment image"
                                                className="w-full h-40 object-cover mt-2 rounded"
                                            />
                                        )}
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">
                                {language === "en"
                                    ? "No news yet."
                                    : "Әзірге жаңалық жоқ."}
                            </p>
                        )}
                    </div>

                    {/* Conditional Section for Creator to Edit Project Details and Add Transparency Comments */}
                    {isCreator && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {language === "en" ? "Edit Project Details" : "Жобаны жаңарту"}
                            </h2>
                            <form onSubmit={handleUpdateProject} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {language === "en" ? "Title (English)" : "Атауы (Ағылшынша)"}
                                    </label>
                                    <input
                                        type="text"
                                        value={project.title_en}
                                        onChange={(e) =>
                                            setProject({ ...project, title_en: e.target.value })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {language === "en" ? "Title (Kazakh)" : "Атауы (Қазақша)"}
                                    </label>
                                    <input
                                        type="text"
                                        value={project.title_kk}
                                        onChange={(e) =>
                                            setProject({ ...project, title_kk: e.target.value })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {language === "en" ? "Description (English)" : "Сипаттама (Ағылшынша)"}
                                    </label>
                                    <textarea
                                        value={project.description_en}
                                        onChange={(e) =>
                                            setProject({ ...project, description_en: e.target.value })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {language === "en" ? "Description (Kazakh)" : "Сипаттама (Қазақша)"}
                                    </label>
                                    <textarea
                                        value={project.description_kk}
                                        onChange={(e) =>
                                            setProject({ ...project, description_kk: e.target.value })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {language === "en" ? "Target Budget" : "Мақсатты бюджет"}
                                    </label>
                                    <input
                                        type="number"
                                        value={project.targetBudget}
                                        onChange={(e) =>
                                            setProject({ ...project, targetBudget: e.target.value })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {language === "en" ? "Image URL" : "Сурет URL"}
                                    </label>
                                    <input
                                        type="text"
                                        value={project.imageUrl}
                                        onChange={(e) =>
                                            setProject({ ...project, imageUrl: e.target.value })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="max-w-md w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                                    >
                                        {language === "en" ? "Update Project" : "Жобаны жаңарту"}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    {language === "en" ? "Add News" : "Жаңалық жазу"}
                                </h2>
                                <form onSubmit={handleAddTransparencyComment} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {language === "en" ? "News (English)" : "Жаңалық (Ағылшынша)"}
                                        </label>
                                        <textarea
                                            value={transparencyForm.comment_en}
                                            onChange={(e) =>
                                                setTransparencyForm({
                                                    ...transparencyForm,
                                                    comment_en: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {language === "en" ? "News (Kazakh)" : "Жаңалық (Қазақша)"}
                                        </label>
                                        <textarea
                                            value={transparencyForm.comment_kk}
                                            onChange={(e) =>
                                                setTransparencyForm({
                                                    ...transparencyForm,
                                                    comment_kk: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {language === "en" ? "Image URL (optional)" : "Сурет URL (міндетті емес)"}
                                        </label>
                                        <input
                                            type="text"
                                            value={transparencyForm.imageUrl}
                                            onChange={(e) =>
                                                setTransparencyForm({
                                                    ...transparencyForm,
                                                    imageUrl: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="max-w-md w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 rounded transition"
                                        >
                                            {language === "en" ? "Add News" : "Жаңалық жазу"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Donation Form for Donor Users (Only if not the creator) */}
                    {isDonor && !isCreator && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {language === "en" ? "Donate to this Project" : "Жобаға демеу жасау"}
                            </h2>
                            <form onSubmit={handleDonate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {language === "en" ? "Donation Amount" : "Демеу сомасы"}
                                    </label>
                                    <input
                                        type="number"
                                        value={donationAmount}
                                        onChange={(e) => setDonationAmount(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="max-w-md w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 rounded transition"
                                    >
                                        {language === "en" ? "Donate" : "Демеу жасау"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
