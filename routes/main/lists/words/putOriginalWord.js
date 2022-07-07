const WordsRelation = require("../../../../models/WordsRelation");

const postOriginalWordFunc = require("./helpers/postOriginalWordFunc");

// eslint-disable-next-line no-unused-vars
const putOriginalWord = async (req, res, next) => {
  const userId = req.user.id;
  const { listRelationId, id } = req.params;
  const formData = req.body;

  let wordRelation = await WordsRelation.findById(id)
    .populate("firstWordId")
    .populate("secondWordId")
    .populate("thirdWordId");

  wordRelation = {
    firstColumnWord: wordRelation.firstWordId.word,
    secondColumnWord: wordRelation.secondWordId.word,
    thirdColumnWord: wordRelation.thirdWordId.word
  };

  if (JSON.stringify(req.body) === JSON.stringify(wordRelation)) {
    wordRelation = await WordsRelation.findByIdAndUpdate(
      id,
      { editedAt: Date.now() },
      { new: true }
    );

    return res.send(wordRelation);
  } else {
    await WordsRelation.findByIdAndUpdate(id, { active: false });
  }

  wordRelation = await postOriginalWordFunc(userId, listRelationId, formData);

  res.send(wordRelation);
};

module.exports = putOriginalWord;
