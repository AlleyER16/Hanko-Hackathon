const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const OrdersSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Types.ObjectId,
      required: [true, "User is required"],
      ref: "Users",
    },
    MealsAmount: {
      type: Number,
      required: [true, "Meals amount is required"],
    },
    Meals: [
      {
        Meal: {
          type: mongoose.Types.ObjectId,
          required: [true, "Meal is required"],
          ref: "Meals",
        },
        Quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
        Amount: {
          type: Number,
          required: [true, "Quantity is required"],
        },
        TotalAmount: {
          type: Number,
          required: [true, "Total amount is required"],
        },
        Reviewed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    DeliveryFee: Number,
    ShippingInformation: {
      Name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
      },
      Telephone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
      },
      Address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },
      ExtraInstructions: {
        type: String,
        trim: true,
      },
    },
    TotalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    Transaction: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Transactions",
    },
    Status: {
      type: String,
      enum: {
        values: ["PENDING-PAYMENT", "IN-PROGRESS", "DELIVERED", "CANCELED"],
        message: `{VALUE} is not a valid status`,
      },
      default: "PENDING-PAYMENT",
    },
    DateCreated: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { collection: "Orders" },
);

// plugin
OrdersSchema.plugin(mongooseLeanVirtuals);

// PRE AND POST HOOKS

// hide __v
OrdersSchema.pre(/^find/, function (next) {
  this.select("-__v");

  next();
});

exports.OrdersModel = mongoose.model("Orders", OrdersSchema);
