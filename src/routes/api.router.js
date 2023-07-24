const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const stripe = require("stripe")(keys.stripeSecretKey);
const User = require("../models/user.model");

router.get("/user", isLoggedIn, async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findOne({ _id: req.user._id });
      res.send(user);
      return;
    }
    res.send(req.user);
  } catch (error) {
    console.log(error, "error");
    res.status(500).send("something went wrong");
  }
});

router.post("/stripe", isLoggedIn, async (req, res) => {
  stripe.customers
    .create({
      email: req.body.email,
      source: req.body.id,
    })
    .then((customer) =>
      stripe.paymentIntents.create({
        amount: 500,
        currency: "usd",
        description: "5$ for 5 credits",
        customer: customer.id,
      })
    )
    .then((charge) => console.log(charge, "charge"));

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { credits: req.user.credits + 5 },
    { new: true }
  );

  res.send(user);

  // ************** old code below **********
  // const data = await stripe.charge.create({
  //   amount: 500,
  //   currency: "usd",
  //   description: "10$ for 5 credits",
  //   source: req.body.id,
  // });

  // console.log(data, "data");
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
