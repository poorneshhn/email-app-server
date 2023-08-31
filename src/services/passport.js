const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const { callback_url } = require("../URLS");
require("../models/user.model");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById({ _id: id }).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: `${callback_url}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, "accessToken");
      console.log(refreshToken, "refreshToken");
      console.log(profile, "profile");
      //   done(null, profile);
      User.findOne({ googleID: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleID: profile.id,
            picture: profile.picture,
            email: profile.email,
            name: profile.displayName,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            })
            .catch((err) => {
              done(err);
            });
        }
      });
    }
  )
);
