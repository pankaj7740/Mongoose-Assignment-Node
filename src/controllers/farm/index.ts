import { ObjectId } from "mongodb";
import express,{Request,Response} from "express";
import mongoose from "mongoose";
import { Farm } from "../../models";
import { createfarm, getProductHeadById } from "../../services";
import { IFarm, makeResponse } from "../../lib";


export const farmRouters = express();

farmRouters.post("/", async (req, res) => {
    try {
      const farmBody = req.body;
      const farm: IFarm = new Farm({
        _id: new mongoose.Types.ObjectId(),
        ...farmBody,
      });
      const createdFarm = await createfarm(farm);
      makeResponse(res,201,true,"Ok",createdFarm);
    } catch (err:any) {
      makeResponse(res,200,false,err.message,undefined);
    }
  });
  farmRouters.get("/:id", async (req: Request, res: Response) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const farmId = req.params.id;
        const farm = await getProductHeadById(farmId);
        makeResponse(res,200,true,"Ok",farm);
      } else {
        makeResponse(res,400,false,"Id is not valid",undefined);
      }
    } catch (err:any) {
      makeResponse(res,400,false,err.message,undefined);
    }
  });
  