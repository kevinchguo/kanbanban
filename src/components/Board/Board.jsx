import React, { Component } from "react";
import { connect } from "react-redux";

import ListItem from "../../containers/ListItem/ListItem";
import ListNamingBox from "../../containers/ListNamingBox/ListNamingBox";

import styles from "./Board.module.scss";

import { loadUserBoards } from "../../actions";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: 0
    };
  }

  componentDidMount() {
    this.props.loadUserBoards();
  }

  handleBoardTitle = e => {
    this.setState({ boardTitle: e.target.value });
  };

  handleListName = e => {
    this.setState({ listName: e.target.value });
    console.log(this.target.value);
  };

  handleDescription = e => {
    this.setState({ listDescription: e.target.value });
  };
  render() {
    console.log(this.props);
    return (
      <>
        <div className={styles.board}>
          <textarea
            className={styles.boardTitle}
            placeholder="Name this board"
            onChange={this.handleBoardTitle}
          >
            {this.props.boards
              ? this.props.boards[this.state.currentBoard].title
              : ""}
          </textarea>
          <div className={styles.listArea}>
            <div className={styles.newList}>
              {this.props.boards
                ? this.props.boards[this.state.currentBoard].list.map(
                    column => {
                      return (
                        <ListItem listName={column.title} tasks={column.card} />
                      );
                    }
                  )
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
