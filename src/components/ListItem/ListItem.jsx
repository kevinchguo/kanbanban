import React, { Component } from "react";
import AddButton from "../AddButton";
import Textarea from "react-textarea-autosize";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Task from "../Task/Task";
import styles from "./ListItem.module.scss";
import { updateListName } from "../../actions";
// import ListPosition from "../ListPosition";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false, listName: "", listId: "", ...props };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { userId, lists, boardId } = this.props;
      if (lists) {
        this.setState({
          userId: userId,
          listName: lists.title,
          boardId: boardId,
          listId: lists.id
        });
      }
    }
  }

  handleListName = e => {
    this.setState({ listName: e.target.value });
  };

  handleListNameSubmit = e => {
    e.preventDefault();
    const { listName, listId, boardId, userId, username } = this.state;
    const { lists, updateListName } = this.props;
    this.setState({ isClicked: false });
    let newListName = {
      listName: listName,
      listId: listId,
      boardId: boardId,
      userId: userId,
      username: username
    };
    if (listName === lists.title) {
      return console.log("Same listName, didn't submit");
    } else if (listName === "") {
      this.setState({ listName: lists.title });
    } else {
      updateListName(newListName);
      console.log("Submitted updated listName");
    }
  };

  listIsClicked = e => {
    e.preventDefault();
    this.setState({ isClicked: true });
  };
  render() {
    const { listName, userId, isClicked } = this.state;
    const { index, lists, tasks } = this.props;
    return (
      // <Draggable draggableId={String(lists.id)} index={index}>
      //   {provided => (
      //     <div
      //       ref={provided.innerRef}
      //       {...provided.draggableProps}
      //       {...provided.dragHandleProps}
      //     >
      <Droppable droppableId={String(lists.id)} type="card">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.listItem}
          >
            {isClicked ? (
              <Textarea
                autoFocus
                spellCheck={false}
                maxLength={512}
                name="listName"
                value={listName}
                onBlur={this.handleListNameSubmit}
                onChange={this.handleListName}
              ></Textarea>
            ) : (
              <div className={styles.listName} onClick={this.listIsClicked}>
                {listName ? listName : "Name this list"}
              </div>
            )}
            <div className={styles.taskArea}>
              {lists
                ? lists.task.map((task, index) => {
                    return (
                      <Task
                        key={task.id}
                        taskPosition={task.position}
                        index={index}
                        task={task}
                        userId={parseInt(userId)}
                        listId={parseInt(lists.id)}
                        tasks={tasks}
                        isClicked={isClicked}
                      />
                    );
                  })
                : ""}
            </div>
            {provided.placeholder}
            <AddButton
              userId={parseInt(userId)}
              listId={parseInt(lists.id)}
              taskPosition={
                tasks[tasks.length === 0 ? 0 : tasks.length - 1] === undefined
                  ? Number(0)
                  : tasks[tasks.length - 1].position
              }
            ></AddButton>
          </div>
        )}
      </Droppable>
      // </div>
      // )}
      // </Draggable>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateListName: data => {
      return dispatch(updateListName(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ListItem);
