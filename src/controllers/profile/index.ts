import express, { Request, Response } from "express";
import { Profile } from "../../models";
import { IProfile, makeResponse } from "../../lib";
import {
    findProfile,
    findProfileWithPagination,
    registerProfile,
} from "../../services";
import mongoose from "mongoose";
import {
    PassportJwtInitiallize,
    validateProfileRegisterationData,
    verifyTokenUsingPassport,
} from "../../middlewares/";
import passport from "passport";
import jwt from "jsonwebtoken";
import { compareHashPassword } from "../../config";

export const profileRouter = express();
PassportJwtInitiallize(passport);
profileRouter.use(passport.initialize());

profileRouter.post(
    "/register",
    validateProfileRegisterationData,
    async (req: Request, res: Response) => {
        try {
            const profileBody = req.body;
            const profileExist = await findProfile(profileBody.email);
            if (profileExist) {
                return res.status(400).send({
                    status: false,
                    message: "User already exists",
                });
            }
            const profile: IProfile = new Profile({
                _id: new mongoose.Types.ObjectId(),
                ...profileBody,
            });
            const registeredProfile = await registerProfile(profile);
            makeResponse(res,201,true,"Ok",registeredProfile)
        } catch (error:any){
            makeResponse(res,400,false,error.message,undefined)
        }
    }
);
profileRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const {email,password} = req.body;
        const profile: any = await findProfile(email);
        if (profile && compareHashPassword(password, profile.password)) {
            jwt.sign(
                { email: profile.email, _id: profile._id },
                String(process.env.SECRET_KEY),
                { expiresIn: "2h" },
                (err, token) => {
                    if (err) throw err;
                    makeResponse(res,200,true,"Ok",token);
                }
            );
        } else {
            res.status(400).send({
                message: "Invalid credantial",
            });
        }
    } catch (error: any) {
        makeResponse(res,400,false,error.message,undefined);
    }
});

profileRouter.get(
    "/",
    verifyTokenUsingPassport,
    async (req: Request, res: Response) => {
        try {
            let page = Number(req.query.page);
            let size = Number(req.query.size);
            // let {page, size} = Number(req.query);
            if (!page) {
                page = 1;
            }
            if (!size) {
                size = 5;
            }
            const skip = (page - 1) * size;
            const profileData = await findProfileWithPagination(size, skip);
            const data = {
                page: page,
                size: size,
                profileData: profileData
            }
             makeResponse(res,200,true,"Ok",data);
        } catch (error: any) {
            makeResponse(res,400,false,error.message,undefined)
        }
    }
);
