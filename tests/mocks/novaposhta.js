class NovaPoshtaMock {
  constructor() {
    this.statusCodes = {
      inlocation: 4,
      inprogress: 5,
      done: 9,
      refuse: 102,
      ready: 7
    };
    this.setOption(this.statusCodes.ready);
  }

  setOption(option) {
    this.option = option;
  }

  async getStatusDocuments(apiKey, documents) {
    return {
      data: [
        {
          Number: "59000218530814",
          Redelivery: 0,
          RedeliverySum: 0,
          RedeliveryNum: "",
          RedeliveryPayer: "",
          OwnerDocumentType: "",
          LastCreatedOnTheBasisDocumentType: "",
          LastCreatedOnTheBasisPayerType: "",
          LastCreatedOnTheBasisDateTime: "",
          LastTransactionStatusGM: "",
          LastTransactionDateTimeGM: "",
          DateCreated: "18-11-2016 11:52:42",
          DocumentWeight: 0.5,
          CheckWeight: 0,
          DocumentCost: 20,
          SumBeforeCheckWeight: 0,
          PayerType: "Recipient",
          RecipientFullName: "ФИО",
          RecipientDateTime: "21.11.2016 13:53:47",
          ScheduledDeliveryDate: "19-11-2016",
          PaymentMethod: "Cash",
          CargoDescriptionString: "Одяг",
          CargoType: "Cargo",
          CitySender: "Київ",
          CityRecipient: "Київ",
          WarehouseRecipient:
            'Відділення №101 (до 15 кг), Міні-відділення: вул. Велика Васильківська, 143/2, (маг. "Фора")',
          CounterpartyType: "PrivatePerson",
          AfterpaymentOnGoodsCost: 0,
          ServiceType: "WarehouseWarehouse",
          UndeliveryReasonsSubtypeDescription: "",
          WarehouseRecipientNumber: 101,
          LastCreatedOnTheBasisNumber: "",
          PhoneRecipient: "380ХХХХХХХХХ",
          RecipientFullNameEW: "ФИО",
          WarehouseRecipientInternetAddressRef:
            "39931b02-e1c2-11e3-8c4a-0050568002cf",
          MarketplacePartnerToken: "",
          ClientBarcode: "",
          RecipientAddress:
            "м. Київ, Відділення №101 (до 15 кг), Міні-відділення, вул. Велика Васильківська, 143/2",
          CounterpartyRecipientDescription: "Приватна особа",
          CounterpartySenderType: "PrivatePerson",
          DateScan: "0001-01-01 00:00:00",
          PaymentStatus: "",
          PaymentStatusDate: "",
          AmountToPay: "",
          AmountPaid: "",
          Status: "Одержано",
          StatusCode: this.option,
          RefEW: "55fbe203-ad74-11e6-b5da-005056887b8d",
          BackwardDeliverySubTypesServices: [],
          BackwardDeliverySubTypesActions: [],
          UndeliveryReasons: ""
        }
      ]
    };
  }
}

module.exports = NovaPoshtaMock;
