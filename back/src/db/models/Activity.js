import { ActivityModel } from "../schemas/activity";

class Activity {
  static async findAll() {
    const activity = await ActivityModel.find();

    // region, category 값 가져오기
    let category;
    category = await ActivityModel.distinct("category").exec();

    return { category, activity };
  }

}

export { Activity };
