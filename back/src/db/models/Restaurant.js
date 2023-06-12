import { RestaurantModel } from "../schemas/restaurant";
import { LIMIT } from "../../lib/constant";

class Restaurant {
  static async findAll(page) {
    const skip = (page - 1) * LIMIT;

    const restaurant = await RestaurantModel.find().skip(skip).limit(LIMIT);
    const total = await RestaurantModel.countDocuments();

    // region, category 값 가져오기
    let region, category;
    region = await RestaurantModel.distinct("region").exec();
    category = await RestaurantModel.distinct("category").exec();

    return { region, category, restaurant, total };
  }

  static async findById(restaurantId) {
    return await RestaurantModel.findOne({ _id: restaurantId });
  }

  static async findBySearch(filter) {
    return await RestaurantModel.find(filter);
  }
}

export { Restaurant };
