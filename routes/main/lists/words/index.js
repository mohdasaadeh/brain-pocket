const MainListsWordsRouter = require("express").Router();

const errorHandler = require("../../../utils/errorHandler");

MainListsWordsRouter.get(
  "/:listRelationId/original_words",
  errorHandler(require("./getOriginalWords"))
);

MainListsWordsRouter.delete(
  "/:listRelationId/original_words/:id/delete",
  errorHandler(require("./deleteOriginalWords"))
);

module.exports = MainListsWordsRouter;
