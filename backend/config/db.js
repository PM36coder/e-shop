import mongoose from "mongoose";

const connectDB = async()=>{
    const uri = process.env.MONGO_URI
    try {
        if(!uri) return console.log("uri is not added")
        await mongoose.connect(uri)
    } catch (error) {
        console.log("Mongo Error:", error.message);
    process.exit(1);
    }
}

export default connectDB