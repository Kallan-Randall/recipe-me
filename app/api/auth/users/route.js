import { users } from "../../lib/users"

export async function GET() {
    return new Response(JSON.stringify(users), { status: 200})
}