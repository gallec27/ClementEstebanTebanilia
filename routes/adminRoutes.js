const express = require("express");
const { renderProfile } = require("../controllers/profileControllers");

const router = express.Router();

router.get("/profile", renderProfile);

module.exports = router;