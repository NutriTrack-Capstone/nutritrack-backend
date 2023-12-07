const express = require("express")
const router = express.Router()

const { test } = require("../controllers/testingController")
const { authMiddleware } = require("../middlewares/authMiddleware")

// router.use(authMiddleware)
// router.get("/testing", test)
router.get("/testing", authMiddleware, test)

module.exports = router

