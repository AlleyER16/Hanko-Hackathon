const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    UserID: {
      type: String,
      required: [true, "User ID is required"],
      trim: true,
      unique: true,
    },
    DateAdded: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { collection: "Users" },
);

exports.UsersModel = mongoose.model("Users", UsersSchema);
