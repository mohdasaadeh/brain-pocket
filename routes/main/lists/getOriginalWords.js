const ListRelation = require("../../../models/ListRelation");
const WordsRelation = require("../../../models/WordsRelation");

const getOriginalWords = async (req, res, next) => {
  const listRelationId = req.params.id;
  const userId = req.user.id;

  const listRelation = await ListRelation.findOne({
    _id: listRelationId,
    active: true
  });
  const words = await WordsRelation.find({
    listId: listRelation.listId,
    userId,
    active: true
  })
    .populate("firstWordId")
    .populate("secondWordId")
    .populate("thirdWordId")
    .sort({ createdAt: "desc" });

  res.send(words);
};

module.exports = getOriginalWords;
