const MainListsRouter = require("express").Router();

MainListsRouter.get("/", require("./getLists"));
MainListsRouter.get("/:id", require("./getList"));
MainListsRouter.get("/:id/original_words", require("./getOriginalWords"));

MainListsRouter.post("/new", require("./postList"));

MainListsRouter.put("/:id/edit", require("./putList"));

MainListsRouter.delete("/:id/delete", require("./deleteList"));

module.exports = MainListsRouter;
