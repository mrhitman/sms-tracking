"use strict";
const request = require("request-promise-native");
const _ = require("lodash");
class NovaPoshta {
    constructor() {
        this.uri = "https://api.novaposhta.ua/v2.0/json/";
    }
    async getStatusDocuments(apiKey, documents) {
        return request({
            uri: this.uri,
            method: "POST",
            body: {
                apiKey: apiKey,
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
//# sourceMappingURL=novaposhta.js.map