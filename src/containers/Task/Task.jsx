import React from "react";

import styles from "./Task.module.scss";

const Task = props => {
  return (
    <>
      <div className={styles.task}>
        <textarea>{props.taskName}</textarea>
        <div>{props.createdAt}</div>
      </div>
    </>
  );
};

export default Task;
