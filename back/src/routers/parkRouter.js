import { Router } from "express";
import { parkService } from "../services/parkService";

const ParkRouter = Router();

// 공원 필터링 리스트(지역, 종류)
ParkRouter.get("/search", async function (req, res, next) {
  try {
    const { region } = req.query;

    const data = await parkService.getFilteredPark({
      region,
    });

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 공원 식당 리스트
ParkRouter.get("", async function (req, res, next) {
  try {
    const { page } = req.query;
    const data = await parkService.getParks(page);

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 공원 상세페이지
ParkRouter.get("/:id", async function (req, res, next) {
  try {
    const park_id = req.params.id;

    const data = await parkService.getPark(park_id);

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default ParkRouter;
