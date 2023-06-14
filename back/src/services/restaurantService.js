import { Restaurant } from "../db/models/Restaurant";

class restaurantService {
  static async getFilteredRestaurant({ region, category, userId }) {
    const filter = {};
    if (region) filter.region = region;
    if (category) filter.category = category;

    return await Restaurant.findBySearch({ filter, userId });
  }

  static async getRestaurants({ page, userId }) {
    return await Restaurant.findAll({ page, userId });
  }

  static async getRestaurant(_id, userId) {
    return await Restaurant.findById(_id, userId);
  }

  static async updateContact({ _id, userId }) {
    return await Restaurant.spotContact({ _id, userId });
  }
}

export { restaurantService };
