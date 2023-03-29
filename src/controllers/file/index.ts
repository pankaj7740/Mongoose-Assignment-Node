import mongoose from "mongoose";
import express,{Request,Response} from "express";
import { upload } from "../../middlewares";
import { File } from "../../models";
import { UploadFile } from "../../services";
import { IFileUpload } from "../../lib";


export const fileRouter = express();

fileRouter.post(
    "/file",
    upload.single("file"),
    async (req: Request, res: Response) => {
      try {
        const fileBody = req.file;
  
        console.log(fileBody);
  
        const file: IFileUpload = new File({
          _id: new mongoose.Types.ObjectId(),
          ...fileBody,
        });
        console.log(file);
        const createdFile = await UploadFile(file);
        res.status(201).send({
          status: true,
          message: "Ok",
          data: createdFile,
        });
      } catch (err) {
        res.status(500).send({
          status: false,
          message: "File couldn't be uploaded",
        });
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
