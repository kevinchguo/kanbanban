import React, { Component } from "react";
import { connect } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { updateTaskDescription } from "../../actions";
import { Draggable } from "react-beautiful-dnd";

import styles from "./Task.module.scss";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      taskDescription: "",
      taskId: "",
      ...props
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        taskDescription: this.props.task.description,
        listId: this.props.listId,
        taskId: this.props.task.id
      });
    }
  }

  handleDescription = e => {
    this.setState({ taskDescription: e.target.value });
  };

  handleDescriptionSubmit = e => {
    e.preventDefault();
    this.setState({ isClicked: false });
    let newTaskDescription = {
      taskDescription: this.state.taskDescription,
      taskId: this.state.taskId,
      listId: this.state.listId,
      userId: this.props.userId,
      username: this.state.username
    };
    if (this.state.taskDescription === this.props.task.description) {
      return console.log("Same taskDescription, didn't submit");
    } else {
      this.props.updateTaskDescription(newTaskDescription);
      console.log("Submitted taskDescription");
    }
  };

  taskIsClicked = e => {
    e.preventDefault();
    this.setState({ isClicked: true });
  };

  render() {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const { isClicked, taskDescription } = this.state;
    const { index, task } = this.props;

    return (
      <Draggable draggableId={String(task.id)} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.task}
          >
            {isClicked ? (
              <input
                autoFocus
                className={styles.taskDescription}
                type="text"
                spellCheck={false}
                maxLength={512}
                name="taskDescription"
                value={taskDescription}
                onBlur={this.handleDescriptionSubmit}
                onChange={this.handleDescription}
              />
            ) : (
              <div
                className={styles.taskDescription}
                onClick={this.taskIsClicked}
              >
                {taskDescription}
              </div>
            )}
            <div>{`I'm position ${index}`}</div>
            <div>{`created ${timeAgo.format(new Date(task.created_at))}`}</div>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTaskDescription: data => {
      return dispatch(updateTaskDescription(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Task);
