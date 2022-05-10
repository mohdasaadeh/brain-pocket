const List = require("../../../models/List");

const putList = async (req, res, next) => {
  const list = req.body;
  const { id } = req.params;

  list.lastEditedAt = Date.now;

  const editedList = await List.findByIdAndUpdate(id, list, {
    new: true,
  });

  res.send(editedList);
};

module.exports = putList;
