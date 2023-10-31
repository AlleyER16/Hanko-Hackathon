const { MealTypesModel } = require("../models/meal-types.model");

const catchAsync = require("../utils/catch-async.util");

exports.getMealTypes = catchAsync(async (req, res, next) => {
  const mealTypes = await MealTypesModel.find({}).select("Name");

  return res.json({
    status: "success",
    message: "Meal types fetched successfully",
    data: mealTypes,
  });
});
