"use strict";

const request = require("request-promise-native");
const _ = require("lodash");

const TrackingStatuses = {};

class NovaPoshta {
  constructor(params) {
    this.apiKey = params.apiKey;
    this.uri = "https://api.novaposhta.ua/v2.0/json/";
  }

  async getStatusDocuments(documents) {
    return request({
      uri: this.uri,
      method: "POST",
      body: {
        apiKey: this.apiKey,
        modelName: "TrackingDocument",
        calledMethod: "getStatusDocuments",
        methodProperties: {
          Documents: _.map(documents, ({ ttn, phone }) => ({
            DocumentNumber: ttn,
            Phone: phone
          }))
        }
      },
      json: true
    });
  }
}

module.exports = NovaPoshta;
