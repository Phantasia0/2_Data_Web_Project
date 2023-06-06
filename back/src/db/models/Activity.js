import { ActivityModel } from "../schemas/activity";

class Activity {
  static async findAll({ category }) {
    const activity = await ActivityModel.find({ category });

    // category 값 가져오기
    let categoryAll;
    categoryAll = await ActivityModel.distinct("category").exec();

    return { categoryAll, activity };
  }
}

export { Activity };
