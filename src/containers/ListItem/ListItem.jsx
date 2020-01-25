import React from "react";
import Task from "../Task/Task";

import styles from "./ListItem.module.scss";

const ListItem = props => {
  return (
    <div className={styles.listItem}>
      <textarea
        className={styles.listName}
        placeholder="Name this List"
        onChange={props.handleListName}
      >
        {props.listName}
      </textarea>
      {props.tasks.map(tasks => {
        return (
          <Task
            taskName={tasks.description}
            createdAt={tasks.created_at}
            cards={props.tasks}
          />
        );
      })}
    </div>
  );
};

export default ListItem;
