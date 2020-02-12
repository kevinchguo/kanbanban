import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { DragSource, DropTarget } from "react-dnd";
import { XYCoord } from "dnd-core";
import flow from "lodash/flow";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

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

class Task extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  render() {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const {
      task,
      tasks,
      index,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className={styles.task} style={{ opacity }}>
            <div className={styles.taskDescription}>{task.description}</div>
            <div>{`I'm position ${index}`}</div>
            <div>{`created ${timeAgo.format(new Date(task.created_at))}`}</div>
            <select className={styles.selectPosition}>
              <option selected="selected" disabled>
                Move
              </option>
              {tasks ? (
                tasks.map((options, index) => {
                  return <ListPosition position={index} />;
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

export default flow(
  DragSource(ItemTypes.TASK, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.TASK, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Task);
