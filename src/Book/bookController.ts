import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../util/asyncHandler";
import bookModel from "./bookModel";
import { ApiResponse } from "../util/ApiResponse";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import { AuthRequest } from "../Middlewares/Authenticate";



const bookController = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

       
        


        const { tittle, description, genre } = req.body;



     
        // this is must if you are using typescript
        const files = req.files as { [fileame: string]: Express.Multer.File[] }

        const coverImageMimeType = files.coverImage[0].mimetype.split("/")[-1]
        const coverImageName = files.coverImage[0].filename
        const coverImagePath = path.resolve(__dirname, "../../public/data/uploads", coverImageName)

        const coverUploadResult = cloudinary.uploader.upload(coverImagePath, {
            folder: "book-covers",
            format: coverImageMimeType,

        })

        const bookFileName = files.file[0].filename
        const bookFilePath = path.resolve(__dirname, "../../public/data/uploads", bookFileName)

        const bookUploadResult = cloudinary.uploader.upload(bookFilePath, {
            resource_type: "raw",
            folder: "book-pdf",
            format: "pdf",
            filename_override: bookFileName,
        })



        const _req = req as AuthRequest;
        const createdBookResult = await bookModel.create({
            tittle,
            author:_req.userId,
            description,
            genre,
            coverImage: (await coverUploadResult).url,
            file: (await bookUploadResult).url
        })


        if(!createdBookResult){
            return next(createHttpError(400, "Error occured while creating or saving book query mongoDB saving"))
        }


        return res.status(201).json(
            new ApiResponse(
                201,
                createdBookResult,
                "Book created successfully"
            )
        )

    }
)

export { bookController }