import mongoose from "mongoose";
import { User } from "./userTypes";




const userSchema = new mongoose.Schema<User>(
    {

        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)


// const User = mongoose.model("User", userSchema, "Author");   // in case you want to override the User to Author 
export default mongoose.model<User>("User", userSchema);

