const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");

    return;
  }

  next();
};

module.exports = isLoggedIn;
