import React, { Component } from "react";
import AddButton from "../AddButton";
import Textarea from "react-textarea-autosize";
import { Droppable } from "react-beautiful-dnd";
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
      this.setState({
        userId: userId,
        listName: lists.title,
        boardId: boardId,
        listId: lists.id
      });
    }
  }

  handleListName = e => {
    this.setState({ listName: e.target.value });
  };

  handleListNameSubmit = e => {
    e.preventDefault();
    this.setState({ isClicked: false });
    let newListName = {
      listName: this.state.listName,
      listId: this.state.listId,
      boardId: this.state.boardId,
      userId: this.state.userId,
      username: this.state.username
    };
    if (this.state.listName === this.props.lists.title) {
      return console.log("Same listName, didn't submit");
    } else {
      this.props.updateListName(newListName);
      console.log("Submitted updated listName");
    }
  };

  listIsClicked = e => {
    e.preventDefault();
    this.setState({ isClicked: true });
  };
  render() {
    const { listName, userId, listId, tasks, lists } = this.state;
    const { divIsClicked, isClicked } = this.props;
    return (
      <Droppable droppableId={String(lists.id)}>
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
                        listId={parseInt(listId)}
                        tasks={tasks}
                        divIsClicked={divIsClicked}
                        isClicked={isClicked}
                      />
                    );
                  })
                : ""}
            </div>
            {provided.placeholder}
            <AddButton
              userId={parseInt(userId)}
              listId={parseInt(listId)}
              taskPosition={
                tasks[tasks.length === 0 ? 0 : tasks.length - 1] === undefined
                  ? Number(0)
                  : tasks[tasks.length - 1].position
              }
            ></AddButton>
          </div>
        )}
      </Droppable>
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
