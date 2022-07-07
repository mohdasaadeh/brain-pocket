const ListRelation = require("../../../../models/ListRelation");
const WordsRelation = require("../../../../models/WordsRelation");

// eslint-disable-next-line no-unused-vars
const getOriginalWords = async (req, res, next) => {
  const { listRelationId } = req.params;
  const userId = req.user.id;

  const listRelation = await ListRelation.findOne({
    _id: listRelationId,
    active: true
  });
  const wordsRelation = await WordsRelation.find({
    listRelationId: listRelation._id,
    userId,
    active: true
  })
    .populate("firstWordId")
    .populate("secondWordId")
    .populate("thirdWordId")
    .sort({ createdAt: "desc" });

  res.send(wordsRelation);
};

module.exports = getOriginalWords;
