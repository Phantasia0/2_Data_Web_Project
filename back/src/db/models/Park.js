import { ParkModel } from "../schemas/park";

class Park {
  static async findAll() {
    const park = await ParkModel.find();

    // region, category 값 가져오기
    let region, category;
    region = await ParkModel.distinct("region").exec();
    category = await ParkModel.distinct("category").exec();

    return { region, category, park };
  }

  static async findById(parkId) {
    const park = await ParkModel.findOne({ parkId });
    return park;
  }

  static async findBySearch(filter) {
    const park = await ParkModel.find(filter);
    return park;
  }
}

export { Park };
