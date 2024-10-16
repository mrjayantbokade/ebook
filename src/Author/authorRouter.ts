import { Router } from "express";
import  {authorLogout, authorLogin, authorRegister}  from "./authorController";
import { authenticate } from "../Middlewares/Authenticate";
const userRouter = Router();

userRouter.post("/register", authorRegister);
userRouter.post("/login", authorLogin);
userRouter.post("/logout",authenticate, authorLogout);
export default userRouter;