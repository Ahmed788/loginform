"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      // حفظ اسم المستخدم في localStorage
      localStorage.setItem("username", username);
      router.push(`/dashboard?username=${encodeURIComponent(username)}`);
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 items-center justify-center" dir="rtl">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-blue-800 text-center">تسجيل الدخول</h1>
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
          <button type="submit" className="bg-blue-700 text-white rounded px-6 py-2 font-bold mt-2">دخول</button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">ليس لديك حساب؟ </span>
          <a href="/register" className="text-green-600 underline hover:text-green-800 font-semibold">سجل حساب جديد</a>
        </div>
        {message && <div className="mt-6 text-center text-blue-700 font-semibold">{message}</div>}
      </div>
    </div>
  );
}
