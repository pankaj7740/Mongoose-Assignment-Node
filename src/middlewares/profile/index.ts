import { ILogin, IProfile } from "../../lib";
import { Request, Response, NextFunction } from "express"
import passport from "passport";
import * as PassportJwt from "passport-jwt";
import Joi from "joi";

export const validateProfileRegisterationData = (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.object<IProfile>({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string()
            .valid('USER', 'ADMIN')
            .optional()
    }).validate(req.body)
    if (error) {
        res.status(400).send({
            error: error.details[0].message,
        });
    }
    next();
}

export const PassportJwtInitiallize = (passport: passport.PassportStatic) => {
    passport.serializeUser((payload, done) => done(null, payload));
    passport.deserializeUser((payload: ILogin, done) => done(null, payload));
    passport.use(new PassportJwt.Strategy({
        jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: String(process.env.SECRET_KEY)
    }, (payload: ILogin, done: Function) => {
        try {
            done(null, payload)
        } catch (error) {
            done
        }
    }))
}

export const verifyTokenUsingPassport = (req:Request,res:Response,next: NextFunction) => {
    passport.authenticate('jwt', { session: false })
    return next()
}