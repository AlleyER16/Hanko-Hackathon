const validator = require("validator");
const { StatusCodes } = require("http-status-codes");

const { NewsletterModel } = require("../models/newsletter.model");

const AppError = require("../utils/app-error.util");
const catchAsync = require("../utils/catch-async.util");

exports.addToNewsletter = catchAsync(async (req, res, next) => {
  const { Name, EmailAddress } = req.body;

  if (!Name || !EmailAddress)
    return next(new AppError("Fill in all fields", StatusCodes.BAD_REQUEST));

  if (!validator.isEmail(EmailAddress))
    return next(
      new AppError("Provide a valid email address", StatusCodes.BAD_REQUEST),
    );

  if (!(await NewsletterModel.find({ EmailAddress }).countDocuments())) {
    await NewsletterModel.create({ Name, EmailAddress });
  }

  return res.json({
    status: "success",
    message: "Newsletter subscription successful",
  });
});
