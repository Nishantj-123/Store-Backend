import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config ()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MONGODB connectDB")
    } catch (err) {
        console.error("MONGODB Error:", err.message); // or just err for full stack

        process. exit1
    }
}

export default connectDB;