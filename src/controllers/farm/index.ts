import { ObjectId } from "mongodb";
import express,{Request,Response} from "express";
import mongoose from "mongoose";
import { Farm } from "../../models";
import { createfarm, getProductHeadById } from "../../services";
import { IFarm } from "../../lib";


export const farmRouters = express();

farmRouters.post("/farm", async (req, res) => {
    try {
      const farmBody = req.body;
      const farm: IFarm = new Farm({
        _id: new mongoose.Types.ObjectId(),
        ...farmBody,
      });
      const createdFarm = await createfarm(farm);
      res.status(200).send({
        status: true,
        message: "Ok",
        data: createdFarm,
      });
    } catch (err) {
      res.status(400).send({
        status: false,
        message: "Farm body is not valid",
      });
    }
  });
  farmRouters.get("/farm/:id", async (req: Request, res: Response) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const farmId = req.params.id;
        const farm = await getProductHeadById(farmId);
        res.status(200).send({
          status: true,
          message: "Ok",
          data: farm,
        });
      } else {
        res.status(400).send({
          message: "Id is not valid",
        });
      }
    } catch (err) {
      res.status(400).send({
        status: false,
        message: `couldn't find data ${err}`,
      });
    }
  });
  