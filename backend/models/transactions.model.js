const mongoose = require("mongoose");

const TransactionsSchema = new mongoose.Schema(
  {
    Order: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Orders",
    },
    PaystackRefID: {
      type: String,
      required: false,
      trim: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    Verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    DateVerified: {
      type: Date,
      required: false,
    },
    DateCreated: {
      type: Date,
      required: true,
      default: () => Date.now(),
    },
  },
  { collection: "Transactions" },
);

const TransactionsModel = mongoose.model("Transactions", TransactionsSchema);

module.exports = { TransactionsModel };
