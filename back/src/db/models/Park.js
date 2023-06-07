import { ParkModel } from "../schemas/park";
import {RestaurantModel} from "../schemas/restaurant";

class Park {
  static async findAll(page) {
    const limit = 5; // 페이지당 보여줄 항목 수
    const skip = (page - 1) * limit;

    const park = await ParkModel.find().skip(skip).limit(limit);
    const total = await ParkModel.countDocuments();


    // region, category 값 가져오기
    let region, category;
    region = await ParkModel.distinct("region").exec();
    category = await ParkModel.distinct("category").exec();

    return { region, category, park ,total};
  }

  static async findById(parkId) {
    const park = await ParkModel.findOne({ _id: parkId });
    return park;
  }

  static async findBySearch(filter) {
    const park = await ParkModel.find(filter);
    return park;
  }
}

export { Park };
