import { users } from "../../../../lib/users";

export async function POST(req) {
    try { 
        const { email, password } = await req.json();

        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            return new Response(JSON.stringify({ message: "Invalid credintials" }), { status: 401});

        }

        return new Response(JSON.stringify({ message: "login successful" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error logging in" }), { status: 500});
    }
}