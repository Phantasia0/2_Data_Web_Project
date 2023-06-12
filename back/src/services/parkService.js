import { Park } from "../db/models/Park";

class parkService {
  static async getFilteredPark({ region }) {
    const filter = {};
    if (region) filter.region = region;

    return await Park.findBySearch(filter);
  }

  static async getParks(page) {
    return await Park.findAll(page);
  }

  static async getPark(park_id) {
    return await Park.findById(park_id);
  }
}

export { parkService };
