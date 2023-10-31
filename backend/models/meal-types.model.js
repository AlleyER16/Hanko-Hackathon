const mongoose = require("mongoose");

const MealTypesSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Meal type name is required"],
      trim: true,
    },
    DateAdded: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { collection: "MealTypes" },
);

exports.MealTypesModel = mongoose.model("MealTypes", MealTypesSchema);
