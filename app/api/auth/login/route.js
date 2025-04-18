import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"

export async function POST(req) {
    try {
        await connectToDatabase();

        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return Response.json({ error: "invalid email or password" }, {status: 401});
        }

        const token =  jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const cookieStore = cookies();
        (await cookieStore).set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        return Response.json({ message: "Login successful" }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return Response.json({ error: "Something went wrong" }, { status: 500});
    }
}