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
  const { username, oldPassword, newPassword } = await req.json();
  if (!username || !oldPassword || !newPassword) {
    return NextResponse.json({ message: "يرجى إدخال جميع الحقول" }, { status: 400 });
  }
  const db = await openDb();
  const user = await db.get(
    "SELECT * FROM usrs WHERE username = ? AND password = ?",
    username,
    oldPassword
  );
  if (!user) {
    return NextResponse.json({ message: "اسم المستخدم أو كلمة المرور الحالية غير صحيحة" }, { status: 401 });
  }
  await db.run(
    "UPDATE usrs SET password = ? WHERE username = ?",
    newPassword,
    username
  );
  return NextResponse.json({ message: "تم تغيير كلمة المرور بنجاح!" });
}
