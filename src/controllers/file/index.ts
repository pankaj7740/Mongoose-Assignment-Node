import mongoose from "mongoose";
import express,{Request,Response} from "express";
import { upload } from "../../middlewares";
import { File } from "../../models";
import { UploadFile } from "../../services";
import { IFileUpload, makeResponse } from "../../lib";


export const fileRouter = express();

fileRouter.post(
    "/file",
    upload.single("file"),
    async (req: Request, res: Response) => {
      try {
        const fileBody = req.file;
        const file: IFileUpload = new File({
          _id: new mongoose.Types.ObjectId(),
          ...fileBody,
        });
        const createdFile = await UploadFile(file);
        makeResponse(res,200,true,"Ok",createdFile);
      } catch (err:any) {
        makeResponse(res,200,false,err.message,undefined);
      }
    }
);

  // routers.post("/multiple",async(req:Request,res:Response)=>{
//   try{
//     const {filesBody} = req.files;
//     console.log(filesBody);
//     const files :IFileUpload[] = filesBody.map((file: any) => {
//       return new File({
//         _id: new mongoose.Types.ObjectId(),
//       ...file
//       });
//     }
//   }catch(err){
//     res.status(500).send({
//       status: false,
//       message: "File couldn't be uploaded",
//     });
//   }
// })
