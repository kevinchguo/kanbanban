import React, { Component } from "react";
import { connect } from "react-redux";
import ListItem from "../../containers/ListItem/ListItem";
import ListNamingBox from "../../containers/ListNamingBox/ListNamingBox";

import { loadUserBoards } from "../../actions";

import styles from "./Board.module.scss";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: 0,
      boards: [
        {
          boardTitle: "Practice board",
          lists: [
            {
              listName: "Todo",
              task: [
                {
                  taskName: "do this toodoo list pls",
                  createdAt: "today",
                  checked: false
                },
                {
                  taskName: "do this toodoo list pls",
                  createdAt: "today",
                  checked: false
                },
                {
                  taskName: "do this toodoo list pls",
                  createdAt: "today",
                  checked: false
                }
              ]
            },
            {
              listName: "Completed",
              task: [
                {
                  taskName: "blurange complete pls",
                  createdAt: "today",
                  checked: false
                }
              ]
            }
          ]
        }
      ]
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
    console.log(this.target.value);
  };

  render() {
    return (
      <>
        <div className={styles.board}>
          <textarea
            placeholder="Name this board"
            onChange={this.handleBoardTitle}
          >
            {this.state.boardTitle}
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
