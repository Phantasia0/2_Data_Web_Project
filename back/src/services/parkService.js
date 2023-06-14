import { Park } from "../db/models/Park";

class parkService {
  static async getFilteredPark({ region, userId }) {
    const filter = {};
    if (region) filter.region = region;

    return await Park.findBySearch({ filter, userId });
  }

  static async getParks({ page, userId }) {
    return await Park.findAll({ page, userId });
  }

  static async getPark(_id, userId) {
    return await Park.findById(_id, userId);
  }

  static async updateContact({ _id, userId }) {
    return await Park.spotContact({ _id, userId });
  }
}

export { parkService };
