import mongoose from "mongoose";
import { configuration } from "../config/config";



const dbConnect = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("Database is already connected.");
            return;
        }
        await mongoose.connect(`${configuration.MONGODB_URL}/${configuration.DB_NAME}`);

         
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully.");
        })

        mongoose.connection.on("error", (err) => {
            console.log(`Database connection error: ${err}`);
        })

    } catch (err) {

        console.log(`Database connect nhi hua: ${err}`)
        process.exit(1)

    }
}
export default dbConnect;