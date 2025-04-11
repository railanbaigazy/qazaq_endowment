"use client";

import { LanguageContext } from "@/context/LanguageContext";
import { useState, useEffect, useContext } from "react";

export default function NotificationsPage() {
  const { language } = useContext(LanguageContext);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchNotifications();
      } else {
        const errData = await res.json();
        alert("Failed to update: " + errData.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto mt-8 space-y-4 md:pt-28 pt-22 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {language === "en" 
            ? "Notifications" 
            : "Хабарламалар"}
          </h2>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 bg-white rounded-lg shadow-md cursor-pointer transition hover:bg-gray-100 ${
              !notif.read ? "border-l-4 border-blue-600" : ""
            }`}
            onClick={() => markAsRead(notif.id)}
          >
            <p className="text-gray-700">{notif.message}</p>
            <p className="text-sm text-gray-500 mt-1">
              <strong>Status:</strong> {notif.read ? "Read" : "Unread"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
