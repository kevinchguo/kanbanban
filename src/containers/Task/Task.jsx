import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor
} from "react-dnd";
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

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
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
      length,
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
          <div className={styles.task}>
            <textarea className={styles.taskDescription}>
              {task.description}
            </textarea>
            <div>{`I'm position ${length}`}</div>
            <div>{`created ${timeAgo.format(new Date(task.created_at))}`}</div>
            <select className={styles.selectPosition}>
              <option selected="selected" disabled>
                Move
              </option>
              {tasks ? (
                tasks.map((options, index) => {
                  let position = index + 1;
                  return <ListPosition position={position} />;
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
