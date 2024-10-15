import { Router } from "express";
import { bookController } from "./bookController";



const bookRouter = Router();


bookRouter.post("/", bookController)

export default bookRouter