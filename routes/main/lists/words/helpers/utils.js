const Word = require("../../../../models/Word");
const WordsRelation = require("../../../../models/WordsRelation");

const wordAdder = async (userId, columnTitle, columnWord) => {
  const wordFinder = async (columnTitle, columnWord, status) => {
    return await Word.findOne({
      word: columnWord,
      ColumnTitle: columnTitle,
      active: status
    });
  };

  let word = await wordFinder(columnTitle, columnWord, true);

  if (!word) {
    word = await wordFinder(columnTitle, columnWord, false);

    if (word) {
      return await Word.findByIdAndUpdate(
        word._id,
        {
          userId,
          lastEditedAt: Date.now(),
          active: true
        },
        { new: true }
      );
    }

    word = await new Word({
      word: columnWord,
      columnTitle: columnTitle,
      userId,
      active: true
    }).save();
  }

  return word;
};

const wordRelationFinder = async (
  userId,
  listRelationId,
  firstWord,
  secondWord,
  thirdWord,
  status
) => {
  return await WordsRelation.findOne({
    userId,
    listRelationId,
    firstWordId: firstWord._id,
    secondWordId: secondWord._id,
    thirdWordId: thirdWord._id,
    active: status
  });
};

module.exports = { wordAdder, wordRelationFinder };
