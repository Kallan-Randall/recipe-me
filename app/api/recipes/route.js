import { NextResponse } from "next/server";
import connectToDatabase from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
    try {
        await connectToDatabase();

        const user = await getUserFromRequest();
        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, ingredients, instructions } = body;

        const recipe = new Recipe({
            title, 
            ingredients,
            instructions,
            createdBy: user._id,
        });

        await recipe.save();

        return NextResponse.json({ message: "Recipe added successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Recipe POST error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500});
    }
}