require("../../../models/List");
require("../../../models/Word");
const ListRelation = require("../../../models/ListRelation");
const WordsRelation = require("../../../models/WordsRelation");

const getList = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const isListActive = await ListRelation.findOne({ listId: id, active: true });

  if (!isListActive) return next("You didn't add this list!");

  const words = await WordsRelation.find({ listId: id, userId, active: true })
    .populate("listId")
    .populate("firstWordId")
    .populate("secondWordId");

  res.send(words);
};

module.exports = getList;
