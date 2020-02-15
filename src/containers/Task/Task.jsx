import React, { Component } from "react";
import { connect } from "react-redux";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { updateTaskDescription } from "../../actions";
import ItemTypes from "../../dragAndDropTypes";
import ListPosition from "../ListPosition";

import styles from "./Task.module.scss";

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveCard(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

const handleTaskPositionChange = e => {
  console.log(e.target.value.position);
};

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

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    task: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveCard: PropTypes.func.isRequired
  };

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
      userId: this.state.userId,
      username: this.state.username
    };
    this.props.updateTaskDescription(newTaskDescription);
  };

  taskIsClicked = e => {
    e.preventDefault();
    this.setState({ isClicked: true });
  };

  render() {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className={styles.task} style={{ opacity }}>
            {this.state.isClicked ? (
              <input
                autoFocus
                className={styles.taskDescription}
                type="text"
                spellCheck={false}
                maxLength={512}
                name="taskDescription"
                value={this.state.taskDescription}
                onBlur={this.handleDescriptionSubmit}
                onChange={this.handleDescription}
              />
            ) : (
              <div
                className={styles.taskDescription}
                onClick={this.taskIsClicked}
              >
                {this.state.taskDescription}
              </div>
            )}
            <div>{`I'm position ${this.props.index}`}</div>
            <div>{`created ${timeAgo.format(
              new Date(this.props.task.created_at)
            )}`}</div>
            <select
              className={styles.selectPosition}
              value={this.state.index}
              onChange={handleTaskPositionChange}
            >
              {this.state.tasks ? (
                this.state.tasks.map((options, index) => {
                  return <ListPosition key={index} position={index} />;
                })
              ) : (
                <ListPosition />
              )}
            </select>
          </div>
        )
      )
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

export default flow(
  DragSource(ItemTypes.TASK, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.TASK, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  connect(
    null,
    mapDispatchToProps
  )
)(Task);
