require("../../../models/List");
require("../../../models/Word");
const ListRelation = require("../../../models/ListRelation");
const WordsRelation = require("../../../models/WordsRelation");

// eslint-disable-next-line no-unused-vars
const getList = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const listRelation = await ListRelation.findOne(
    { _id: id, userId, active: true },
    "listId"
  )
    .populate("listId")
    .lean();

  const words = await WordsRelation.find({
    listRelationId: listRelation._id,
    userId,
    active: true
  });

  listRelation.wordsCount = words.length;

  res.send(listRelation);
};

module.exports = getList;
