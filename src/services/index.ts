import { Product, IProduct } from "../models/index";

export const createProduct = (productBody: IProduct) => {
  return new Promise((resolve, reject) => {
    productBody.save()
    .then(resolve)
    .catch(reject);
  });
};

export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    Product.find()
    .then(resolve)
    .catch(reject);
  });
};

export const getProductById = (productId: string) => {
  return new Promise((resolve, reject) => {
    Product.findById(productId)
    .then(resolve)
    .catch(reject);
  });
};
export const updateProductById = (productId: string, productBody: any) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(productId, productBody, { new: true })
      .then(resolve)
      .catch(reject);
  });
};

export const deleteProductById = (productId: string) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndDelete(productId)
    .then(resolve)
    .catch(reject);
  });
};

export const createUser = (userBody:any)=>{
  return new Promise((resolve, reject) => {
    userBody.save()
   .then(resolve)
   .catch(reject);
  });
}

// export const createProduct1 = (productBody: any)=>{
//     return new Promise ((resolve, reject) => {
//         productBody.save()
//         .then(resolve)
//         .catch(reject);
//     });
// }
// export const getProductId = (productId:string)=>{
//     return new Promise ((resolve, reject) => {
//         Product.findById(productId)
//        .then(resolve)
//        .catch(reject);
//     });
// }

