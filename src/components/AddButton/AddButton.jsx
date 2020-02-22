import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewList, addNewTask, loadUserBoards } from "../../actions";
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
    const { submitText } = this.state;
    const { list } = this.props;
    if (submitText !== "") {
      if (list) {
        this.submitNewList();
      } else {
        this.submitNewCard();
      }
    }
  };

  submitNewList = () => {
    this.setState({ formOpen: false });
    const { listPosition, addNewList, boardId, userId } = this.props;
    const { submitText } = this.state;
    let newList = {
      user_id: userId,
      board_id: boardId,
      title: submitText,
      position: parseInt(Number(listPosition) + 1).toFixed(2)
    };
    if (submitText !== "") {
      this.setState({ submitText: "" });
      addNewList(newList);
    }
  };

  submitNewCard = () => {
    this.setState({ formOpen: false });
    const { listId, userId, taskPosition, addNewTask } = this.props;
    const { submitText } = this.state;
    let newCard = {
      user_id: userId,
      list_id: listId,
      description: submitText,
      position: parseInt(Number(taskPosition) + 1).toFixed(2)
    };
    if (submitText !== "") {
      this.setState({ submitText: "" });
      addNewTask(newCard);
    }
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
            onMouseDown={list ? this.submitNewList : this.submitNewCard}
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

const mapDispatchToProps = dispatch => {
  return {
    loadUserBoards: () => {
      return dispatch(loadUserBoards());
    },
    addNewTask: data => {
      return dispatch(addNewTask(data));
    },
    addNewList: data => {
      return dispatch(addNewList(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddButton);
