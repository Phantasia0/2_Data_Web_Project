import { Router } from "express";
import { Park } from "../db/models/Park";

const ParkRouter = Router();

// 공원 필터링 리스트(지역, 종류)
ParkRouter.get("/search", async function (req, res, next) {
  try {
    const { region, category } = req.query;
    const filter = {};
    if (region) filter.region = region;
    if (category) filter.category = category;

    const data = await Park.findBySearch(filter);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 공원 식당 리스트
ParkRouter.get("", async function (req, res, next) {
  try {
    const data = await Park.findAll();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 공원 상세페이지
ParkRouter.get("/:id", async function (req, res, next) {
  try {
    const park_id = req.params.id;
    const park = await Park.findById({
      park_id,
    });

    res.status(200).send(park);
  } catch (error) {
    next(error);
  }
});

export default ParkRouter;
