import { Router } from "express";
import { Activity } from "../db/models/Activity";

const ActivityRouter = Router();

// 공원 식당 리스트
ActivityRouter.get("", async function (req, res, next) {
  try {
    const data = await Activity.findAll();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default ActivityRouter;