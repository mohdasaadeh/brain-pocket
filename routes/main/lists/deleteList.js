const List = require("../../../models/List");
const ListRelation = require("../../../models/ListRelation");

const deleteList = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  await ListRelation.findOneAndUpdate(
    { userId, listId: id },
    { active: false }
  );

  const listRelations = await ListRelation.find({ listId: id });

  if (!listRelations) {
    await List.findByIdAndUpdate(id, { active: false });
  }

  res.send({});
};

module.exports = deleteList;
