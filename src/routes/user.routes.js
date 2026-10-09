const express = require("express");

const router = express.Router();

const { requireAuth } = require("../middlewares/auth");
const { getProfile } = require("../controllers/user.controllers");

router.get("/profile", requireAuth, getProfile);

module.exports = router;
