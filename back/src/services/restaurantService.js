import { Restaurant } from "../db/models/Restaurant";

class restaurantService {
  static async getFilteredRestaurant({ region, category }) {
    const filter = {};
    if (region) filter.region = region;
    if (category) filter.category = category;

    const data = await Restaurant.findBySearch(filter);

    return data;
  }

  static async getRestaurants(page) {
    const data = await Restaurant.findAll(page);

    return data;
  }

  static async getRestaurant(restaurant_id) {
    const data = await Restaurant.findById(restaurant_id);

    return data;
  }
}

export { restaurantService };
