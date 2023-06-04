import { Router } from "express";
import { Restaurant } from "../db/models/Restaurant";

const restaurantRouter = Router();

// 식당 필터링 리스트(지역, 종류)
restaurantRouter.get("/search", async function (req, res, next) {
  try {
    const { region, category } = req.query;
    const filter = {};
    if (region) filter.region = region;
    if (category) filter.category = category;

    const data = await Restaurant.findBySearch(filter);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 전체 식당 리스트
restaurantRouter.get("", async function (req, res, next) {
  try {
    const data = await Restaurant.findAll();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 식당 상세페이지
restaurantRouter.get("/:id", async function (req, res, next) {
  try {
    const restaurant_id = req.params.id;
    const restaurant = await Restaurant.findById({
      restaurant_id,
    });

    res.status(200).send(restaurant);
  } catch (error) {
    next(error);
  }
});

export default restaurantRouter;
