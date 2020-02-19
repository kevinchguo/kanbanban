import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListItem from "../../containers/ListItem/ListItem";
import { loadUserBoards, updateBoardTitle } from "../../actions";
import styles from "./Board.module.scss";

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
      this.setState({
        boardTitle: this.props.boards[this.props.currentBoard].title,
        userId: this.props.userId,
        username: this.props.username,
        boardId: this.props.boards[this.props.currentBoard].id
      });
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
    let newBoardTitle = {
      title: this.state.boardTitle,
      boardId: this.state.boardId,
      userId: this.state.userId,
      username: this.state.username
    };
    if (
      this.state.boardTitle === this.props.boards[this.props.currentBoard].title
    ) {
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

  onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const column = columns[source.droppableId];
    const copiedTasks = [...column.task];
    const [removed] = copiedTasks.splice(source.index, 1);
    copiedTasks.splice(destination.index, 0, removed);
    this.setState({});
  };

  render() {
    return (
      <>
        <div className={styles.board}>
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
              {this.props.boards
                ? this.props.boards[this.props.currentBoard].title
                : this.state.boardTitle}
            </div>
          )}
          <div className={styles.listArea}>
            <DragDropContext
              onDragEnd={results => {
                console.log(results);
              }}
            >
              <div className={styles.newList}>
                {this.props.boards
                  ? this.props.boards[
                      this.props.currentBoard ? this.props.currentBoard : 0
                    ].list.map((column, index) => {
                      return (
                        <Droppable
                          key={column.id}
                          droppableId={`${column.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <ListItem
                                provided={provided}
                                snapshot={snapshot}
                                innerRef={provided.innerRef}
                                key={index}
                                userId={this.state.userId}
                                boardId={this.state.boardId}
                                lists={column}
                                listName={column.title}
                                tasks={column.card}
                              />
                            );
                          }}
                        </Droppable>
                      );
                    })
                  : this.state.board}
              </div>
            </DragDropContext>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    userId: state.userId,
    boards: state.boards.board
  };
};

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
