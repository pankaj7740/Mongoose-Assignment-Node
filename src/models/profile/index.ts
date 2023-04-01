import { IProfile, ROLE } from "../../lib";
import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcryptjs";

const profileSchema = new Schema<IProfile>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(ROLE),
        required: true
    }
});
profileSchema.pre<IProfile>("save", function (next) {
    const profile = this;
    if (profile.isModified('password')) {
        genSalt(10, (err, salt) => {
            if (err)
                return next(err);
            hash(profile.password, salt, (err, hash) => {
                if (err)
                    return next(err);
                profile.password = hash;
                next();
            })
        })
    } else {
        next()
    }
});
profileSchema.post<IProfile>("save", function (profile) {
    console.log(`user saved of Id : ${profile._id}`);
})

export const Profile = model<IProfile>("profile", profileSchema);