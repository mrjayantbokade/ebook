import mongoose from "mongoose";
import { IAuthor } from "./authorTypes";
import { configuration } from "../config/config";
import jwt from "jsonwebtoken"




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
        token: {

            type: String,
        }
    },
    { timestamps: true }
)



// authorSchema.methods.generateAccessToken = function () {

//     const token = jwt.sign({


//         name: this.name,
//         email: this.email,


//     },
//         configuration.JWT_SERCRET as string
//         ,
//         {
//             expiresIn: "7d",
//             // algorithm:"HS256" not neccessary cause it uses by default hs256 
//         })
// }


// const User = mongoose.model("User", userSchema, "Author");   // in case you want to override the User to Author 
export default mongoose.model<IAuthor>("Author", authorSchema);

