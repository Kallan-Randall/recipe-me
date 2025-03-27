"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        setMessage(data.message);
        if (res.status === 201) {
            router.push("/login");
        }
    };

    return (
       <div>
         <h1>Register</h1>
         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
         <input type="password" placeholder="Pasword" value={password} onChange={e => setPassword(e.target.value)} />
         <button onClick={handleRegister}>Register</button>
         {message && <p>{message}</p>}
       </div>
    )
}