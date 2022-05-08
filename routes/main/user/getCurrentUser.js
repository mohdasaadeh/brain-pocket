const getCurrentUser = (req, res, next) => {
  if (req.user) {
    const { id } = req.user;

    return res.send(id);
  }

  res.send(null);
};

module.exports = getCurrentUser;
