import React, { Component, Fragment, cloneElement } from "react";
import { connect } from "react-redux";
import { Modal, Card, Icon } from "antd";
import api from "../../api";

class DeliveryInfo extends Component {
  state = {
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
      .then(response => {
        this.setState({
          loading: false,
          body: response.data[0]
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          body: "Not found"
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
          {console.log(body)}
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
