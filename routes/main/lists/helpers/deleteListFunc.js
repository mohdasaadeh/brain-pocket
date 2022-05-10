const List = require("../../../../models/List");
const ListRelation = require("../../../../models/ListRelation");

const deleteListFunc = async (userId, id) => {
  const listRelation = await ListRelation.findOneAndUpdate(
    { userId, _id: id },
    { active: false },
    { new: true }
  );

  const listRelations = await ListRelation.find({ _id: id });

  if (!listRelations) {
    await List.findByIdAndUpdate(id, { active: false });
  }

  return listRelation;
};

module.exports = deleteListFunc;
