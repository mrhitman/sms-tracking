import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import * as uuid from "uuid";
import RefreshToken from "../../models/refresh-token";

export default async ctx => {
  const { token } = ctx.request.body;

  const refreshToken = await RefreshToken.query().findOne({ token });
  if (!refreshToken) {
    return;
  }

  await refreshToken
    .$query()
    .update({ token: uuid(), created_at: moment().unix() })
    .execute();

  const newToken = jwt.sign({ id: refreshToken.user_id }, process.env.SALT, {
    expiresIn: "1h"
  });

  ctx.body = {
    token: newToken,
    refreshToken: refreshToken.token
  };
};
