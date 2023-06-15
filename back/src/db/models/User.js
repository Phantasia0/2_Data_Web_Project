import { UserModel } from "../schemas/user";
import { PostModel } from "../schemas/post";
import { ParkModel } from "../schemas/park";
import { RestaurantModel } from "../schemas/restaurant";
import mongoose from "mongoose";

class User {
  static async findAll() {
    const User = await UserModel.find({}, "_id profile");
    return User;
  }

  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByOne({ _id, id, nickname }) {
    const filter = {};
    if (_id) filter._id = _id;
    if (id) filter.id = id;
    if (nickname) filter.nickname = nickname;

    if (Object.keys(filter).length === 0)
      throw new Error("정보를 불러오지 못했습니다.");

    const user = await UserModel.findOne(filter);

    if (_id) {
      // return user;

      const post = await PostModel.aggregate([
        {
          $match: {
            user: mongoose.Types.ObjectId(_id),
          },
        },
        {
          $project: {
            likeCount: {
              $size: {
                $filter: {
                  input: { $ifNull: ["$likes", []] }, //필터링 할 배열소스
                  cond: { $eq: ["$$this.value", 1] }, // 지정 표현식 각 요소에 대해 평가하고 선택
                },
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            postCount: { $sum: 1 }, // post의 총 갯수
            likeCount: { $sum: "$likeCount" }, // likeCount의 총합
          },
        },
      ]);

      const comment = await PostModel.aggregate([
        {
          $match: {
            "comments.user": mongoose.Types.ObjectId(_id),
          },
        },
        {
          $project: {
            commentCount: {
              $size: {
                $filter: {
                  input: "$comments",
                  as: "comment",
                  cond: {
                    $eq: ["$$comment.user", mongoose.Types.ObjectId(_id)],
                  },
                },
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: "$commentCount" },
          },
        },
      ]);

      user.set("post", post[0]?.postCount || 0, { strict: false });
      user.set("comment", comment[0]?.count || 0, { strict: false });
      user.set("follow", post[0]?.likeCount || 0, { strict: false });
    }

    return user;
  }

  static async update({ _id, key, value }) {
    const filter = { _id };
    const update = { [key]: value };
    const option = { returnOriginal: false };

    return await UserModel.findOneAndUpdate(filter, update, option);
  }

  static async findContactInfo({ _id }) {
    const restaurant = await RestaurantModel.aggregate([
      {
        $match: {
          "contacts.user": mongoose.Types.ObjectId(_id),
        },
      },
      {
        $unwind: "$contacts",
      },
      {
        $match: {
          "contacts.user": mongoose.Types.ObjectId(_id),
          "contacts.value": 1,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);

    const park = await ParkModel.aggregate([
      {
        $match: {
          "contacts.user": mongoose.Types.ObjectId(_id),
        },
      },
      {
        $unwind: "$contacts",
      },
      {
        $match: {
          "contacts.user": mongoose.Types.ObjectId(_id),
          "contacts.value": 1,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);

    return { restaurant, park };
  }

  static async findRankInfo({ _id }) {
    const users = await UserModel.find({}, "_id nickname");
    const updatedUsers = await Promise.all(
      users.map(async (user, idx) => {
        const { _id } = user;
        const post = await PostModel.aggregate([
          {
            $match: {
              user: mongoose.Types.ObjectId(_id),
            },
          },
          {
            $project: {
              likeCount: {
                $size: {
                  $filter: {
                    input: { $ifNull: ["$likes", []] }, //필터링 할 배열소스
                    cond: { $eq: ["$$this.value", 1] }, // 지정 표현식 각 요소에 대해 평가하고 선택
                  },
                },
              },
            },
          },
          {
            $group: {
              _id: null,
              postCount: { $sum: 1 }, // post의 총 갯수
              likeCount: { $sum: "$likeCount" }, // likeCount의 총합
            },
          },
        ]);

        const comment = await PostModel.aggregate([
          {
            $match: {
              "comments.user": mongoose.Types.ObjectId(_id),
            },
          },
          {
            $project: {
              commentCount: {
                $size: {
                  $filter: {
                    input: "$comments",
                    as: "comment",
                    cond: {
                      $eq: ["$$comment.user", mongoose.Types.ObjectId(_id)],
                    },
                  },
                },
              },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: "$commentCount" },
            },
          },
        ]);

        const updatedUser = {
          _id: user._id,
          nickname: user.nickname,
          post: post[0]?.postCount || 0,
          comment: comment[0]?.count || 0,
          follow: post[0]?.likeCount || 0,
          score:
            (post[0]?.likeCount || 0) * 10 +
            ((post[0]?.postCount || 0) * 2 || 0) +
            (comment[0]?.count || 0),
        };

        return updatedUser;
      })
    );

    updatedUsers.sort((a, b) => b.score - a.score);
    const top10Users = updatedUsers.slice(0, 10);
    return top10Users;
  }
}

export { User };
