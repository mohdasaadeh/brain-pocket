const ListRelation = require("../../../models/ListRelation");
const deleteListFunc = require("./helpers/deleteListFunc");
const postListFunc = require("./helpers/postListFunc");

// eslint-disable-next-line no-unused-vars
const putList = async (req, res, next) => {
  const list = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  let listRelation = await ListRelation.findOne({ userId, _id: id }).populate(
    "listId"
  );

  for (let column in list) {
    if (list[column] !== listRelation.listId[column]) {
      await deleteListFunc(userId, id);

      listRelation = await postListFunc(list, userId);

      res.send(listRelation);

      return;
    }
  }

  res.send(listRelation);
};

module.exports = putList;
