import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./AddButton.module.scss";
import Textarea from "react-textarea-autosize";

class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = { formOpen: false, submitText: "" };
  }

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonOpacity = list ? 1 : 0.5;
    const textColor = list ? "white" : "inherit";
    const backgroundColor = list ? "rgba(0, 0, 0, 0.20)" : "inherit";
    const marginLeft = list ? "8px" : null;
    const marginRight = list ? "10px" : null;
    const borderRadius = list ? "5px" : null;
    const minWidth = list ? "290px" : "270px";

    return (
      <div
        className={styles.addButton}
        onClick={this.openForm}
        style={{
          opacity: buttonOpacity,
          color: textColor,
          backgroundColor: backgroundColor,
          marginLeft: marginLeft,
          marginRight: marginRight,
          borderRadius: borderRadius,
          minWidth: minWidth
        }}
      >
        <AddIcon></AddIcon>
        <p>{buttonText}</p>
      </div>
    );
  };

  openForm = () => {
    this.setState({ formOpen: true });
  };

  handleTextareaChange = e => {
    this.setState({ submitText: e.target.value });
  };

  submitNewListOrForm = () => {
    this.setState({ formOpen: false });
  };

  renderForm = () => {
    const { list } = this.props;
    const placeholder = list ? "Enter list title" : "Enter a task description";
    const buttonText = list ? "Add list" : "Add task";
    const marginTop = list ? null : "8px";
    const marginLeft = list ? "8px" : null;
    const borderRadius = list ? "5px" : null;
    const minWidth = list ? "290px" : "270px";
    const height = list ? "110px" : null;
    const padding = list ? "10px" : null;

    return (
      <div
        style={{
          marginTop: marginTop,
          marginLeft: marginLeft,
          borderRadius: borderRadius,
          minWidth: minWidth,
          height: height,
          backgroundColor: "rgba(222,222,222)",
          padding: padding
        }}
      >
        <Card className={styles.renderForm}>
          <Textarea
            autoFocus
            placeholder={placeholder}
            onBlur={this.submitNewListOrForm}
            value={this.state.submitText}
            onChange={this.handleTextareaChange}
          ></Textarea>
        </Card>
        <div className={styles.buttonGroup}>
          <Button
            variant="contained"
            style={{ color: "white", backgroundColor: "#5aac44" }}
          >
            {buttonText}
          </Button>
          <CloseIcon style={{ marginLeft: "8", cursor: "pointer" }}></CloseIcon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default AddButton;
