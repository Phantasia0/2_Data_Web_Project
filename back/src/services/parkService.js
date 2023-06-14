import { Park } from "../db/models/Park";

class parkService {
  static async getFilteredPark({ page, region, userId }) {
    if (!page) page = 1;
    const filter = {};
    if (region) filter.region = region;

    return await Park.findBySearch({ page, filter, userId });
  }

  static async getParks({ page, userId }) {
    if (!page) page = 1;
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
