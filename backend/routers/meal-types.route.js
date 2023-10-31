const express = require("express");

const mealTypesController = require("../controllers/meal-types.controller");

const router = express.Router();

router.get("/", mealTypesController.getMealTypes);

module.exports = router;
