import React, { Component, Fragment } from "react";
import { Timeline, Modal } from "antd";
import { connect } from "react-redux";

class OrderHistory extends Component {
  state = {
    visible: false
  };

  handleOpen = () => {
    this.setState({ visible: true });
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <Fragment>
        {this.props.children}
        <Modal
          visible={this.state.visible}
          onCancel={this.handleClose}
          onOk={this.handleOpen}
        >
          <Timeline>
            <Timeline.Item>Create order</Timeline.Item>
          </Timeline>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);
