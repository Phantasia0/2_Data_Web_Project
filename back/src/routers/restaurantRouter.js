import { Router } from "express";
import { restaurantService } from "../services/restaurantService";

const restaurantRouter = Router();

// 식당 필터링 리스트(지역, 종류)
restaurantRouter.get("/search", async function (req, res, next) {
  try {
    const { region, category } = req.query;

    const data = await restaurantService.getFilteredRestaurant({
      region,
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

// 전체 식당 리스트
restaurantRouter.get("", async function (req, res, next) {
  try {
    const { page } = req.query;

    const data = await restaurantService.getRestaurants(page);

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 식당 상세페이지
restaurantRouter.get("/:id", async function (req, res, next) {
  try {
    const restaurant_id = req.params.id;
    const data = await restaurantService.getRestaurant(restaurant_id);

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default restaurantRouter;
