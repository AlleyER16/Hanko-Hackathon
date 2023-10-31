const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const { MealsModel } = require("../models/meals.model");
const { OrdersModel } = require("../models/orders.model");
const { TransactionsModel } = require("../models/transactions.model");

const catchAsync = require("../utils/catch-async.util");
const { sanitizePayload } = require("../utils/functions.utils");
const AppError = require("../utils/app-error.util");

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await OrdersModel.find({
    User: req.user._id,
    Status: { $ne: "PENDING-PAYMENT" },
  }).sort("-DateCreated");

  res.json({
    status: "success",
    message: "Orders fetched successfully",
    data: orders,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  let { meals, shippingInfo } = req.body;

  if (!Array.isArray(meals) || typeof shippingInfo !== "object")
    return next(new AppError("Invalid data provided", StatusCodes.BAD_REQUEST));

  // meals validation
  let mealsAmount = 0;

  meals = await Promise.all(
    meals.map(async (meal) => {
      if (
        (!meal._id || !mongoose.Types.ObjectId.isValid(meal._id)) &&
        (!meal.quantity || Number.isNaN(+meal.quantity) || +meal.quantity < 1)
      )
        throw new AppError("Invalid data provided", StatusCodes.BAD_REQUEST);

      const mealData = await MealsModel.findById(meal._id);
      if (!mealData)
        throw new AppError("Invalid data provided", StatusCodes.BAD_REQUEST);

      mealsAmount += +meal.quantity * mealData.Price;

      return {
        Meal: mealData._id,
        Quantity: +meal.quantity,
        Amount: mealData.Price,
        TotalAmount: +meal.quantity * mealData.Price,
        Reviewed: false,
      };
    }),
  );

  // shipping information validation
  shippingInfo = sanitizePayload(shippingInfo, [
    "Name",
    "Telephone",
    "Address",
    "ExtraInstructions",
  ]);

  if (!shippingInfo.Name || !shippingInfo.Telephone || !shippingInfo.Address)
    return next(
      new AppError(
        "Incomplete shipping information provided",
        StatusCodes.BAD_REQUEST,
      ),
    );

  const totalAmount = mealsAmount + +process.env.DELIVERY_FEE;

  const orderData = {
    User: req.user._id,
    MealsAmount: mealsAmount,
    Meals: meals,
    DeliveryFee: +process.env.DELIVERY_FEE,
    ShippingInformation: shippingInfo,
    TotalAmount: totalAmount,
  };

  const order = await OrdersModel.create(orderData);

  // creating transaction
  const transaction = await TransactionsModel.create({
    Order: order._id,
    Amount: totalAmount,
  });

  transaction.PaystackRefID = `order__${transaction._id}`;
  await transaction.save();

  res.json({
    status: "success",
    message: "Order created successfully",
    data: { transaction, email: "rehobothmicahdaniels@gmail.com" },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const { id: orderId } = req.params;

  const order = await OrdersModel.findOne({
    _id: orderId,
    User: req.user._id,
  })
    .populate({ path: "Meals.Meal" })
    .lean({ virtuals: true });
  if (!order)
    return next(new AppError("Error identifying order", StatusCodes.NOT_FOUND));

  res.json({
    status: "success",
    message: "Order fetched successfully",
    data: order,
  });
});

exports.validateOrder = catchAsync(async (req, res, next) => {
  const { id: orderId } = req.params;

  const order = await OrdersModel.findOne({
    _id: orderId,
    User: req.user._id,
  }).select("Status");
  if (!order)
    return next(
      new AppError("Error identifying order", StatusCodes.BAD_REQUEST),
    );

  return res.json({
    status: "success",
    message: "Information returned",
    data: order.Status === "IN-PROGRESS",
  });
});
