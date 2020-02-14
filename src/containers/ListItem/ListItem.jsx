import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "../Task/Task";
import styles from "./ListItem.module.scss";
import { updateListName } from "../../actions";
const update = require("immutability-helper");

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false, listName: "", listId: "", ...props };
  }
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
    this.props.updateListName(newListName);
  };

  listIsClicked = e => {
    e.preventDefault();
    this.setState({ isClicked: true });
    console.log("i got clicked");
  };

  render() {
    return (
      <div className={styles.listItem}>
        {this.state.isClicked ? (
          <input
            autoFocus
            className={styles.listName}
            type="text"
            spellCheck={false}
            maxLength={512}
            name="listName"
            value={this.state.listName}
            onBlur={this.handleListNameSubmit}
            onChange={this.handleListName}
          />
        ) : (
          <div className={styles.listName} onClick={this.listIsClicked}>
            {this.state.listName ? this.state.listName : "Name this list"}
          </div>
        )}
        {this.state.tasks ? (
          this.state.tasks.map((task, index) => {
            return (
              <Task
                key={task.id}
                index={index}
                task={task}
                userId={this.state.userId}
                listId={this.state.listId}
                tasks={this.state.tasks}
                moveCard={this.moveCard}
                divIsClicked={this.props.divIsClicked}
                isClicked={this.props.isClicked}
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
