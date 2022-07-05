const Joi = require("joi");

const listValidator = async (req, res, next) => {
  const list = req.body;

  const joiSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    firstColumnTitle: Joi.string().min(3).max(30).required(),
    secondColumnTitle: Joi.string().min(3).max(30).required()
  });

  try {
    await joiSchema.validateAsync(list);

    next();

    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listValidator
};
