import { ParkModel } from "../schemas/park";
import { LIMIT } from "../../lib/constant";

class Park {
  static async findAll(page) {
    const skip = (page - 1) * LIMIT;

    const park = await ParkModel.find().skip(skip).limit(LIMIT);
    const total = await ParkModel.countDocuments();

    // region, category 값 가져오기
    let region, category;
    region = await ParkModel.distinct("region").exec();
    category = await ParkModel.distinct("category").exec();

    return { region, category, park, total };
  }

  static async findById(parkId) {
    return await ParkModel.findOne({ _id: parkId });
  }

  static async findBySearch(filter) {
    return await ParkModel.find(filter);
  }
}

export { Park };
