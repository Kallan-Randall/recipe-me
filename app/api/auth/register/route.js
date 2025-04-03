import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User"
import bcrypt from "bcrypt";


export async function POST(req) {
    try{ 
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Misssing email or password"}), { status: 400});
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists" }), { status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201});
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {status: 500});
    }
}