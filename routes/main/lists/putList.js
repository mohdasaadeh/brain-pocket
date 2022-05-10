const deleteListFunc = require("./helpers/deleteListFunc");
const postListFunc = require("./helpers/postListFunc");

const putList = async (req, res, next) => {
  const list = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  await deleteListFunc(userId, id);

  const listRelation = await postListFunc(list, userId);

  res.send(listRelation);
};

module.exports = putList;
