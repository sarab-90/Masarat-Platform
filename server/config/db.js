import mongoose from "mongoose";
// connected between server & DB
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }
}
export default connectDB