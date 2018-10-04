import * as base from 'joi';
import * as phone from 'joi-phone-number';

export const validate = (ctx, schema) => {
  const { error } = joi.validate(ctx.request.body, schema);
  if (error) {
    const messages = error.details.map(e => e.message);
    ctx.throw(400, JSON.stringify(messages));
  }
};

export const joi = base.extend(phone);
