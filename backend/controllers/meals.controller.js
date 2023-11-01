const { default: mongoose } = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const { MealsModel } = require("../models/meals.model");

const catchAsync = require("../utils/catch-async.util");
const AppError = require("../utils/app-error.util");
const { getPagination, getSkip } = require("../utils/functions.utils");

exports.getMeals = catchAsync(async (req, res, next) => {
  const {
    search,
    mealType,
    minPrice,
    maxPrice,
    top,
    page: pg,
    division: div,
  } = req.query;

  const page = !Number.isNaN(+pg) ? +pg : 1;
  const division = !Number.isNaN(+div) ? +div : 12;

  const filterData = {};

  if (search) filterData.Name = new RegExp(search, "i");

  if (top) filterData.Top = true;

  if (mealType && mongoose.Types.ObjectId.isValid(mealType))
    filterData.MealTypes = new mongoose.Types.ObjectId(mealType);

  if (minPrice && !maxPrice) {
    const price = +minPrice;
    if (!Number.isNaN(price)) filterData.MinPrice = { $gte: price };
  }

  if (maxPrice && !minPrice) {
    const price = +maxPrice;
    if (!Number.isNaN(price)) filterData.MinPrice = { $lte: price };
  }

  if (minPrice && maxPrice) {
    const min = +minPrice;
    const max = +maxPrice;

    if (!Number.isNaN(min) && !Number.isNaN(max))
      filterData.MinPrice = { $gte: min, $lte: max };
  }

  const numRecords = await MealsModel.find(filterData).countDocuments();
  const pagination = getPagination(numRecords, division);
  const skip = getSkip(page, division);

  const meals = await MealsModel.find(filterData)
    .select("Name AvgRatings Price Picture Calories")
    .skip(skip)
    .limit(division)
    .sort("-DateAdded")
    .lean({ virtuals: ["PicturePath"] });

  res.json({
    status: "success",
    message: "Meals fetched successfully",
    meta_data: { num_records: numRecords, page, division, pagination },
    data: meals,
  });
});

exports.getMeal = catchAsync(async (req, res, next) => {
  const { id: mealId } = req.params;

  const meal = await MealsModel.findById(mealId)
    .select("-DateAdded -Top")
    .populate({ path: "MealTypes", select: "Name" })
    .lean({ virtuals: ["PicturePath"] });
  if (!meal)
    return next(new AppError("Meal not found", StatusCodes.BAD_REQUEST));

  const similarMeals = await MealsModel.find({
    _id: { $ne: meal._id },
    MealTypes: {
      $elemMatch: { $in: meal.MealTypes.map((mealType) => mealType._id) },
    },
  })
    .select("Name AvgRatings Price Picture")
    .limit(4)
    .sort("-DateAdded")
    .lean({ virtuals: ["PicturePath"] });

  meal.SimilarMeals = similarMeals;

  res.json({
    status: "success",
    message: "Meal fetched successfully",
    data: meal,
  });
});
