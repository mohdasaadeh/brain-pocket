require("../../../models/List");
require("../../../models/Word");
const ListRelation = require("../../../models/ListRelation");
const WordsRelation = require("../../../models/WordsRelation");

const getList = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const list = await ListRelation.findOne(
    { _id: id, userId, active: true },
    "listId"
  )
    .populate("listId")
    .lean();

  if (!list) return next("You didn't add this list!");

  const words = await WordsRelation.find({
    listId: list.listId._id,
    userId,
    active: true,
  });

  list.wordsCount = words.length;

  res.send(list);
};

module.exports = getList;
