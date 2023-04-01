import { Profile } from "../../models/";
import { IProfile } from "../../lib";

export const registerProfile = (profileBody: IProfile) => {
    return new Promise((resolve, reject) => {
        profileBody.save()
            .then(resolve)
            .catch(reject);
    });
}
export const findProfile = (email: string) => {
    return new Promise((resolve, reject) => {
        Profile.findOne({ email: email })
            .then(resolve)
            .catch(reject);
    });
}

export const findProfileWithPagination = (limit: number, skip: number) => {
    return new Promise((resolve, reject) => {
        Profile.find({}, {}, { skip: skip, limit: limit })
            .then(resolve)
            .catch(reject);
    })
}