const WordsRelation = require("../../../../models/WordsRelation");

// eslint-disable-next-line no-unused-vars
const getOriginalWord = async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  const wordRelation = await WordsRelation.findOne({
    _id: id,
    userId,
    active: true
  })
    .populate("firstWordId")
    .populate("secondWordId")
    .populate("thirdWordId");

  res.send(wordRelation);
};

module.exports = getOriginalWord;
