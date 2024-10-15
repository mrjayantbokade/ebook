
import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import {configuration} from "../config/config";


const globalErrorHandler:any = (err:HttpError, req:Request, res:Response, next:NextFunction):Response => {

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const stack = configuration.NODE_ENV === 'development' ? err.stack : undefined;
    
    return res.status(statusCode)
    .json(
        {
            "statusCode":statusCode,
            "message":message,
            "errorStack":stack
        }
    );
}

export default globalErrorHandler;
