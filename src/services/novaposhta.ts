import * as request from 'request-promise-native';
import { map } from 'lodash';

export default class NovaPoshta {
  private uri = "https://api.novaposhta.ua/v2.0/json/";

  async getStatusDocuments(apiKey, documents) {
    return request({
      uri: this.uri,
      method: "POST",
      body: {
        apiKey: apiKey,
        modelName: "TrackingDocument",
        calledMethod: "getStatusDocuments",
        methodProperties: {
          Documents: map(documents, ({ ttn, phone }) => ({
            DocumentNumber: ttn,
            Phone: phone
          }))
        }
      },
      json: true
    });
  }
}
