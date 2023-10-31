const express = require("express");

const hooksController = require("../controllers/hooks.controller");

const router = express.Router();

router.post("/paystack", hooksController.paystackHook);

module.exports = router;
