import mongoose, { Schema } from "mongoose";
import { IBook } from "./bookTypes";


const bookSchema = new mongoose.Schema<IBook>(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Author",
            required: true,
        },
        file: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
        },
        description: {
            type: String,
        },
        genre: {
            type: String,
            

        }
    },
    { timestamps: true }

)

export default mongoose.model<IBook>("Book", bookSchema);
