"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function DonationsPage() {
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
      alert("You must be logged in to donate.");
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
      alert("Donation successful!");
      setForm({ projectId: "", amount: "" });
      fetchDonations();
    } else {
      const errData = await res.json();
      alert("Donation failed: " + errData.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto mt-8 space-y-8 pt-28 px-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Make a Donation</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project ID
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
                Amount
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
              Donate
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Donations</h3>
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="p-4 mb-4 bg-white rounded-lg shadow-md"
            >
              <p className="text-gray-700">
                <strong>ID:</strong> {donation.id}
              </p>
              <p className="text-gray-700">
                <strong>Project ID:</strong> {donation.projectId}
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong> {donation.amount}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {donation.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
