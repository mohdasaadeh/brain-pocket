const List = require("../../../../models/List");
const ListRelation = require("../../../../models/ListRelation");

const deleteListFunc = async (userId, id) => {
  const listRelation = await ListRelation.findOneAndUpdate(
    { userId, _id: id },
    { active: false },
    { new: true }
  );

  const { listId } = listRelation;

  const listRelations = await ListRelation.find({ listId });

  if (!listRelations) {
    await List.findByIdAndUpdate(listId, { active: false });
  }

  return listRelation;
};

module.exports = deleteListFunc;
