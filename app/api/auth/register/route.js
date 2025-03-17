import { users } from "../../lib/users";

export async function POST(req) {
    try{ 
        const { email, password } = await req.json();

        // Check if user is in database
        if (users.find(user => user.email === email)){
            return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
        }

        users.push({ email, password});

        return new Response(JSON.stringify({message: "User registered successfully" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({message: "Error registering user "}), { status: 500});
    }

    
}