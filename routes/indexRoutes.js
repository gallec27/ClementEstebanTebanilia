const express = require("express");

const { 
    renderIndex, 
   
} = require("../controllers/indexControllers.js");

const router = express.Router();

router.get("/", renderIndex);

module.exports = router;