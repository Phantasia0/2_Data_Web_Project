export interface ActivityData {
  categoryAll: string[];
  activity: Activity[];
}

export interface Activity {
  _id: string;
  category: string;
  name: string;
  CO2_reduction: string;
  cost_reduction: number;
  tree_effect: number;
  icon: string;
  region: string;
}
