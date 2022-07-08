const ListRelation = require("../../../../../models/ListRelation");
const WordsRelation = require("../../../../../models/WordsRelation");

const { wordAdder, wordRelationFinder } = require("./utils");
const CustomError = require("../../../../utils/CustomError");

const postOriginalWordFunc = async (userId, listRelationId, formData) => {
  const { firstColumnWord, secondColumnWord, thirdColumnWord } = formData;

  const listRelation = await ListRelation.findById(listRelationId).populate(
    "listId"
  );

  const { firstColumnTitle, secondColumnTitle, thirdColumnTitle } =
    listRelation.listId;

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

  if (wordRelation) {
    throw new CustomError(
      400,
      "The relation of the entries already exists in this list, please make a change to the entries or go back to the list."
    );
  }

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
      }).save();
    }
  }

  wordRelation = await WordsRelation.findById(wordRelation._id)
    .populate("firstWordId")
    .populate("secondWordId")
    .populate("thirdWordId");

  return wordRelation;
};

module.exports = postOriginalWordFunc;
