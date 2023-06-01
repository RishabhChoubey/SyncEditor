const {
  signin,
  register,
  check,
  forget,
  verifyToken,
  refresh,
  logout,
} = require("../controller/UserController");
const express = require("express");
const { isAuth } = require("../utility/util");
const { verify } = require("jsonwebtoken");
const router = express.Router();

router.post("/signin", signin);
router.post("/forget", forget);
router.get("/refresh",refresh)
router.get("/logout",logout)
router.get("/verify/:token", verifyToken);
router.post("/register", register);
router.get("/", isAuth, check);
module.exports = router;
