import { Router } from "express";
import axios from "axios";

const kakaoRouter = Router();

kakaoRouter.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const url = `http://place.map.kakao.com/main/v/${id}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

export default kakaoRouter;

// nvm node 14.0.0 버전 사용해야 리스폰스 값 받을 수 있음