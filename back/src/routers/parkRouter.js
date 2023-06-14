import { Router } from "express";
import { parkService } from "../services/parkService";
import { login_required } from "../middlewares/login_required";
import { getCurrentUser } from "../middlewares/getCurrentUser";

const ParkRouter = Router();

// 공원 필터링 리스트(지역, 종류)
ParkRouter.get("/search", getCurrentUser, async function (req, res, next) {
  try {
    const { region } = req.query;
    const userId = req.currentUserId;

    const data = await parkService.getFilteredPark({
      region,
      userId,
    });

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 공원 리스트
ParkRouter.get("", getCurrentUser, async function (req, res, next) {
  try {
    const { page } = req.query;
    const userId = req.currentUserId;
    const data = await parkService.getParks({ page, userId });

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 공원 상세페이지
ParkRouter.get("/:id", getCurrentUser, async function (req, res, next) {
  try {
    const _id = req.params.id;
    const userId = req.currentUserId;

    const data = await parkService.getPark(_id, userId);

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

ParkRouter.put("/contact", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const { _id } = req.body;
    const data = await parkService.updateContact({
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
});

export default ParkRouter;
