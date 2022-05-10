const deleteListFunc = require("./helpers/deleteListFunc");

const deleteList = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const listRelation = await deleteListFunc(userId, id);

  res.send(listRelation._id);
};

module.exports = deleteList;
