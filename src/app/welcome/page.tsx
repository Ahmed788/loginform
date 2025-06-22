"use client";

import { useSearchParams } from "next/navigation";

export default function WelcomePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">مرحباً</h1>
      <p className="text-xl">{username ? username : "!"}</p>
    </div>
  );
}
