const ListRelation = require("../../../../models/ListRelation");
const Word = require("../../../../models/Word");
const WordsRelation = require("../../../../models/WordsRelation");

const wordFinder = async (columnTitle, columnWord, status) => {
  return await Word.find({
    word: columnWord,
    ColumnTitle: columnTitle,
    active: status
  });
};

const wordAdder = async (userId, columnTitle, columnWord) => {
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
    });
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
  return await WordsRelation.find({
    userId,
    listRelationId,
    firstWordId: firstWord._id,
    secondWordId: secondWord._id,
    thirdWordId: thirdWord._id,
    active: status
  });
};

// eslint-disable-next-line no-unused-vars
const postOriginalWord = async (req, res, next) => {
  const userId = req.user.id;
  const { listRelationId } = req.params;
  const { firstColumnWord, secondColumnWord, thirdColumnWord } = req.body;

  const { firstColumnTitle, secondColumnTitle, thirdColumnTitle } =
    await ListRelation.findById(
      listRelationId,
      "listId.firstColumnTitle listId.secondColumnTitle listId.thirdColumnTitle"
    ).populate("listId");

  const firstWord = await wordAdder(userId, firstColumnTitle, firstColumnWord);
  const secondWord = await wordAdder(
    userId,
    secondColumnTitle,
    secondColumnWord
  );
  const thirdWord = await wordAdder(userId, thirdColumnTitle, thirdColumnWord);

  let wordRelation = await wordRelationFinder(
    userId,
    listRelationId,
    firstWord,
    secondWord,
    thirdWord,
    true
  );

  if (!wordRelation) {
    wordRelation = await wordRelationFinder(
      userId,
      listRelationId,
      firstWord,
      secondWord,
      thirdWord,
      false
    );

    if (wordRelation) {
      wordRelation = await WordsRelation.findByIdAndUpdate(
        wordRelation._id,
        { editedAt: Date.now(), active: true },
        { new: true }
      );
    } else {
      wordRelation = await new WordsRelation({
        firstWordId: firstWord._id,
        secondWordId: secondWord._id,
        thirdWordId: thirdWord._id,
        listRelationId,
        userId,
        active: true
      });
    }
  }

  wordRelation = await WordsRelation.findById(wordRelation._id)
    .populate("firstWordId")
    .populate("secondWordId")
    .populate("thirdWordId");

  res.send(wordRelation);
};

module.exports = postOriginalWord;
