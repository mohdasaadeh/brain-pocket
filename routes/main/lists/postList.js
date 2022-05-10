const postListFunc = require("./helpers/postListFunc");

const postList = async (req, res, next) => {
  const list = req.body;
  const userId = req.user.id;

  const listRelation = await postListFunc(list, userId);

  res.send(listRelation);
};

module.exports = postList;
