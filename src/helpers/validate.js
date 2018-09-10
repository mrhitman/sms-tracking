const joi = require("joi").extend(require("joi-phone-number"));

module.exports = {
  validate: (ctx, schema) => {
    const { error } = joi.validate(ctx.request.body, schema);
    if (error) {
      ctx.status = 400;
      ctx.body = error;
      ctx.throw(400, error);
    }
  },
  joi
};
