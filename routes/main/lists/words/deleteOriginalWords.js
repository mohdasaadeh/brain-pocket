const WordsRelation = require("../../../../models/WordsRelation");
const Word = require("../../../../models/Word");

// eslint-disable-next-line no-unused-vars
const deleteOriginalWords = async (req, res, next) => {
  const { listRelationId, id } = req.params;
  const userId = req.user.id;

  const wordRelation = await WordsRelation.findOneAndUpdate(
    { _id: id, userId, listRelationId },
    { active: false },
    { new: true }
  ).lean();

  const searchItems = ["firstWordId", "secondWordId", "thirdWordId"];

  const words = Object.entries(wordRelation).filter(entry => {
    return (
      entry[searchItems[0]] || entry[searchItems[1]] || entry[searchItems[2]]
    );
  });

  for (let word of words) {
    const wordId = Object.values(word)[0];

    let wordRelations;

    for (let item of searchItems) {
      wordRelations = await WordsRelation.find({ [item]: wordId });

      if (wordRelations) break;
    }

    if (!wordRelations) {
      await Word.findByIdAndUpdate(wordId, { active: false });
    }
  }

  res.send(wordRelation._id);
};

module.exports = deleteOriginalWords;
