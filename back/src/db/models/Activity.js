import { ActivityModel } from "../schemas/activity";

class Activity {
  static async findAll({ category }) {
    const filter = {};
    if (category) filter.category = category;
    const activity = await ActivityModel.find(filter);

    // category 값 가져오기
    let categories;
    categories = await ActivityModel.distinct("category").exec();

    return { categories, activity };
  }
}

export { Activity };
