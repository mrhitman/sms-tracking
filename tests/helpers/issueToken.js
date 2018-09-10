const jwt = require("jsonwebtoken");

module.exports = (data, options = {}) => jwt.sign(data, "vuMqYA3xlRp1i3HC4qRhtpYO", options); 