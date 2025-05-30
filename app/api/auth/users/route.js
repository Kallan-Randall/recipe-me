import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User"

export async function GET(req) {
    try {
        await connectToDatabase();
        const users = await User.find({}, "-password");
        return Response.json(users, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to fetch users" }, { status: 500});
    }
}