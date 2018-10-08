import api from "../../api";
import React, { Component, Fragment } from "react";
import { Card, Icon, Modal } from "antd";

type DeliveryInfoProps = {
  id: number;
};

type NovaposhtaTrackInfo = {
  Number: number;
  CargoDescriptionString: string;
  WarehouseSender: string;
  CityRecipient: string;
  DocumentWeight: string;
  PayerType: string;
  Status: string;
  RecipientFullNameEW: string;
};

type DeliveryInfoState = {
  visible: boolean;
  loading: boolean;
  body: NovaposhtaTrackInfo | null;
};

class DeliveryInfo extends Component<DeliveryInfoProps, DeliveryInfoState> {
  state: DeliveryInfoState = {
    visible: false,
    loading: false,
    body: null
  };

  handleOpen() {
    this.setState({ visible: true });
    const { id } = this.props;
    this.setState({
      loading: true
    });
    api
      .trackOrder(id)
      .then((response: any) => {
        this.setState({
          loading: false,
          body: response.data[0]
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          body: null
        });
      });
  }

  handleClose() {
    this.setState({ visible: false });
  }

  render() {
    const { loading, visible, body } = this.state;
    return (
      <Fragment>
        <Icon
          title="Track order"
          type="dashboard"
          onClick={this.handleOpen.bind(this)}
        />
        <Modal
          title="Order delivery info"
          visible={visible}
          onOk={this.handleClose.bind(this)}
          onCancel={this.handleClose.bind(this)}
        >
          <Card
            loading={loading}
            title={
              body
                ? `${body.Number} ${body.CargoDescriptionString}`
                : "Not found"
            }
          >
            {body && (
              <Fragment>
                <div>Route: {body.WarehouseSender} </div>
                <div>Address: {body.CityRecipient}</div>
                <div>Weight: {body.DocumentWeight}</div>
                <div>Value: {body.PayerType}</div>
                <div>Status: {body.Status}</div>
                {body.RecipientFullNameEW && (
                  <div>Recipient: {body.RecipientFullNameEW}</div>
                )}
              </Fragment>
            )}
          </Card>
        </Modal>
      </Fragment>
    );
  }
}

export default DeliveryInfo;
