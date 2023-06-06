import { Park } from "../db/models/Park";

class parkService {
  static async getFilteredPark({ region }) {
    const filter = {};
    if (region) filter.region = region;

    const data = await Park.findBySearch(filter);

    return data;
  }

  static async getParks(page) {
    const data = await Park.findAll(page);

    return data;
  }

  static async getPark(park_id) {
    const data = await Park.findById(park_id);

    return data;
  }
}

export { parkService };
