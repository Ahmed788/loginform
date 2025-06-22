"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, name }),
    });
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 items-center justify-center" dir="rtl">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-blue-800 text-center">تسجيل مستخدم جديد</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border p-2 rounded placeholder:text-gray-700 text-gray-900 bg-gray-50"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded placeholder:text-gray-700 text-gray-900 bg-gray-50"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 rounded placeholder:text-gray-700 text-gray-900 bg-gray-50"
          />
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 rounded placeholder:text-gray-700 text-gray-900 bg-gray-50"
          />
          <button type="submit" className="bg-green-600 text-white rounded px-6 py-2 font-bold mt-2">تسجيل</button>
        </form>
        {message && <div className="mt-6 text-center text-green-700 font-semibold">{message}</div>}
      </div>
    </div>
  );
}
