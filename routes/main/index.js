const MainRouter = require("express").Router();

const isLoggedIn = require("../utils/isLoggedIn");

MainRouter.use("/user", require("./user"));
MainRouter.use("/lists", isLoggedIn, require("./lists"));

module.exports = MainRouter;
