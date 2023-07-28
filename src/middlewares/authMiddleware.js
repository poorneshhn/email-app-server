const requireLogin = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({ error: "Please login" });
    return;
  }
  next();
};

module.exports = {
  requireLogin,
};
