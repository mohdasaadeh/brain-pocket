const List = require("../../../models/List");

const postList = async (req, res, next) => {
  const list = req.body;

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

  res.send(newList);
};

module.exports = postList;
