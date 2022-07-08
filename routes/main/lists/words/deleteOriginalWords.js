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
  )
    .select("firstWordId secondWordId thirdWordId")
    .lean();

  for (let word in wordRelation) {
    if (word !== "_id") {
      let wordRelations;

      for (let key in wordRelation) {
        wordRelations = await WordsRelation.findOne({
          [key]: wordRelation[word],
          active: true
        });

        if (wordRelations) break;
      }

      console.log(wordRelations);

      if (!wordRelations) {
        await Word.findByIdAndUpdate(wordRelation[word], { active: false });
      }
    }
  }

  res.send(wordRelation._id);
};

module.exports = deleteOriginalWords;
