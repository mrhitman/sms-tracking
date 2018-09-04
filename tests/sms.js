const { test } = require("mocha");
const BSG = require("bsg-nodejs");

describe.skip("order", () => {
  test("create order", async () => {
    const bsg = BSG("test_jGIBEs3BXQwOg4ZVTwxd");

    const response = await bsg.createSMS({
      destination: "phone",
      originator: "380994073782",
      body: "Test test",
      msisdn: "380994073782",
      reference: "ext_id_18",
      validity: "1",
      tariff: "9"
    });
    if (response.error || (response.result && response.result.error)) {
      console.log(response);
      throw new Error(
        response.errorDescription || response.result.errorDescription
      );
    }
    console.log(response);
  });
});
