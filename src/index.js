const express = require("express");
const authRouter = require("./routes/authRouter");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
require("./db/mongoose");
require("./services/passport");

const app = express();

// middlewares
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
