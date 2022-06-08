const MainListsRouter = require("express").Router();

const errorHandler = require("../../utils/errorHandler");
const { listValidator } = require("../../utils/validator");

MainListsRouter.get("/", errorHandler(require("./getLists")));
MainListsRouter.get("/:id", errorHandler(require("./getList")));
MainListsRouter.get(
  "/:id/original_words",
  errorHandler(require("./getOriginalWords"))
);

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

module.exports = MainListsRouter;
