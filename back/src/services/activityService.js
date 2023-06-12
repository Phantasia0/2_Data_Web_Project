import { Activity } from "../db/models/Activity";

class activityService {
  static async getFilteredActivity({ category }) {
    return await Activity.findAll({ category });
  }
}

export { activityService };
