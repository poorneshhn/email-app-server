const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const { requireLogin } = require("../middlewares/authMiddleware");
const stripe = require("stripe")(keys.stripeSecretKey);
const User = require("../models/user.model");
const surveyRouter = require("./survey.router");
const reminderRouter = require("./reminder.router");

router.use("/surveys", surveyRouter);

router.get("/user", requireLogin, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error, "error");
    res.status(500).send("something went wrong");
  }
});

router.post("/stripe", requireLogin, async (req, res) => {
  try {
    if (req.user.email !== req.body.email) {
      throw new Error("Something went wrong!");
    }
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
  } catch (error) {
    console.log(error, "error while creating stripe payment");
    res.status(500).send(error.message);
  }
});

router.get("/logout", requireLogin, (req, res) => {
  req.logout();
  res.redirect("/");
});

router.use("/reminder", requireLogin, reminderRouter);

module.exports = router;
