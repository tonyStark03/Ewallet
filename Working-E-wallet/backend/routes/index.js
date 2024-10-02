const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./accounts");
require('dotenv').config();
router.use("/user",userRouter)
router.use("/account",accountRouter)
console.log(process.env.JWT_SECRET)


module.exports = router;