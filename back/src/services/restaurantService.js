import { Restaurant } from "../db/models/Restaurant";

class restaurantService {
  static async getFilteredRestaurant({ page, region, category, userId }) {
    if (!page) page = 1;
    const filter = {};
    if (region) filter.region = region;
    if (category) filter.category = category;

    return await Restaurant.findBySearch({ page, filter, userId });
  }

  static async getRestaurants({ page, userId }) {
    if (!page) page = 1;
    return await Restaurant.findAll({ page, userId });
  }

  static async getRestaurant(_id, userId) {
    return await Restaurant.findById(_id, userId);
  }

  static async updateContact({ _id, userId }) {
    return await Restaurant.spotContact({ _id, userId });
  }

  static async getRestaurantNotContact({ page, userId }) {
    if (!page) page = 1;
    return await Restaurant.findNotContact({ page, userId });
  }

  static async getFilteredRestaurantNotContact({
    page,
    region,
    category,
    userId,
  }) {
    if (!page) page = 1;
    const filter = {};
    if (region) filter.region = region;
    if (category) filter.category = category;

    return await Restaurant.findBySearchNotContact({ page, filter, userId });
  }
}

export { restaurantService };
