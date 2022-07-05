require("../../../models/List");

const ListRelation = require("../../../models/ListRelation");
const WordsRelation = require("../../../models/WordsRelation");

const getLists = async (req, res, next) => {
  const userId = req.user.id;

  let lists = await ListRelation.find({ userId, active: true }, "listId")
    .populate("listId")
    .sort({ createdAt: "desc" })
    .lean();

  lists = await Promise.all(
    lists.map(async list => {
      const words = await WordsRelation.find({
        userId,
        listId: list.listId._id,
        active: true
      });

      list.wordsCount = words.length;

      return list;
    })
  );

  res.send(lists);
};

module.exports = getLists;
