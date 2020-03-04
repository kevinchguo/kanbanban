import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./DeleteButton.module.scss";

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  openForm = event => {
    console.log("opening form", event);
    this.setState({
      anchorEl: this.state.anchorEl ? null : event.currentTarget
    });
  };

  renderDeleteButton = (id, open) => {
    return (
      <div className={styles.closeButton}>
        <CloseIcon
          aria-describedby="closeButton"
          onClick={this.openForm}
          fontSize="small"
          type="button"
        />
      </div>
    );
  };

  renderDeleteForm = (id, open) => {
    const { list } = this.props;
    const { anchorEl } = this.state;

    const deleteText = list ? "Delete list" : "Delete Card";
    return (
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onBlur={this.closeForm}
        placement="right-start"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent"
          }
        }}
      >
        {deleteText}
        <Button>Yes</Button> <Button onClick={this.closeForm}>No</Button>
      </Popper>
    );
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? "popper" : undefined;
    return this.renderDeleteButton(id, open);
  }
}

export default DeleteButton;
