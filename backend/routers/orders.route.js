const express = require("express");

const authController = require("../controllers/auth.controller");
const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router
  .route("/")
  .get(authController.userAuth, ordersController.getOrders)
  .post(authController.userAuth, ordersController.createOrder);

router.get("/:id", authController.userAuth, ordersController.getOrder);

router.get(
  "/:id/validate",
  authController.userAuth,
  ordersController.validateOrder,
);

module.exports = router;
