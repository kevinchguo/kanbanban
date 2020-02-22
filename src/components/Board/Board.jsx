import React, { Component } from "react";
import { Card } from "@material-ui/core";
import ListItem from "../ListItem";
import AddButton from "../AddButton";
import styles from "./Board.module.scss";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { loadUserBoards, updateBoardTitle } from "../../actions";
import ListPosition from "../ListPosition";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      display: "",
      boardTitle: "",
      boardId: "",
      user: ""
    };
  }

  componentDidMount() {
    this.props.loadUserBoards();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { user, currentBoard, userId, username } = this.props;
      if (user) {
        this.setState({
          boardTitle: user.board[currentBoard].title,
          userId: userId,
          username: username,
          boardId: user.board[currentBoard].id
        });
      }
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("Next props: ", nextProps, "Prev State: ", prevState);
  // }

  handleBoardTitle = e => {
    this.setState({ boardTitle: e.target.value });
  };

  handleBoardTitleSubmit = e => {
    e.preventDefault();
    this.setState({ isClicked: false });
    const { boardTitle, boardId, userId, username } = this.state;
    let newBoardTitle = {
      title: boardTitle,
      boardId: boardId,
      userId: userId,
      username: username
    };
    if (boardTitle === this.props.boards[this.props.currentBoard].title) {
      return console.log("Same title, didn't submit");
    } else {
      this.props.updateBoardTitle(newBoardTitle);
      console.log("Submitted boardTitle");
    }
  };

  titleIsClicked = e => {
    e.preventDefault();
    this.setState({ isClicked: true });
  };

  render() {
    const { user, currentBoard } = this.props;
    return (
      <div style={{ backgroundColor: "cornflowerblue", height: "100%" }}>
        <div className={styles.boardTitle}>
          {this.state.isClicked ? (
            <input
              autoFocus
              className={styles.boardTitle}
              type="text"
              spellCheck={false}
              maxLength={512}
              name="boardTitle"
              value={this.state.boardTitle}
              onBlur={this.handleBoardTitleSubmit}
              onChange={this.handleBoardTitle}
            />
          ) : (
            <div className={styles.boardTitle} onClick={this.titleIsClicked}>
              {user ? user.board[currentBoard].title : ""}
            </div>
          )}
        </div>

        <div className={styles.listArea}>
          {user
            ? user.board[currentBoard].list.map((column, index) => {
                return (
                  <ListItem
                    key={index}
                    userId={this.state.userId}
                    boardId={this.state.boardId}
                    lists={column}
                    listPosition={column.position}
                    listName={column.title}
                    tasks={column.task}
                  />
                );
              })
            : ""}
          <AddButton
            list
            userId={this.state.userId}
            boardId={this.state.boardId}
            listPosition={
              user
                ? user.board[currentBoard].list[
                    user.board[currentBoard].list.length - 1
                  ].position
                : Number(0.0).toFixed(2)
            }
          ></AddButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
  userId: state.userId,
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    loadUserBoards: () => {
      return dispatch(loadUserBoards());
    },
    updateBoardTitle: data => {
      return dispatch(updateBoardTitle(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
