import { Activity } from "../db/models/Activity";

class activityService {
  static async getFilteredActivity({ category }) {
    const data = await Activity.findAll({ category });
    return data;
  }
}

export { activityService };
