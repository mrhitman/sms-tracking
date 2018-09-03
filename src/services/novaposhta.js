const request = require("request-promise-native");
const _ = require("lodash");

const TrackingStatuses = {};

class NovaPoshta {
  constructor(params) {
    this.apiKey = params.apiKey;
  }

  async getStatusDocuments(documents) {
    return request({
      uri: "https://api.novaposhta.ua/v2.0/json/",
      method: "POST",
      body: {
        apiKey: this.apiKey,
        modelName: "TrackingDocument",
        calledMethod: "getStatusDocuments",
        methodProperties: {
          Documents: _.map(documents, document => ({
            DocumentNumber: document.ttn,
            Phone: document.phone
          }))
        }
      },
      json: true
    });
  }
}

module.exports = NovaPoshta;
