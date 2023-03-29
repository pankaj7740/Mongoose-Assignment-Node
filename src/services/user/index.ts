import { User } from "../../models";


export const createUser = (userBody:any)=>{
    return new Promise((resolve, reject) => {
      userBody.save()
     .then(resolve)
     .catch(reject);
    });
  }
  export const findUser = (username : string) =>{
    return new Promise((resolve, reject) => {
      User.findOne({username: username})
      .then(resolve)
      .catch(reject);
    });
  }