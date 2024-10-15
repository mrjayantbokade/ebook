import mongoose, { Schema } from "mongoose";
import { IBook } from "./bookTypes";


const bookSchema = new mongoose.Schema<IBook>(
    {
        tittle: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
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
