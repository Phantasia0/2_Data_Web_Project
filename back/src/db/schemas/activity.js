import mongoose, { Schema, model } from "mongoose";

const ActivitySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    CO2_reduction: {
      type: String,
      required: true,
    },
    cost_reduction: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tree_effect: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ActivityModel = model("Activity", ActivitySchema);

export { ActivityModel };
