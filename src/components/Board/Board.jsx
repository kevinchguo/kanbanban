import React, { Component } from "react";
import { connect } from "react-redux";

import ListItem from "../../containers/ListItem/ListItem";

import styles from "./Board.module.scss";

class Board extends Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    this.state = {
      isClicked: false,
      display: "",
      boardTitle: "",
      listName: "",
      taskDescription: ""
    };
  }

  componentDidMount() {}

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("Next props: ", nextProps, "Prev State: ", prevState);
  // }

  preventReload = e => {
    e.preventDefault();
  };

  handleBoardTitle = e => {
    this.setState({ boardTitle: e.target.value });
  };

  handleBoardTitleSubmit = e => {
    e.preventDefault();
    this.setState({ isClicked: false });
    console.log("submitted title");
  };

  handleListName = e => {
    this.setState({ listName: e.target.value });
  };

  handleDescription = e => {
    this.setState({ taskDescription: e.target.value });
  };

  titleIsClicked = e => {
    e.preventDefault();
    this.setState({ isClicked: true });
  };

  render() {
    console.log(this.props);
    return (
      <>
        <div className={styles.board}>
          {this.state.isClicked ? (
            <input
              autoFocus
              onBlur={this.handleBoardTitleSubmit}
              onChange={this.handleBoardTitle}
              className={styles.titleInput}
              ref={this.titleInputRef}
              type="text"
              spellCheck={false}
              maxLength={512}
              name="boardTitle"
              value={this.state.boardTitle}
            />
          ) : (
            <div className={styles.boardTitle} onClick={this.titleIsClicked}>
              {this.state.boardTitle}
            </div>
          )}
          <div className={styles.listArea}>
            <div className={styles.newList}>
              {this.props.boards
                ? this.props.boards[
                    this.props.currentBoard ? this.props.currentBoard : 0
                  ].list.map((column, index) => {
                    return (
                      <ListItem
                        key={index}
                        listName={column.title}
                        tasks={column.card}
                      />
                    );
                  })
                : this.state.board}
            </div>
          </div>
        </div>
      </>
    );
  }
}

// const mapStateToProps = state => {
//   return { user: state.boards.username, boards: state.boards.board };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     loadUserBoards: () => {
//       return dispatch(loadUserBoards());
//     }
//   };
// };

export default connect(
  null,
  null
)(Board);
