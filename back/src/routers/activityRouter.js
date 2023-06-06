import { Router } from "express";
import { activityService } from "../services/activityService";

const ActivityRouter = Router();

// 공원 식당 리스트
ActivityRouter.get("", async function (req, res, next) {
  try {
    const { category } = req.query;
    const data = await activityService.getFilteredActivity({
      category,
    });

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default ActivityRouter;
