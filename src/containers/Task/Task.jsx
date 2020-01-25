import React from "react";
import ListPosition from "../ListPosition";

import styles from "./Task.module.scss";

const Task = props => {
  return (
    <>
      <div className={styles.task}>
        <textarea>{props.taskName}</textarea>
        <div>{props.createdAt}</div>
        <select className={styles.selectPosition}>
          <option selected="selected" disabled>
            Move
          </option>
          {props.cards.map((options, index) => {
            let position = index + 1;
            return <ListPosition position={position} />;
          })}
        </select>
      </div>
    </>
  );
};

export default Task;
