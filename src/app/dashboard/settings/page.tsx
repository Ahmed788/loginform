"use client";
import { useState, useEffect } from "react";

const navItems = [
  { label: "الرئيسية", href: "/dashboard" },
  { label: "المستخدمون", href: "/dashboard/users" },
  { label: "الإعدادات", href: "/dashboard/settings" },
  { label: "تسجيل الخروج", href: "/login" },
];

export default function SettingsPage() {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [active, setActive] = useState("الإعدادات");

  useEffect(() => {
    // جلب اسم المستخدم من localStorage أو أي طريقة تحقق أخرى
    const savedUser = localStorage.getItem("username");
    if (savedUser) setUsername(savedUser);
  }, []);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, oldPassword, newPassword }),
    });
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100" dir="rtl">
      {/* القائمة الجانبية */}
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-500 shadow-lg flex flex-col p-6 rounded-l-3xl text-white">
        <h2 className="text-2xl font-bold mb-10 text-center tracking-wide">لوحة التحكم</h2>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-5 py-3 rounded-lg transition-colors cursor-pointer font-medium text-right text-lg ${active === item.label ? "bg-white text-blue-700 shadow-md" : "hover:bg-blue-600 hover:text-white text-blue-100"}`}
              onClick={() => setActive(item.label)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      {/* محتوى الصفحة */}
      <main className="flex-1 p-10 flex flex-col items-center justify-start">
        <h1 className="text-3xl font-bold mb-8 text-blue-800 text-center">تغيير كلمة المرور</h1>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow w-full max-w-md">
          <input type="text" placeholder="اسم المستخدم" value={username} readOnly disabled className="border p-2 rounded placeholder:text-gray-700 text-gray-900 bg-gray-200 cursor-not-allowed" />
          <input type="password" placeholder="كلمة المرور الحالية" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="border p-2 rounded placeholder:text-gray-700 text-gray-900" />
          <input type="password" placeholder="كلمة المرور الجديدة" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="border p-2 rounded placeholder:text-gray-700 text-gray-900" />
          <button type="submit" className="bg-blue-700 text-white rounded px-6 py-2 font-bold">تغيير</button>
        </form>
        {message && <div className="mt-6 text-center text-blue-700 font-semibold">{message}</div>}
      </main>
    </div>
  );
}
