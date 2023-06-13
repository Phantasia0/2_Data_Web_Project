import { UserModel } from "../schemas/user";

class User {
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
    return await UserModel.findOne(filter);
  }

  static async update({ _id, key, value }) {
    const filter = { _id };
    const update = { [key]: value };
    const option = { returnOriginal: false };

    return await UserModel.findOneAndUpdate(filter, update, option);
  }

  // 찜 처리
  static async spotContact({ _id, restaurantId, parkId }) {
    if (restaurantId) {
      const filter = { _id, "contacts.restaurant": restaurantId };
    } else if (parkId) {
      const filter = { _id, "contacts.park": parkId };
    } else {
      throw new Error("정보를 불러오지 못했습니다.");
    }

    // 찾을 문서의 필터 조건
    let contact = await UserModel.findOne(filter); // 문서 찾기

    if (contact) {
      const currentValue = post.likes.filter(
        (like) => like.user.toString() === userId
      );

      currentValue[0].value = currentValue[0].value === 0 ? 1 : 0;
      await post.save(); // 문서 업데이트
    } else {
      contact = await UserModel.updateOne(
        { _id },
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

export { User };
