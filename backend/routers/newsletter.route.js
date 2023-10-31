const express = require("express");

const newsletterController = require("../controllers/newsletter.controller");

const router = express.Router();

router.post("/", newsletterController.addToNewsletter);

module.exports = router;
