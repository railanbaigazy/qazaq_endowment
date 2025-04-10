"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "../../context/LanguageContext";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

export default function ProfilePage() {
  const { language } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        {user ? (
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              {language === "en" ? "Your Profile" : "Сіздің профиліңіз"}
            </h2>
            {/* Optional Profile Picture */}
            <div className="flex justify-center mb-6">
              <img
                src={user.avatar || "https://avatar.iran.liara.run/public/15"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
            </div>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong>{language === "en" ? "Username:" : "Пайдаланушы аты:"}</strong>{" "}
                {user.username}
              </p>
              <p className="text-gray-700">
                <strong>{language === "en" ? "Email:" : "Электрондық пошта:"}</strong>{" "}
                {user.email}
              </p>
              <p className="text-gray-700">
                <strong>{language === "en" ? "Role:" : "Рөл:"}</strong> {user.role}
              </p>
            </div>
            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Link href="/profile/edit">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 rounded transition">
                  {language === "en" ? "Edit Profile" : "Профильді өңдеу"}
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
              >
                {language === "en" ? "Logout" : "Шығу"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center mt-8 text-gray-600">
            {language === "en" ? "Loading profile..." : "Профиль жүктелуде..."}
          </p>
        )}
      </div>
    </div>
  );
}
