const index = (req, res, next) => {
  res.send("<h1>Index</h1>");
};

module.exports = function (app) {
  app.use("/", require("./main"));

  app.get("/", index);
};
