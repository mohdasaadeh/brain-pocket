const MainRouter = require("express").Router();

MainRouter.use("/user", require("./user"));
MainRouter.use("/lists", require("./lists"));

module.exports = MainRouter;
