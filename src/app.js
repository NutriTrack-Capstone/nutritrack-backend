const express = require('express');
const app = express();
const loginRoutes = require("./routes/loginRoutes")
const registerRoutes = require("./routes/registerRoutes")
const testingTokenRoutes = require("./routes/testingTokenRoutes")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", loginRoutes)
app.use("/", registerRoutes)
app.use("/", testingTokenRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));