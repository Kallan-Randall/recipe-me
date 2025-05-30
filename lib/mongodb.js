import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MongoDB URI is missing.")
}

let cached = global.mongoose || { conn: null, promise: null}

export default async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => {
            
            console.log("MongoDB Connected!");
            return mongoose
        
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}