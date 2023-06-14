import { Router } from "express";
import { restaurantService } from "../services/restaurantService";
import { login_required } from "../middlewares/login_required";
import { getCurrentUser } from "../middlewares/getCurrentUser";

const restaurantRouter = Router();

// 식당 필터링 리스트(지역, 종류)
restaurantRouter.get(
  "/search",
  getCurrentUser,
  async function (req, res, next) {
    try {
      const { page, region, category } = req.query;
      console.log(page);
      const userId = req.currentUserId;
      const data = await restaurantService.getFilteredRestaurant({
        page,
        region,
        category,
        userId,
      });

      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
);

// 전체 식당 리스트
restaurantRouter.get("", getCurrentUser, async function (req, res, next) {
  try {
    const { page } = req.query;
    const userId = req.currentUserId;
    const data = await restaurantService.getRestaurants({ page, userId });

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 식당 상세페이지
restaurantRouter.get("/:id", getCurrentUser, async function (req, res, next) {
  try {
    const _id = req.params.id;
    const userId = req.currentUserId;
    const data = await restaurantService.getRestaurant(_id, userId);

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

restaurantRouter.put(
  "/contact",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const { _id } = req.body;
      const data = await restaurantService.updateContact({
        _id,
        userId,
      });

      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

export default restaurantRouter;
