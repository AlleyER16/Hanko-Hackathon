const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const MealsSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Meal name is required"],
      trim: true,
    },
    NumRatings: {
      type: Number,
      default: 0,
    },
    AvgRatings: {
      type: Number,
      default: 0,
    },
    Ingredients: [String],
    Price: {
      type: Number,
      required: [true, "Meal price is required"],
    },
    Calories: {
      type: Number,
      required: [true, "Meal calories is required"],
    },
    MealTypes: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "MealTypes",
      },
    ],
    Picture: String,
    Top: {
      type: Boolean,
      default: false,
    },
    DateAdded: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { collection: "Meals" },
);

// PLUG IN
MealsSchema.plugin(mongooseLeanVirtuals);

// VIRTUALS
MealsSchema.virtual("PicturePath").get(function () {
  if (!this.Picture) return undefined;

  return `${process.env.STATIC_FILES_URL}/meals/${this._id}/${this.Picture}`;
});

// PRE AND POST HOOKS

// hide __v
MealsSchema.pre(/^find/, function (next) {
  this.select("-__v");

  next();
});

exports.MealsModel = mongoose.model("Meals", MealsSchema);
