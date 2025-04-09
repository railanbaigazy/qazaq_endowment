"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Home() {
  const { language } = useContext(LanguageContext);

  // Define the texts for each language
  const englishTexts = [
    "Making a difference in Kazakhstan, one project at a time.",
    "Empowering the future with innovation.",
    "Building sustainable communities.",
    "Advancing ideas for a better tomorrow."
  ];

  const kazakhTexts = [
    "Өзгеріс жасау біздің қолымызда.",
    "Жаңалыққа шабуыл.",
    "Болашаққа сенім.",
    "Тұрақты өркендеу."
  ];

  const texts = language === "en" ? englishTexts : kazakhTexts;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); 
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(false); 
      }, 500); 
    }, 3000);

    return () => clearInterval(interval);
  }, [texts]);

  const [featuredProjects, setFeaturedProjects] = useState([]);
  useEffect(() => {
    fetch("/api/projects/featured")
      .then((res) => res.json())
      .then((data) => setFeaturedProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, [language]);

  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            {language === "en" ? (
              <h1 className="text-6xl font-bold text-gray-800">
                Welcome to <br />
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Qazaq Endowment
                </span>
              </h1>
            ) : (
              <h1 className="text-6xl font-bold text-gray-800">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Qazaq Endowment
                </span>
                -ке
                <br />
                Қош Келдіңіз!
              </h1>
            )}
            <p
              className={`mt-4 text-xl text-gray-600 transition-opacity duration-500 ease-in-out ${fade ? "opacity-0" : "opacity-100"
                }`}
            >
              {texts[currentTextIndex]}
            </p>
            <Link href="/projects">
              <button className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-8 rounded-full transition transform hover:scale-105">
                {language === "en" ? "Explore Projects" : "Жобаларды қарау"}
              </button>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            {language === "en" ? (
              <>
                <h2 className="text-4xl font-bold text-gray-800 text-center">
                  About Qazaq Endowment
                </h2>
                <p className="mt-6 text-lg text-gray-600 text-center">
                  Qazaq Endowment is dedicated to empowering communities and fostering innovation throughout Kazakhstan. Our mission is to develop sustainable projects that make lasting impacts in various sectors.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-gray-800 text-center">
                  Qazaq Endowment туралы
                </h2>
                <p className="mt-6 text-lg text-gray-600 text-center">
                  Qazaq Endowment Қазақстанда қоғамды қолдау және инновацияны дамытуға бағытталған. Біздің миссиямыз – әртүрлі салалардағы тұрақты жобаларды жүзеге асыру арқылы ұмтылған елдің болашағына үлес қосу.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            {language === "en" ? (
              <>
                <h2 className="text-4xl font-bold text-gray-800 text-center">
                  Featured Projects
                </h2>
                <p className="mt-4 text-lg text-gray-600 text-center">
                  Discover our top projects making the biggest impact.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-gray-800 text-center">
                  Таңдаулы Жобалар
                </h2>
                <p className="mt-4 text-lg text-gray-600 text-center">
                  Қазіргі уақытта ең әсерлі жобаларымызбен танысыңыз.
                </p>
              </>
            )}
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <img
                    src={
                      project.imageUrl ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={language === "en" ? project.title_en : project.title_kk}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {language === "en" ? project.title_en : project.title_kk}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {(language === "en"
                        ? project.description_en
                        : project.description_kk
                      ).slice(0, 100)}...
                    </p>
                    <div className="mt-4 flex justify-between">
                      <span className="text-sm text-gray-600">
                        {language === "en"
                          ? `$${project.targetBudget}`
                          : `₸${project.targetBudget}`}
                      </span>
                      <span className="text-sm text-gray-600">
                        {language === "en"
                          ? `$${project.collectedBudget}`
                          : `₸${project.collectedBudget}`}
                      </span>
                    </div>
                    <Link href={`/projects/${project.id}`} legacyBehavior>
                      <a className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-semibold">
                        {language === "en" ? "Learn More" : "Толығырақ"}
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call To Action Section */}
        <section className="py-16 bg-indigo-600">
          <div className="max-w-4xl mx-auto text-center">
            {language === "en" ? (
              <>
                <h2 className="text-4xl font-bold text-white">
                  Ready to Make a Change?
                </h2>
                <p className="mt-4 text-lg text-indigo-200">
                  Join us and be a part of a movement towards sustainable progress in Kazakhstan.
                </p>

                <Link href="/get-involved" legacyBehavior>
                  <button className="mt-6 bg-white text-indigo-600 font-semibold py-2 px-8 rounded-full transition transform hover:scale-105">
                    Get Involved
                  </button>
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-white">
                  Өзгеріс жасауға дайынсыз ба?
                </h2>
                <p className="mt-4 text-lg text-indigo-200">
                  Қазақстандағы тұрақты дамуға өз үлесіңізді қосыңыз және қозғалыстың бір бөлігі болыңыз.
                </p>
                <Link href="/register" legacyBehavior>
                  <button className="mt-6 bg-white text-indigo-600 font-semibold py-2 px-8 rounded-full transition transform hover:scale-105">
                    Қатысыңыз
                  </button>
                </Link>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
