import React, { useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import ItemTypes from "../../dragAndDropTypes";
import ListPosition from "../ListPosition";

import styles from "./Task.module.scss";

const Task = ({
  isDragging,
  connectDragSource,
  connectDropTarget,
  id,
  description,
  length,
  created,
  updated,
  findCard,
  moveCard
}) => {
  console.log("Task: ", length);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const opacity = isDragging ? 0 : 1;
  const ref = useRef(null);
  connectDragSource(ref);
  connectDropTarget(ref);

  return (
    <>
      <div ref={ref} className={(styles.task, { opacity })}>
        <textarea className={styles.taskDescription}>{description}</textarea>
        <div>{`I'm position${id}`}</div>
        <div>{`created ${timeAgo.format(new Date(created))}`}</div>
        <select className={styles.selectPosition}>
          <option selected="selected" disabled>
            Move
          </option>
          {length ? (
            length.map((options, index) => {
              let position = index + 1;
              return <ListPosition position={position} />;
            })
          ) : (
            <ListPosition />
          )}
        </select>
      </div>
    </>
  );
};

export default DropTarget(
  ItemTypes.TASK,
  {
    canDrop: () => false,
    hover(props, monitor) {
      const { id: draggedId } = monitor.getItem();
      const { id: overId } = props;
      if (draggedId !== overId) {
        const { index: overIndex } = props.findCard(overId);
        props.moveCard(draggedId, overIndex);
      }
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.TASK,
    {
      beginDrag: props => ({
        id: props.id,
        originalIndex: props.findCard(props.id).index
      }),
      endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          props.moveCard(droppedId, originalIndex);
        }
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Task)
);
