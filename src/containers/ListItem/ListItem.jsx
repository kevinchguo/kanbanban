import React, { useRef, useState, useCallback } from "react";
import { DropTarget } from "react-dnd";
import update from "immutability-helper";

import ItemTypes from "../../dragAndDropTypes";
import Task from "../Task/Task";

import styles from "./ListItem.module.scss";

const ListItem = ({ connectDropTarget, ...props }) => {
  const ref = useRef(null);
  const [tasks, setTasks] = useState(props);
  console.log("ListsItem: ", tasks);

  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id);
      setTasks(
        update(tasks.tasks, {
          $splice: [[index, 1], [atIndex, 0, card]]
        })
      );
    },
    [tasks.tasks]
  );

  const findCard = useCallback(
    id => {
      const card = tasks.tasks.filter(c => `${c.id}` === id)[0];
      return {
        card,
        index: tasks.tasks.indexOf(card)
      };
    },
    [tasks.tasks]
  );

  connectDropTarget(ref);

  return (
    <div ref={ref} className={styles.listItem}>
      <textarea
        className={styles.listName}
        placeholder="Name this List"
        onChange={props.handleListName}
      >
        {props.listName}
      </textarea>
      {tasks.tasks ? (
        tasks.tasks.map(task => {
          return (
            <Task
              key={task.id}
              length={tasks.tasks}
              id={task.position}
              description={task.description}
              created={task.created_at}
              updated={task.updated_at}
              moveCard={moveCard}
              findCard={findCard}
            />
          );
        })
      ) : (
        <Task />
      )}
    </div>
  );
};

export default DropTarget(ItemTypes.TASK, {}, connect => ({
  connectDropTarget: connect.dropTarget()
}))(ListItem);
