import { Request, Response, NextFunction } from "express";


const registerUser = (req:Request, res:Response, next:NextFunction)=>{

    const { username, password } = req.body;
     res.send("hello register user")

}

export { registerUser }