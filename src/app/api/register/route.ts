import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDb() {
  return open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });
}

export async function POST(req: NextRequest) {
  const { username, password, email, name } = await req.json();
  if (!username || !password || !email || !name) {
    return NextResponse.json({ message: "يرجى إدخال جميع الحقول" }, { status: 400 });
  }
  const db = await openDb();
  await db.exec(
    "CREATE TABLE IF NOT EXISTS usrs (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, email TEXT, name TEXT)"
  );
  try {
    await db.run(
      "INSERT INTO usrs (username, password, email, name) VALUES (?, ?, ?, ?)",
      username,
      password,
      email,
      name
    );
    return NextResponse.json({ message: "تم تسجيل المستخدم بنجاح!" });
  } catch (e: any) {
    if (e.code === "SQLITE_CONSTRAINT") {
      return NextResponse.json({ message: "اسم المستخدم مستخدم بالفعل" }, { status: 409 });
    }
    return NextResponse.json({ message: "حدث خطأ أثناء التسجيل" }, { status: 500 });
  }
}
