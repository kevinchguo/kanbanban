import React, { Component } from "react";
import ListItem from "../ListItem";
import AddButton from "../AddButton";
import styles from "./Board.module.scss";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { loadUserBoards, updateBoardTitle, reorderTasks } from "../../actions";

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

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    const { reorderTasks, currentBoard, user } = this.props;
    if (!destination) {
      return;
    }
    console.log(
      "Destination: ",
      destination,
      "Source: ",
      source,
      "task_id: ",
      draggableId
    );
    const reorderData = {
      toListId: parseInt(destination.droppableId),
      toTaskIndex: destination.index,
      fromListId: parseInt(source.droppableId),
      fromTaskId: source.index,
      movedTaskId: parseInt(draggableId),
      user_id: user.id,
      currentBoard: currentBoard
    };
    if (
      source.draggableId === destination.draggableId &&
      source.index === destination.index
    ) {
      return;
    } else {
      reorderTasks(reorderData);
    }
  };

  render() {
    const { user, currentBoard } = this.props;
    return (
      <div>
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
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId={"all-lists"}
            direction="horizontal"
            type="list "
          >
            {(provided, snapshot) => (
              <div
                className={styles.listArea}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {user
                  ? user.board[currentBoard].list.map((column, index) => {
                      return (
                        <ListItem
                          key={column.id}
                          index={index}
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
                {provided.placeholder}
                <AddButton
                  list
                  userId={this.state.userId}
                  boardId={this.state.boardId}
                  listPosition={
                    user
                      ? user.board[currentBoard].list[
                          user.board[currentBoard].list.length - 1
                        ].position
                      : Number(0)
                  }
                ></AddButton>
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
    },
    reorderTasks: data => {
      return dispatch(reorderTasks(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
