"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { LanguageContext } from "../../context/LanguageContext";

export default function RegisterPage() {
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const texts =
    language === "en"
      ? {
        pageTitle: "Create Your Account",
        usernameLabel: "Username",
        emailLabel: "Email",
        roleLabel: "Role",
        donor: "Donor",
        institution: "Institution",
        passwordLabel: "Password",
        submitButton: "Register",
        successMessage: (username) => `Registered user: ${username}`,
        failMessage: (error) => `Registration failed: ${error}`,
      }
      : {
        pageTitle: "Аккаунт тіркеу",
        usernameLabel: "Логин",
        emailLabel: "Электрондық пошта",
        roleLabel: "Рөл",
        donor: "Демеуші",
        institution: "Мекеме",
        passwordLabel: "Құпиясөз",
        submitButton: "Тіркелу",
        successMessage: (username) => `Тіркелген пайдаланушы: ${username}`,
        failMessage: (error) => `Тіркелу сәтсіз аяқталды: ${error}`,
      };

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "donor",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      alert(texts.successMessage(data.username));
      router.push("/login");
    } else {
      const errorData = await res.json();
      alert(texts.failMessage(errorData.error));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            {texts.pageTitle}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {texts.usernameLabel}
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
                {texts.emailLabel}
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {texts.roleLabel}
              </label>
              <select
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="donor">{texts.donor}</option>
                <option value="institution">{texts.institution}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {texts.passwordLabel}
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
              {texts.submitButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
