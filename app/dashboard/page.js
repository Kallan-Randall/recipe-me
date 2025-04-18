"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(()  => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/check", {credentials: "include" });
        if (!res.ok) throw new Error("Not authenticated");
        
        setLoading(false);
      } catch (error) {
        router.push("/login")
      }
    }

    checkAuth();
  }, []);

  if (loading) return <p>loading....</p>;

  return <h1>Welcome to the Dashboard!</h1>
}