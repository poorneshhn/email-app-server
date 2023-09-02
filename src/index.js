require("dotenv").config();
const express = require("express");
const passport = require("passport");
const { client_url } = require("./URLS");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
require("./db/mongoose");
require("./services/passport");

// app
const app = express();

// cors setup
const cors = require("cors");
const corsOptions = {
  credentials: true,
  origin: client_url,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// job
require("./jobs/reminderScan.job");

// routers
const apiRouter = require("./routes/api.router");

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
app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
