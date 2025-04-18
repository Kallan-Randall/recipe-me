import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; 

export async function GET(req) {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401});
    }

    try{
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        return new Response(JSON.stringify({ message: "Authenticated" }), { status: 200 });
    } catch (error) {
        console.error("JWT verification failed:", error);
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401});
    }
    
}

export const config = {
    matcher: ["/dashboard/:path*"],
};