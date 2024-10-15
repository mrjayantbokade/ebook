import path from "node:path";
import { Router } from "express";
import { bookController } from "./bookController";
import multer from "multer";



const bookRouter = Router();

const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: {
        fileSize: 1024 * 1024 * 10 //3e7 means 30MB
    }
})

bookRouter.post("/", upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), bookController)

export default bookRouter