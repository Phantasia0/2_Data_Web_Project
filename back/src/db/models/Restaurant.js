import { RestaurantModel } from "../schemas/restaurant";
import { UserModel } from "../schemas/user";
import { LIMIT } from "../../lib/constant";

class Restaurant {
  static async findAll({ page, userId }) {
    const skip = (page - 1) * LIMIT;
    const match = {};

    const restaurant = await RestaurantModel.aggregate([
      { $match: match }, // 필요한 필터 조건을 추가하십시오. 예: { _id: postId }
      { $skip: skip },
      { $limit: LIMIT },
      {
        $project: {
          _id: 1,
          category: 1,
          name: 1,
          region: 1,
          address: 1,
          tel: 1,
          description: 1,
          latitude: 1,
          longitude: 1,
          reservation: 1,
          contactCount: {
            $size: {
              $filter: {
                input: { $ifNull: ["$contacts", []] }, //필터링 할 배열소스
                cond: { $eq: ["$$this.value", 1] }, // 지정 표현식 각 요소에 대해 평가하고 선택
              },
            },
          },
          contactCheck: {
            $size: {
              $filter: {
                input: { $ifNull: ["$contacts", []] }, //필터링 할 배열소스
                cond: {
                  $and: [
                    { $eq: ["$$this.value", 1] },
                    { $eq: [{ $toString: "$$this.user" }, userId] },
                  ],
                }, // 지정 표현식 각 요소에 대해 평가하고 선택
              },
            },
          },
        },
      },
    ]);

    const total = await RestaurantModel.countDocuments();

    // region, category 값 가져오기
    let region, category;
    region = await RestaurantModel.distinct("region").exec();
    category = await RestaurantModel.distinct("category").exec();

    return { region, category, restaurant, total };
  }

  static async findById(_id, userId) {
    const restaurant = await RestaurantModel.findOne({ _id });

    const contactCheck = restaurant.contacts.filter(
      (contact) => contact.user._id.toString() === userId && contact.value === 1
    ).length;
    restaurant.set("contactCheck", contactCheck, { strict: false });

    return restaurant;
  }

  static async findBySearch({ filter, userId }) {
    return await RestaurantModel.aggregate([
      { $match: filter }, // 필요한 필터 조건을 추가하십시오. 예: { _id: postId }
      {
        $project: {
          _id: 1,
          category: 1,
          name: 1,
          region: 1,
          address: 1,
          tel: 1,
          description: 1,
          latitude: 1,
          longitude: 1,
          reservation: 1,
          contactCount: {
            $size: {
              $filter: {
                input: { $ifNull: ["$contacts", []] }, //필터링 할 배열소스
                cond: { $eq: ["$$this.value", 1] }, // 지정 표현식 각 요소에 대해 평가하고 선택
              },
            },
          },
          contactCheck: {
            $size: {
              $filter: {
                input: { $ifNull: ["$contacts", []] }, //필터링 할 배열소스
                cond: {
                  $and: [
                    { $eq: ["$$this.value", 1] },
                    { $eq: [{ $toString: "$$this.user" }, userId] },
                  ],
                }, // 지정 표현식 각 요소에 대해 평가하고 선택
              },
            },
          },
        },
      },
    ]);
  }

  // 찜하기 처리
  static async spotContact({ _id, userId }) {
    const filter = { _id, "contacts.user": userId }; // 찾을 문서의 필터 조건
    let restaurant = await RestaurantModel.findOne(filter); // 문서 찾기

    if (restaurant) {
      const currentValue = restaurant.contacts.filter(
        (contact) => contact.user.toString() === userId
      );

      currentValue[0].value = currentValue[0].value === 0 ? 1 : 0;
      await restaurant.save(); // 문서 업데이트
    } else {
      restaurant = await RestaurantModel.updateOne(
        { _id },
        {
          $push: {
            contacts: { user: userId },
            $position: 0,
          },
        }
      );
      restaurant = await RestaurantModel.findOne(filter);
    }
    return restaurant.contacts[0];
  }
}

export { Restaurant };
