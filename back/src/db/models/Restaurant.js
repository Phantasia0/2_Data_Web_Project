import { RestaurantModel } from "../schemas/restaurant";

class Restaurant {
  static async findAll() {
    const restaurant = await RestaurantModel.find();

    // region, category 값 가져오기
    let region, category;
    region = await RestaurantModel.distinct("region").exec();
    category = await RestaurantModel.distinct("category").exec();

    return { region, category, restaurant };
  }

  static async findById(restaurantId) {
    const restaurant = await RestaurantModel.findOne({ restaurantId });
    return restaurant;
  }

  static async findBySearch(filter) {
    console.log(filter);
    const restaurant = await RestaurantModel.find(filter);
    return restaurant;
  }
}

export { Restaurant };
