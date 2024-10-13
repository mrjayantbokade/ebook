import express from "express";
const app = express();
import globalErrorHandler from "./Middlewares/GlobalErrorHandler";
import { ApiResponse } from "./util/ApiResponse";
import mongoose from "mongoose";

app.get("/", (req, res) => {


    const data:number  = 10;

    res.status(200)
    .json(
        new ApiResponse(200, "home page it is", data)
    )
});


app.post("/users/register", (req, res)=>{
    const {username , password} = req.body;

    
})

app.use(globalErrorHandler);

export default app;
