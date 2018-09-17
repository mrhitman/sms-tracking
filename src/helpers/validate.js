const joi = require("joi").extend(require("joi-phone-number"));

module.exports = {
  validate: (ctx, schema) => {
    const { error } = joi.validate(ctx.request.body, schema);
    if (error) {
      const messages = error.details.map(e => e.message);
      ctx.throw(400, JSON.stringify(messages));
    }
  },
  joi
};
