const express = require('express');
const app = express();
const loginRoutes = require("./routes/loginRoutes")
const registerRoutes = require("./routes/registerRoutes")
const recommendationRoutes = require("./routes/recommendationRoutes")
const testingTokenRoutes = require("./routes/testingTokenRoutes")
const userProfileRoutes = require("./routes/userProfileRoutes")
const foodRoutes = require("./routes/foodRoutes");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", loginRoutes)
app.use("/", registerRoutes)
app.use("/", recommendationRoutes)
app.use("/", testingTokenRoutes)
app.use("/", userProfileRoutes)
app.use("/", foodRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));