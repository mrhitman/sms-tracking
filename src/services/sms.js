const bsg = require("bsg")("<YOUR_ACCESS_KEY>");

module.exports = async (phone, message) => {
  const response = await bsg.createSMS({
    destination: phone,
    originator: "alpha name",
    body: message,
    msisdn: "380972000000",
    reference: "ext_id_16",
    validity: "1",
    tariff: "0"
  });
  return response;
};
