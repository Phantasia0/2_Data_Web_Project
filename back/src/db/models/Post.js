import { PostModel } from "../schemas/post";
import {RestaurantModel} from "../schemas/restaurant";

class Post {
  static async findById(_id) {
    const post = await PostModel.findOne({ _id })
      .populate("user", "_id nickname")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "_id nickname",
        },
      })
      .populate({
        path: "likes",
        populate: {
          path: "user",
          select: "_id nickname",
        },
      });
    return post;
  }

  static async findAll({page}) {
    page = parseInt(page) || 1;
    const limit = 4; // 페이지당 보여줄 항목 수
    const skip = (page - 1) * limit;

    const post = await PostModel.aggregate([
      { $match: {} }, // 필요한 필터 조건을 추가하십시오. 예: { _id: postId }
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          user: { _id: 1, nickname: 1 },
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          likeCount: {
            $size: {
              $filter: {
                input: { $ifNull: ["$likes", []] }, //필터링 할 배열소스
                cond: { $eq: ["$$this.value", 1] }, // 지정 표현식 각 요소에 대해 평가하고 선택
              },
            },
          },
          commentCount: { $size: { $ifNull: ["$comments", []] } },
        },
      },
    ]);

    const total = await PostModel.countDocuments();

    return { total, post };
  }

  static async create({ user, content }) {
    const post = await PostModel.create({
      user,
      content,
    });
    return post;
  }

  static async update({ _id, content }) {
    return await PostModel.updateOne({ _id }, { content });
  }

  static async remove(_id) {
    return await PostModel.deleteOne({ _id });
  }

  // 좋아요 처리
  static async postLike({ postId, userId }) {
    const filter = { _id: postId, "likes.user": userId }; // 찾을 문서의 필터 조건
    let post = await PostModel.findOne(filter); // 문서 찾기

    if (post) {
      const currentValue = post.likes[0].value;
      post.likes[0].value = currentValue === 0 ? 1 : 0;
      await post.save(); // 문서 업데이트
    } else {
      post = await PostModel.updateOne(
        { _id: postId },
        {
          $push: {
            likes: { user: userId },
          },
        }
      );
      post = await PostModel.findOne(filter);
    }
    return post.likes[0];
  }
}

class Comment {
  static async create({ _id, user, content }) {
    const comment = await PostModel.updateOne(
      { _id },
      {
        $push: {
          comments: { user, content },
        },
      }
    );
    return comment;
  }

  static async update({ _id, content }) {
    return await PostModel.updateOne(
      { "comments._id": _id }, // 해당 게시물과 댓글 ID로 댓글 찾기
      { $set: { "comments.$.content": content } } // 댓글 내용 수정
    );
  }

  static async remove(_id) {
    return await PostModel.updateOne(
      { "comments._id": _id }, // 해당 게시물과 댓글 ID로 댓글 찾기
      { $pull: { comments: { _id } } } // 댓글 삭제
    );
  }
}

export { Post, Comment };
