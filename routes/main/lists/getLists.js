require("../../../models/List");

const ListRelation = require("../../../models/ListRelation");
const WordsRelation = require("../../../models/WordsRelation");

// eslint-disable-next-line no-unused-vars
const getLists = async (req, res, next) => {
  const userId = req.user.id;

  let listsRelation = await ListRelation.find(
    { userId, active: true },
    "listId"
  )
    .populate("listId")
    .sort({ createdAt: "desc" })
    .lean();

  listsRelation = await Promise.all(
    listsRelation.map(async listRelation => {
      const words = await WordsRelation.find({
        userId,
        listRelationId: listRelation._id,
        active: true
      });

      listRelation.wordsCount = words.length;

      return listRelation;
    })
  );

  res.send(listsRelation);
};

module.exports = getLists;
