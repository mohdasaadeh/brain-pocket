const MainRouter = require("express").Router();

MainRouter.use("/user", require("./user"));

module.exports = MainRouter;
