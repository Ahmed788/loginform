import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// إعداد قاعدة البيانات وإنشاء الجدول إذا لم يكن موجودًا
async function openDb() {
  return open({
    filename: "./db.sqlite", // قاعدة بيانات حقيقية محفوظة في المشروع
    driver: sqlite3.Database,
  });
}

export async function POST(req: NextRequest) {
  const { username, password, email, name } = await req.json();
  const db = await openDb();
  await db.exec(
    "CREATE TABLE IF NOT EXISTS usrs (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, email TEXT, name TEXT)"
  );

  // إضافة المستخدم الافتراضي إذا لم يكن موجودًا
  await db.run(
    "INSERT OR IGNORE INTO usrs (username, password, email, name) VALUES (?, ?, ?, ?)",
    "ahmed",
    "pass1234",
    "ahmed@email.com",
    "أحمد"
  );

  // التحقق من بيانات الدخول
  const user = await db.get(
    "SELECT * FROM usrs WHERE username = ? AND password = ?",
    username,
    password
  );

  if (user) {
    return NextResponse.json({ message: "تم تسجيل الدخول بنجاح!" });
  } else {
    return NextResponse.json({ message: "بيانات الدخول غير صحيحة" }, { status: 401 });
  }
}

// استعلام يعرض جميع المستخدمين في الجدول usrs
export async function GET() {
  const db = await openDb();
  await db.exec(
    "CREATE TABLE IF NOT EXISTS usrs (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, email TEXT, name TEXT)"
  );
  // إضافة المستخدم الافتراضي إذا لم يكن موجودًا
  await db.run(
    "INSERT OR IGNORE INTO usrs (username, password, email, name) VALUES (?, ?, ?, ?)",
    "ahmed",
    "pass1234",
    "ahmed@email.com",
    "أحمد"
  );
  const users = await db.all("SELECT id, username, email, name FROM usrs");
  return NextResponse.json({ users });
}
