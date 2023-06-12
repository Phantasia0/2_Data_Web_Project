import { Restaurant } from "../db/models/Restaurant";

class restaurantService {
  static async getFilteredRestaurant({ region, category }) {
    const filter = {};
    if (region) filter.region = region;
    if (category) filter.category = category;

    return await Restaurant.findBySearch(filter);
  }

  static async getRestaurants(page) {
    return await Restaurant.findAll(page);
  }

  static async getRestaurant(restaurant_id) {
    return await Restaurant.findById(restaurant_id);
  }
}

export { restaurantService };
