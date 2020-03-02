import React, { Component } from "react";
import DeleteButton from "../DeleteButton";
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
      const { task, listId, userId } = this.props;
      if (task) {
        this.setState({
          userId: userId,
          taskDescription: task.description,
          listId: listId,
          taskId: task.id
        });
      }
    }
  }

  handleDescription = e => {
    this.setState({ taskDescription: e.target.value });
  };

  handleDescriptionSubmit = e => {
    e.preventDefault();
    const { taskDescription, taskId, listId, username } = this.state;
    const { task, updateTaskDescription, userId } = this.props;
    this.setState({ isClicked: false });
    let newTaskDescription = {
      taskDescription: taskDescription,
      taskId: taskId,
      listId: listId,
      userId: userId,
      username: username
    };
    if (taskDescription === task.description) {
      return console.log("Same taskDescription, didn't submit");
    } else if (taskDescription === "") {
      this.setState({ taskDescription: task.description });
    } else {
      updateTaskDescription(newTaskDescription);
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
            <DeleteButton></DeleteButton>
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
