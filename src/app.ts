import express from "express";
import globalErrorHandler from "./Middlewares/GlobalErrorHandler";
import { ApiResponse } from "./util/ApiResponse";
import mongoose from "mongoose";
import userRouter from "./Author/authorRouter";
import bookRouter from "./Book/bookRouter";
import cookieParser from "cookie-parser"


const app = express();

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(cookieParser());



app.get("/", (req, res) => {
    const data:number  = 10;
    res.status(200)
    .json(
        new ApiResponse(200, data, "this is home page")
    )
});


app.use("/api/v1/users",userRouter);
app.use("/api/v1/books",bookRouter);


app.use(globalErrorHandler);

export default app;
