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
    const user = await UserModel.findOne(filter);
    return user;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };
