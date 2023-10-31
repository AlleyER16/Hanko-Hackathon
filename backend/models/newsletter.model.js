const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    EmailAddress: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      unique: true,
    },
  },
  { collection: "Newsletter" },
);

exports.NewsletterModel = mongoose.model("Newsletter", NewsletterSchema);
