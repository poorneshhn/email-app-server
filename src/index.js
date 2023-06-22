const express = require("express");
const authRouter = require("./routes/authRoutes");
require("./services/passport");

// middlewares
app.use(express.json());
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
