import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../util/asyncHandler";
import  jwt from "jsonwebtoken";
import { configuration } from "../config/config";
import createHttpError from "http-errors";


export interface AuthRequest extends Request{
    userId: string
}

const authenticate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            return next(createHttpError(401, "Please login || Unauthorized access"));
        }

        const decodedToken = jwt.verify(token, configuration.JWT_SERCRET as string)
        if(!decodedToken){
            return next(createHttpError(401, "Token Expired || Please login || Unauthorized access"));
        }
       
        const { exp } = decodedToken as { exp: number };

        const isExpired = Date.now() >= exp * 1000;
       if(isExpired){
        return next(createHttpError(401, "Token Expired || Please login || Unauthorized access"));
       }


       const _req = req as AuthRequest;
       _req.userId = decodedToken.sub as string;
       

        next();
    }
)

export { authenticate }