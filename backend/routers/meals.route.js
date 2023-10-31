const express = require("express");

const mealsController = require("../controllers/meals.controller");

const router = express.Router();

router.get("/", mealsController.getMeals);

router.get("/:id", mealsController.getMeal);

module.exports = router;
