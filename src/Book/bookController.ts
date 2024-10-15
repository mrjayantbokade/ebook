import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../util/asyncHandler";
import bookModel from "./bookModel";
import { ApiResponse } from "../util/ApiResponse";
import createHttpError from "http-errors";



const bookController = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {



        const { title, author, description, genre } = req.body;

        if (!title || !description ) {
            return next(createHttpError(400, "Tittle and description are required"))

        }

        
        const book = {
            "title": title, 
            "author": author,
            "description": description,
            "genre": genre
        }

        console.log(book)
        return res.status(200).json(
            new ApiResponse(
                201,
                book,
                "success"
            )
        )

    }
)

export { bookController }