import { UserModel } from "../schemas/user";
import { ParkModel } from "../schemas/park";
import { RestaurantModel } from "../schemas/restaurant";

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

  static async findContactInfo(_id) {
    const restaurant = await RestaurantModel.aggregate([
      {
        $match: {
          "contacts.user": _id,
        },
      },
      {
        $unwind: "$contacts",
      },
      {
        $match: {
          "contacts.user": _id,
          "contacts.value": 1,
        },
      },
    ]);
    const park = await ParkModel.find({
      "contacts.user": _id,
      contacts: {
        $elemMatch: { value: 1 },
      },
    });

    return { restaurant, park };
  }
}

export { User };
