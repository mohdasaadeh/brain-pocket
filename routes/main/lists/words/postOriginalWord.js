const postOriginalWordFunc = require("./helpers/postOriginalWordFunc");

// eslint-disable-next-line no-unused-vars
const postOriginalWord = async (req, res, next) => {
  const userId = req.user.id;
  const { listRelationId } = req.params;
  const formData = req.body;

  const wordRelation = await postOriginalWordFunc(
    userId,
    listRelationId,
    formData
  );

  res.send(wordRelation);
};

module.exports = postOriginalWord;
