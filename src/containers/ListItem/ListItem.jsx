import React, { useState, Component } from "react";
import ItemTypes from "../../dragAndDropTypes";
import Task from "../Task/Task";
import styles from "./ListItem.module.scss";
import { DragDropContext } from "react-dnd";
const update = require("immutability-helper");

class ListItem extends Component {
  state = this.props;
  moveCard = (dragIndex, hoverIndex) => {
    const { tasks } = this.state;
    const dragCard = tasks[dragIndex];

    this.setState(
      update(this.state, {
        tasks: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  };

  render() {
    return (
      <div className={styles.listItem}>
        <textarea className={styles.listName} placeholder="Name this List">
          {this.state.listName}
        </textarea>
        {this.state.tasks ? (
          this.state.tasks.map((task, index) => {
            return (
              <Task
                key={task.id}
                index={index}
                task={task}
                tasks={this.state.tasks}
                moveCard={this.moveCard}
              />
            );
          })
        ) : (
          <Task />
        )}
      </div>
    );
  }
}

export default ListItem;
