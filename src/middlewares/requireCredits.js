const requireCredits = (req, res, next) => {
  if (req.user.credits < 1) {
    res.status(403).send({ error: "Not enough credits!" });
    return;
  }
  next();
};

module.exports = {
  requireCredits,
};
