const List = require("../../../../models/List");
const ListRelation = require("../../../../models/ListRelation");
const WordsRelation = require("../../../../models/WordsRelation");

const postListFunc = async (list, userId) => {
  const isFound = await List.findOne(list);

  let newList;

  if (isFound && isFound.active) {
    newList = isFound;
  } else if (isFound && !isFound.active) {
    newList = await List.findByIdAndUpdate(
      isFound._id,
      { active: true },
      { new: true }
    );
  } else {
    newList = await new List(list).save();
  }

  let listRelation = await ListRelation.findOne(
    { listId: newList._id, userId, active: true },
    "listId"
  )
    .populate("listId")
    .lean();

  if (!listRelation) {
    listRelation = await new ListRelation({
      listId: newList._id,
      userId,
      active: true,
    }).save();
  }

  const words = await WordsRelation.find({
    listId: listRelation.listId._id,
    userId,
    active: true,
  });

  listRelation.wordsCount = words.length;

  return listRelation;
};

module.exports = postListFunc;
