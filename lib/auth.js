import { cookies } from 'next/headers';
import { jwtVerify } from "jose";
import User from '@/models/User';
import connectToDatabase from './mongodb';

export async function getUserFromRequest() {
    const cookieStore = await cookies(); // Await cookies to get the value
    const token = cookieStore.get('auth_token')?.value;
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
