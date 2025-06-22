"use client";

import { useState } from "react";

const navItems = [
  { label: "الرئيسية", href: "/dashboard" },
  { label: "المستخدمون", href: "/dashboard/users" },
  { label: "الإعدادات", href: "/dashboard/settings" },
  { label: "تسجيل الخروج", href: "/login" },
];

export default function DashboardPage() {
  const [active, setActive] = useState("الرئيسية");

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
      <main className="flex-1 p-12 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-800 drop-shadow">مرحباً بك في لوحة التحكم</h1>
        <p className="text-xl text-blue-700 bg-white/80 rounded-lg px-6 py-4 shadow">اختر من القائمة الجانبية للبدء.</p>
      </main>
    </div>
  );
}
