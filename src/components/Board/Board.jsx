import React, { Component, useState } from "react";
import { connect } from "react-redux";

import ListItem from "../../containers/ListItem/ListItem";
import ListNamingBox from "../../containers/ListNamingBox/ListNamingBox";

import styles from "./Board.module.scss";

import { loadUserBoards } from "../../actions";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      display: "block",
      boardTitle: "",
      listName: "",
      taskDescription: ""
    };
  }

  componentDidMount() {
    this.props.loadUserBoards();
  }

  handleBoardTitle = e => {
    this.setState({ boardTitle: e.target.value });
  };

  handleBoardTitleSubmit = e => {
    this.setState({ isClicked: false });
  };

  handleListName = e => {
    this.setState({ listName: e.target.value });
  };

  handleDescription = e => {
    this.setState({ taskDescription: e.target.value });
  };

  titleIsClicked = () => {
    this.setState({ isClicked: true });
  };

  render() {
    const display = this.state.isClicked ? "none" : "block";
    return (
      <>
        <div className={styles.board}>
          <div
            className={styles.boardTitle}
            style={{ display }}
            onClick={this.titleIsClicked}
          >
            {this.props.boards
              ? this.props.boards[
                  this.props.currentBoard ? this.props.currentBoard : 0
                ].title
              : "Name this board"}
          </div>
          <form onSubmit={this.handleBoardTitleSubmit}>
            <input
              type="text"
              spellCheck={false}
              maxLength={512}
              value={`${
                this.props.boards
                  ? this.props.boards[
                      this.props.currentBoard ? this.props.currentBoard : 0
                    ].title
                  : "Name this board"
              }`}
            />
          </form>
          <div className={styles.listArea}>
            <div className={styles.newList}>
              {this.props.boards
                ? this.props.boards[
                    this.props.currentBoard ? this.props.currentBoard : 0
                  ].list.map(column => {
                    return (
                      <ListItem listName={column.title} tasks={column.card} />
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

const mapStateToProps = state => {
  return { user: state.boards.username, boards: state.boards.board };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserBoards: () => {
      return dispatch(loadUserBoards());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
