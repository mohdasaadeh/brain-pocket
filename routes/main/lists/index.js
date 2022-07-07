const MainListsRouter = require("express").Router();

const errorHandler = require("../../utils/errorHandler");
const { listValidator } = require("../../utils/validator");

MainListsRouter.get("/", errorHandler(require("./getLists")));
MainListsRouter.get("/:id", errorHandler(require("./getList")));

MainListsRouter.post(
  "/new",
  listValidator,
  errorHandler(require("./postList"))
);

MainListsRouter.put(
  "/:id/edit",
  listValidator,
  errorHandler(require("./putList"))
);

MainListsRouter.delete("/:id/delete", errorHandler(require("./deleteList")));

MainListsRouter.use("/", require("./words"));

module.exports = MainListsRouter;
