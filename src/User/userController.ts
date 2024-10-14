import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../util/ApiResponse";
import createHttpError from "http-errors";
import userModel from "./userModel";
import exp from "constants";


 const  userRegister:any = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password){

        const error = createHttpError(400);
        res.status(400)
        .json(
            new ApiResponse(
                400,
                error,
                "All fields are required"
            )
        )
        return next(error)
        
        
    }


    // const user = {
    //     "name": name,
    //     "username": username,
    //     "password": password
    // }


    // res.status(201)
    //     .json(

    //         new ApiResponse(201, user, "user registered successfully")
    //     )


    // take email, name, password form client
    // check if user exist
    // if not exist then create one
    // else throw error
    // send response with status 201



    const user = await userModel.findOne({email})
    if(user){
        const error = createHttpError(400, "user already exist");
        return res.status(400)
                .json(
                    new ApiResponse(
                        400,
                        error,
                        "user already exist"
                    )
                )
          
    }


    const newUser = new userModel({
        name: name,
        email: email,
        password: password
      });

      const createdUser = await newUser.save();


res.status(201)
    .json(

        new ApiResponse(
            201,
            createdUser,
            "user registered successfully"
        )
    )
}












const userLogin:any = async(req: Request, res:Response, next:NextFunction) =>{


    // take input email and password and throw error if not InputDeviceInfo
    // check if email exist 
    // if not create error and send response that user not exist 
    // if exist then check if password and retried password are matching 
    // if not then send incorrect password
    // if yes then send res for now that login successfull





    const {email, password} = req.body;

    if(!email || !password){
        const err = createHttpError(400, "All fields are required")
        return res.status(400).json(new ApiResponse(400, err, "All fields are required"))
    }


    const user = await userModel.findOne({email})

    if(!user){
        const err = createHttpError(400, "user does not exist")
        return res.status(400).json(new ApiResponse(400, err, "user does not exist"))
    }

   

   if(password === user.password){
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "login successfully"

        )
    )
   }

   return res.status(400)
   .json(
    new ApiResponse(
        400,
        "",
        "invalid credentials"
    )
   )





    
    
}

export { userRegister, userLogin }