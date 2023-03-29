import mongoose from "mongoose";
import express,{Request,Response} from "express";
import {  User } from "../../models";
import {IUser} from "../../lib";
import { findUser, createUser } from "../../services";
import passport from "passport";
import { initiallizePassport } from "../../middlewares";
import expressSession from "express-session";


export const userRouter = express();


initiallizePassport(passport);

userRouter.use(express.json());
userRouter.use(
  expressSession({
    secret: String(process.env.SECRET_KEY),
    resave: false,
    saveUninitialized: false,
  })
);
userRouter.use(passport.initialize());
userRouter.use(passport.session());

userRouter.post("/register", async (req: Request, res: Response) => {
    try {
      const username: string = req.body.username;
      const passcode: string = req.body.passcode;
      const userNameExist = await findUser(username);
      if (userNameExist) {
        return res.status(400).send("User already exist");
      }
      const user: IUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        passcode: passcode,
      });
      const newUser = await createUser(user);
      res.status(201).send({
        status: true,
        message: "ok",
        data: newUser,
      });
    } catch (error: any) {
      res.status(400).send({
        status: false,
        message: "couldnt be registered",
      });
    }
  });

  userRouter.post('/login',passport.authenticate('local',{
    failureMessage:"Failed to login"
  }),(req:Request,res:Response)=>{
    res.send("Login successfully");
  })