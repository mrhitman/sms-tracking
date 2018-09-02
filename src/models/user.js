const { Model } = require("objection");

class User extends Model {
    static tableName = "user";
    id;
    name;
    phone;
}

module.exports = User;