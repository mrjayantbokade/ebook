import { Router } from "express";
import  {userLogin, authorRegister}  from "./authorController";
const userRouter = Router();

userRouter.post("/register", authorRegister);
userRouter.post("/login", userLogin);
export default userRouter;