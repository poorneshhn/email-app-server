const express = require("express");
const passport = require("passport");
const { client_url } = require("../URLS");
const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // res.setHeader(
  //   "Set-Cookie",
  //   cookie.serialize("XSRF-TOKEN", req.user, {
  //     // XSRF-TOKEN is the name of your cookie
  //     sameSite: "lax", // lax is important, don't use 'strict' or 'none'
  //     httpOnly: true, // must be true in production
  //     path: "/",
  //     secure: true, // must be true in production
  //     maxAge: 60 * 60 * 24 * 7 * 52, // 1 year
  //     // domain: process.env.ENVIRONMENT === "development" ? "" : `.example.com`,
  //     domain: client_url,
  //     // the period before is important and intentional
  //   })
  // );
  res.redirect(client_url);
});

module.exports = router;
