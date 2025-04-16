"use client";

import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "@/context/LanguageContext";

export default function DonationsPage() {
  const { language } = useContext(LanguageContext);

  const texts =
    language === "en"
      ? {
        pageTitle: "Make a Donation",
        projectIdLabel: "Project ID",
        amountLabel: "Amount",
        submitButton: "Donate",
        loginMessage: "You must be logged in to donate.",
        successMessage: "Donation successful!",
        failMessage: (error) => `Donation failed: ${error}`,
        yourDonationsTitle: "Your Donations",
        idLabel: "ID",
        projectIdColumn: "Project ID",
        amountColumn: "Amount",
        statusColumn: "Status",
      }
      : {
        pageTitle: "Демеуге үлес қосу",
        projectIdLabel: "Жоба идентификаторы",
        amountLabel: "Сома",
        submitButton: "Демеу",
        loginMessage: "Демеу жасау үшін жүйеге кіру қажет.",
        successMessage: "Демеу сәтті өтті!",
        failMessage: (error) => `Демеу сәтсіз аяқталды: ${error}`,
        yourDonationsTitle: "Сіздің демеулеріңіз",
        idLabel: "ID",
        projectIdColumn: "Жоба идентификаторы",
        amountColumn: "Сома",
        statusColumn: "Күйі",
      };

  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({ projectId: "", amount: "" });

  const fetchDonations = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("/api/donations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert(texts.loginMessage);
      return;
    }
    const res = await fetch("/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert(texts.successMessage);
      setForm({ projectId: "", amount: "" });
      fetchDonations();
    } else {
      const errData = await res.json();
      alert(texts.failMessage(errData.error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto space-y-8 md:pt-28 pt-24 px-4">
        {/* Donation Form */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {texts.pageTitle}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {texts.projectIdLabel}
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.projectId}
                onChange={(e) =>
                  setForm({ ...form, projectId: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {texts.amountLabel}
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
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

        {/* Donations List */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {texts.yourDonationsTitle}
          </h3>
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="p-4 mb-4 bg-white rounded-lg shadow-md"
            >
              <p className="text-gray-700">
                <strong>{texts.idLabel}:</strong> {donation.id}
              </p>
              <p className="text-gray-700">
                <strong>{texts.projectIdColumn}:</strong> {donation.projectId}
              </p>
              <p className="text-gray-700">
                <strong>{texts.amountColumn}:</strong> {donation.amount}
              </p>
              <p className="text-gray-700">
                <strong>{texts.statusColumn}:</strong> {donation.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
