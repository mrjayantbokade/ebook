import express from "express";
const app = express();
import globalErrorHandler from "./Middlewares/GlobalErrorHandler";
import { ApiResponse } from "./util/ApiResponse";
import mongoose from "mongoose";
import userRouter from "./User/userRouter";






app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.get("/", (req, res) => {
    const data:number  = 10;
    res.status(200)
    .json(
        new ApiResponse(200, data, "this is home page")
    )
});


app.use("/api/v1/users",userRouter);


app.use(globalErrorHandler);

export default app;
