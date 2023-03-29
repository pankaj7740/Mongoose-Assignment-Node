export * from "./user/index"
export * from "./farm"
export * from "./file"
export * from "./products"
export * from "./head"








// import express, { NextFunction, Request, Response } from "express";
// import expressSession from "express-session";
// import { ObjectId } from "mongodb";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import passport from "passport";
// import passportJwt from "passport-jwt";
// // import * as passportLocal from "passport-local";
// // const LocalStrategy = passportLocal.Strategy;
// import {
//   IProduct,
//   Product,
//   IUser,
//   User,
//   Farm,
//   IFarm,
//   IProductHead,
//   Head,
//   IFileUpload,
//   File,
// } from "../models";
// import {
//   validateProductBody,
//   validateProductId,
//   verifyToken,
//   upload,
//   initiallizePassport
// } from "../middlewares";
// import {
//   createProduct,
//   getAllProducts,
//   getProductById,
//   updateProductById,
//   deleteProductById,
//   createUser,
//   findUser,
//   createProductHead,
//   createfarm,
//   getProductHeadById,
//   UploadFile,
// } from "../services";

// export const routers = express();

// initiallizePassport(passport);

// routers.use(express.json());
// routers.use(
//   expressSession({
//     secret: String(process.env.SECRET_KEY),
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// routers.use(passport.initialize());
// routers.use(passport.session());
// routers.post("/register", async (req: Request, res: Response) => {
//   try {
//     const username: string = req.body.username;
//     const passcode: string = req.body.passcode;
//     const userNameExist = await findUser(username);
//     if (userNameExist) {
//       return res.status(400).send("User already exist");
//     }
//     const user: IUser = new User({
//       _id: new mongoose.Types.ObjectId(),
//       username: username,
//       passcode: passcode,
//     });
//     const newUser = await createUser(user);
//     res.status(201).send({
//       status: true,
//       message: "ok",
//       data: newUser,
//     });
//   } catch (error: any) {
//     res.status(400).send({
//       status: false,
//       message: "couldnt be registered",
//     });
//   }
// });

// routers.post('/login',passport.authenticate('local',{
//   failureMessage:"Failed to login"
// }),(req:Request,res:Response)=>{
//   res.send("Login successfully");
// })

// routers.post("/auth",async (req: Request, res: Response) => {
//   try {
//     const userBody = req.body;
//     const user :IUser = new User({
//       _id: new mongoose.Types.ObjectId(),
//       ...userBody,
//     });
//     await createUser(user);
//     jwt.sign({ user }, String(process.env.SECRET_KEY), {expiresIn:'300s'}, (err, token) => {
//       if (err) throw err;
//       res.status(201).send(token);
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// routers.post("/",validateProductBody,verifyToken, async (req: Request, res: Response) => {
//   try {
//     const productBody = req.body;
//     const product: IProduct = new Product({
//       _id: new mongoose.Types.ObjectId(),
//       ...productBody,
//     });
//     const createdProduct = await createProduct(product);
//     res.status(201).send({
//       status: true,
//       message: "Ok",
//       data: createdProduct,
//     });
//   } catch (error: any) {
//     res.status(500).send({
//       status: false,
//       message: "Product couldn't Be created",
//     });
//   }
// });

// routers.get("/",verifyToken, async (req: Request, res: Response) => {
//   try {
//     const products: any = await getAllProducts();
//     res.status(200).send({
//       status: true,
//       message: "Ok",
//       data: products,
//     });
//   } catch (error: any) {
//     res.status(400).send({
//       status: false,
//     });
//   }
// });

// routers.get("/:id",verifyToken, async (req: Request, res: Response) => {
//   try {
//     if (ObjectId.isValid(req.params.id)) {
//       const productId = req.params.id;
//       const product = await getProductById(productId);
//       res.status(200).send({
//         status: true,
//         message: "Ok",
//         data: product,
//       });
//     } else {
//       res.status(400).send({
//         message: "Id is not valid",
//       });
//     }
//   } catch (error: any) {
//     res.status(400).send({
//       status: false,
//       message: "couldn't find product using Id",
//     });
//   }
// });

// routers.put(
//   "/:id",
//   validateProductBody,
//   verifyToken,
//   async (req: Request, res: Response) => {
//     try {
//       if (ObjectId.isValid(req.params.id)) {
//         const productId = req.params.id;
//         const productBody = req.body;
//         const product = await updateProductById(productId, productBody);
//         res.status(200).send({
//           status: true,
//           message: "Ok",
//           data: product,
//         });
//       } else {
//         res.status(400).send({
//           message: "Id is not valid",
//         });
//       }
//     } catch (error: any) {
//       res.status(400).send({
//         status: false,
//         message: "Couldn't be updated",
//       });
//     }
//   }
// );
// routers.delete("/:id",verifyToken, async (req: Request, res: Response) => {
//   try {
//     if (ObjectId.isValid(req.params.id)) {
//       const productId = req.params.id;
//       const deletedProduct = await deleteProductById(productId);
//       res.status(200).send({
//         status: true,
//         message: "Ok",
//         data: deletedProduct,
//       });
//     } else {
//       res.status(400).send({
//         message: "Id is not valid",
//       });
//     }
//   } catch (error: any) {
//     res.status(400).send({
//       status: false,
//       message: "Product removed Faild",
//     });
//   }
// });
// routers.post(
//   "/file",
//   upload.single("file"),
//   async (req: Request, res: Response) => {
//     try {
//       const fileBody = req.file;

//       console.log(fileBody);

//       const file: IFileUpload = new File({
//         _id: new mongoose.Types.ObjectId(),
//         ...fileBody,
//       });
//       console.log(file);

//       const createdFile = await UploadFile(file);
//       res.status(201).send({
//         status: true,
//         message: "Ok",
//         data: createdFile,
//       });
//     } catch (err) {
//       res.status(500).send({
//         status: false,
//         message: "File couldn't be uploaded",
//       });
//     }
//   }
// );
// routers.post("/head", async (req: Request, res: Response) => {
//   try {
//     const productBody = req.body;
//     const product: IProductHead = new Head({
//       _id: new mongoose.Types.ObjectId(),
//       ...productBody,
//     });
//     const createdProduct = await createProductHead(product);
//     res.status(200).send({
//       status: true,
//       message: "Ok",
//       data: createdProduct,
//     });
//   } catch (err) {
//     res.status(400).send({
//       status: false,
//       message: "Product body is not valid",
//     });
//   }
// });

// routers.post("/farm", async (req, res) => {
//   try {
//     const farmBody = req.body;
//     const farm: IFarm = new Farm({
//       _id: new mongoose.Types.ObjectId(),
//       ...farmBody,
//     });
//     const createdFarm = await createfarm(farm);
//     res.status(200).send({
//       status: true,
//       message: "Ok",
//       data: createdFarm,
//     });
//   } catch (err) {
//     res.status(400).send({
//       status: false,
//       message: "Farm body is not valid",
//     });
//   }
// });
// routers.get("/farm/:id", async (req: Request, res: Response) => {
//   try {
//     if (ObjectId.isValid(req.params.id)) {
//       const farmId = req.params.id;
//       const farm = await getProductHeadById(farmId);
//       res.status(200).send({
//         status: true,
//         message: "Ok",
//         data: farm,
//       });
//     } else {
//       res.status(400).send({
//         message: "Id is not valid",
//       });
//     }
//   } catch (err) {
//     res.status(400).send({
//       status: false,
//       message: `couldn't find data ${err}`,
//     });
//   }
// });
