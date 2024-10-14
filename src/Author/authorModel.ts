import mongoose from "mongoose";
import { IAuthor } from "./authorTypes";




const authorSchema = new mongoose.Schema<IAuthor>(
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
export default mongoose.model<IAuthor>("Author", authorSchema);

