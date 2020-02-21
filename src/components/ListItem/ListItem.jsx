import React, { Component } from "react";
import AddButton from "../AddButton";
import Textarea from "react-textarea-autosize";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Task from "../Task/Task";
import styles from "./ListItem.module.scss";
import { updateListName } from "../../actions";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false, listName: "", listId: "", ...props };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        listName: this.props.lists.title,
        boardId: this.props.boardId,
        listId: this.props.lists.id
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
    return (
      <>
        <div className={styles.listItem}>
          {this.state.isClicked ? (
            <Textarea
              autoFocus
              spellCheck={false}
              maxLength={512}
              name="listName"
              value={this.state.listName}
              onBlur={this.handleListNameSubmit}
              onChange={this.handleListName}
            ></Textarea>
          ) : (
            <div className={styles.listName} onClick={this.listIsClicked}>
              {this.state.listName ? this.state.listName : "Name this list"}
            </div>
          )}
          <div className={styles.taskArea}>
            {this.state.lists.task.map((task, index) => {
              return (
                <Task
                  key={task.id}
                  index={index}
                  task={task}
                  userId={parseInt(this.state.userId)}
                  listId={parseInt(this.state.listId)}
                  tasks={this.state.tasks}
                  divIsClicked={this.props.divIsClicked}
                  isClicked={this.props.isClicked}
                />
              );
            })}
          </div>
          <AddButton></AddButton>
        </div>
      </>
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
