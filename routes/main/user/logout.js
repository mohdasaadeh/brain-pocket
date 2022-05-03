const logout = (req, res, next) => {
  req.logout();

  res.redirect("/");
};

module.exports = logout;
