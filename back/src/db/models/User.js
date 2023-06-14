import { UserModel } from "../schemas/user";

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
    return await UserModel.findOne(filter);
  }

  static async update({ _id, key, value }) {
    const filter = { _id };
    const update = { [key]: value };
    const option = { returnOriginal: false };

    return await UserModel.findOneAndUpdate(filter, update, option);
  }
}

export { User };
