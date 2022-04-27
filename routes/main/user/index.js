const MainUserRouter = require("express").Router();

MainUserRouter.use("/login/google", require("./google"));

module.exports = MainUserRouter;
