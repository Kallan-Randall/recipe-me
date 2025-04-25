import { jwtVerify } from "jose";

export async function getUserFromRequest(request) {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        return payload;
    } catch (err) {
        return null;
    }
}