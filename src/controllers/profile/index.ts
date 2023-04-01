import express, { Request, Response } from "express";
import { Profile } from "../../models";
import { IProfile } from "../../lib";
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
            res.status(201).send({
                status: true,
                message: "ok",
                data: registeredProfile,
            });
        } catch (error) {
            res.status(400).send({
                status: false,
                error: "couldn't register profile",
            });
        }
    }
);
profileRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const emailBody = req.body.email;
        const passwordBody = req.body.password;

        const profile: any = await findProfile(emailBody);
        if (profile && compareHashPassword(passwordBody, profile.password)) {
            jwt.sign(
                { email: profile.email, _id: profile._id },
                String(process.env.SECRET_KEY),
                { expiresIn: "2h" },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).send(token);
                }
            );
        } else {
            res.status(400).send({
                message: "Invalid credantial",
            });
        }
    } catch (error: unknown) {
        res.status(400).send({
            status: false,
            error: "Login Failed!",
        });
    }
});

profileRouter.get(
    "/",
    verifyTokenUsingPassport,
    async (req: Request, res: Response) => {
        try {
            let page = Number(req.query.page);
            let size = Number(req.query.size);
            if (!page) {
                page = 1;
            }
            if (!size) {
                size = 5;
            }
            const skip = (page - 1) * size;
            const profileData = await findProfileWithPagination(size, skip);
            res.status(200).send({
                status: true,
                message: "Ok",
                data: {
                    page: page,
                    size: size,
                    profileData: profileData,
                },
            });
        } catch (error: any) {
            res.status(404).send({
                status: false,
                error: error.message,
            });
        }
    }
);
