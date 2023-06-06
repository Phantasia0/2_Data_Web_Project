import { RestaurantModel } from "../schemas/restaurant";

class Restaurant {
  static async findAll(page) {
    const limit = 5; // 페이지당 보여줄 항목 수
    const skip = (page - 1) * limit;

    const restaurant = await RestaurantModel.find().skip(skip).limit(limit);

    // region, category 값 가져오기
    let region, category;
    region = await RestaurantModel.distinct("region").exec();
    category = await RestaurantModel.distinct("category").exec();

    return { region, category, restaurant };
  }

  static async findById(restaurantId) {
    return await RestaurantModel.findOne({ _id: restaurantId });
  }

  static async findBySearch(filter) {
    return await RestaurantModel.find(filter);
  }
}

export { Restaurant };
