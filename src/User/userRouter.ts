import { Router } from "express";
import { registerUser } from "./userController";


const userRouter = Router();


userRouter.post("/register", registerUser)
export default userRouter;