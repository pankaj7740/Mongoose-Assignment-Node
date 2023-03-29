import { IFarm } from "../../lib";

export const createfarm = (farmBody:IFarm)=>{
    return new Promise ((resolve, reject) => {
      farmBody.save()
    .then(resolve)
    .catch(reject);
    });
  }