const MainListsRouter = require("express").Router();

MainListsRouter.get("/", require("./getLists"));

module.exports = MainListsRouter;
