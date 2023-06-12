import { Router } from "express";
import { postService } from "../services/postService";
import { login_required } from "../middlewares/login_required";

const postRouter = Router();

// 게시글 리스트
postRouter.get("/", async function (req, res, next) {
  try {
    const { page } = req.query;
    const data = await postService.getPosts({ page });

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 게시글 상세( 댓글/좋아요 포함 )
postRouter.get("/:_id", async function (req, res, next) {
  try {
    const post_id = req.params._id;
    const data = await postService.getPost(post_id);

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 게시글 작성
postRouter.post("/", login_required, async function (req, res, next) {
  try {
    const user = req.currentUserId;
    const { content } = req.body;
    const data = await postService.create({ user, content });

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 게시글 수정
postRouter.put("/:_id", login_required, async function (req, res, next) {
  try {
    const _id = req.params._id;
    const { content } = req.body;
    const data = await postService.update({ _id, content });
    console.log(data);

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 게시글 삭제
postRouter.delete("/:_id", login_required, async function (req, res, next) {
  try {
    const _id = req.params._id;
    const data = await postService.remove(_id);

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 좋아요처리
postRouter.put("/:_id/like", login_required, async function (req, res, next) {
  try {
    const postId = req.params._id;
    const userId = req.currentUserId;
    const data = await postService.updateLike({ postId, userId });

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// 댓글 작성
postRouter.post(
  "/:_id/comment",
  login_required,
  async function (req, res, next) {
    try {
      const postId = req.params._id;
      const userId = req.currentUserId;
      const { content } = req.body;
      const data = await postService.createComment({ postId, userId, content });

      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
);

// 댓글 수정
postRouter.put(
  "/:postid/comment/:_id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params._id;
      const { content } = req.body;
      const data = await postService.updateComment({ _id, content });

      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
);

// 댓글 삭제
postRouter.delete(
  "/:postid/comment/:_id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params._id;
      const data = await postService.removeComment(_id);

      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
);

export default postRouter;
