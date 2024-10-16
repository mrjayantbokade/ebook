import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../util/ApiResponse";
import createHttpError from "http-errors";
import userModel from "./authorModel";
import bcrypt from "bcrypt";
import authorModel from "./authorModel";
import { asyncHandler } from "../util/asyncHandler";
import jwt from "jsonwebtoken"
import { configuration } from "../config/config";



//registration
const authorRegister: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

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



        const author = await authorModel.findOne({ email })
        if (author) {
            const error = createHttpError(400, "user/author already exist");
            return res.status(400)
                .json(
                    new ApiResponse(
                        400,
                        error,
                        "user/author already exist"
                    )
                )

        }




        const hashedPassword = await bcrypt.hash(password, 10)

        //Way 1: This is one way to save or create new user

        // const newAuthor = await new authorModel({
        //     name: name,
        //     email: email,
        //     password: hashedPassword
        //   });

        // const createdAuthor = await newAuthor.save();



        //Way 2: Here is another way to 

        const serverResponse = await authorModel.create(
            {
                name,
                email,
                password: hashedPassword
            })

        //generating access token

        const token = jwt.sign({

          
            sub: serverResponse._id,
          

        }, configuration.JWT_SERCRET as string
            , {
                expiresIn: "7d",
                // algorithm:"HS256" not neccessary cause it uses by default hs256 
            })


        if (!serverResponse) {
            return next(createHttpError(500, "Error while creating auther/user or registering the user/authorz"))
        }

        const createdAuthor = {
            _id: serverResponse._id,
            accessToken: token

        }



        res.status(201)
            .json(

                new ApiResponse(
                    201,
                    createdAuthor,
                    "user registered successfully"
                )
            )
    }
)


// login
const userLogin: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        // take input email and password and throw error if not InputDeviceInfo
        // check if email exist 
        // if not create error and send response that user not exist 
        // if exist then check if password and retried password are matching 
        // if not then send incorrect password
        // if yes then send res for now that login successfull

        const { email, password } = req.body;

        if (!email || !password) {
            const err = createHttpError(400, "All fields are required")
            return res.status(400).json(new ApiResponse(400, err, "All fields are required"))
        }


        const user = await authorModel.findOne({ email })


        if (!user) {
            const err = createHttpError(400, "user does not exist")
            return res.status(400).json(new ApiResponse(400, err, "user does not exist"))
        }

        // console.log("user:", user)

        const checkPassword = await bcrypt.compare(password, user.password)

        // console.log(checkPassword, "checked password")

        const token = jwt.sign({

          
            sub: user._id,
          

        }, configuration.JWT_SERCRET as string
            , {
                expiresIn: "7d",
                // algorithm:"HS256" not neccessary cause it uses by default hs256 
            })



        if (checkPassword) {

            const options = {
                httpOnly: true,
                secure: true,
            }
           
            return res.status(200)
            .cookie("token", token, options)
                .json(
                    new ApiResponse(
                        200,
                        {},
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

)
export { authorRegister, userLogin }