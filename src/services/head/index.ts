import { IProductHead } from "../../lib";
import { Farm } from "../../models";

export const createProductHead = (productBody: IProductHead)=>{
    return new Promise ((resolve, reject) => {
        productBody.save()
        .then(resolve)
        .catch(reject);
    });
}
export const getProductHeadById = (farmId:string)=>{
    return new Promise ((resolve, reject) => {
       Farm.findById(farmId).populate('heads')
       .then(resolve)
       .catch(reject);
    });
}
