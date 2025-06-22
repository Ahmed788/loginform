"use client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

const navItems = [
  { label: "الرئيسية", href: "/dashboard" },
  { label: "المستخدمون", href: "/dashboard/users" },
  { label: "الإعدادات", href: "/dashboard/settings" },
  { label: "تسجيل الخروج", href: "/login" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [active, setActive] = useState("المستخدمون");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch("/api/login");
    const data = await res.json();
    setUsers(data.users || []);
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, name }),
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
      setUsername(""); setPassword(""); setEmail(""); setName("");
      fetchUsers();
    }
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
        <h1 className="text-3xl font-bold mb-8 text-blue-800 text-center">المستخدمون</h1>
        <form onSubmit={handleAddUser} className="flex flex-wrap gap-4 mb-8 bg-white p-6 rounded-lg shadow">
          <input type="text" placeholder="اسم المستخدم" value={username} onChange={e => setUsername(e.target.value)} className="border p-2 rounded flex-1 min-w-[150px] placeholder:text-gray-700 text-gray-900" />
          <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 rounded flex-1 min-w-[150px] placeholder:text-gray-700 text-gray-900" />
          <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded flex-1 min-w-[180px] placeholder:text-gray-700 text-gray-900" />
          <input type="text" placeholder="الاسم الكامل" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded flex-1 min-w-[150px] placeholder:text-gray-700 text-gray-900" />
          <button type="submit" className="bg-blue-700 text-white rounded px-6 py-2 font-bold">إضافة</button>
        </form>
        {message && <div className="mb-6 text-center text-blue-700 font-semibold">{message}</div>}
        <table className="w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="py-2 px-4 text-gray-100">#</th>
              <th className="py-2 px-4 text-gray-100">اسم المستخدم</th>
              <th className="py-2 px-4 text-gray-100">البريد الإلكتروني</th>
              <th className="py-2 px-4 text-gray-100">الاسم الكامل</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="even:bg-blue-50">
                <td className="py-2 px-4 text-center text-gray-800">{idx + 1}</td>
                <td className="py-2 px-4 text-center text-gray-800">{user.username}</td>
                <td className="py-2 px-4 text-center text-gray-800">{user.email}</td>
                <td className="py-2 px-4 text-center text-gray-800">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
