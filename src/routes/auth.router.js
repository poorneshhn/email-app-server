const express = require("express");
const passport = require("passport");
const { redirect_url } = require("../URLS");
const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect(redirect_url);
});

module.exports = router;
