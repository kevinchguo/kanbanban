import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { formOpen: false };
  }

  openForm = () => {
    this.setState({ formOpen: true });
  };

  closeForm = () => {
    this.setState({ formOpen: false });
  };

  renderDeleteButton = () => {
    return (
      <div>
        delete
        <CloseIcon onClick={this.openForm} />;
      </div>
    );
  };

  renderDeleteForm = () => {
    const { list } = this.props;

    const deleteText = list ? "Delete list" : "Delete Card";
    return (
      <div onBlur={this.formClose}>
        {deleteText}
        <Button>
          <CloseIcon />
        </Button>
        <Button>Yes</Button> <Button onClick={this.formClose}>No</Button>
      </div>
    );
  };

  render() {
    return this.state.formOpen
      ? this.renderDeleteForm
      : this.renderDeleteButton;
  }
}

export default DeleteButton;
