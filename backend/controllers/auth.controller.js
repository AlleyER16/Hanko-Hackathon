const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/app-error.util");
const catchAsync = require("../utils/catch-async.util");
const { UsersModel } = require("../models/users.model");

exports.userAuth = catchAsync(async (req, res, next) => {
  if (!req.auth.sub)
    return next(new AppError("unauthorized", StatusCodes.BAD_REQUEST));

  let user = await UsersModel.findOne({ UserID: req.auth.sub });

  if (!user) user = await UsersModel.create({ UserID: req.auth.sub });

  req.user = user;

  next();
});
