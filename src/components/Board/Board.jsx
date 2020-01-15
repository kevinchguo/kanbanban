import React, { Component } from "react";
import ListItem from "../../containers/ListItem/ListItem";
import ListNamingBox from "../../containers/ListNamingBox/ListNamingBox";

import styles from "./Board.module.scss";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: {
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
    };
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
              {this.state.boards.lists.map(column => {
                return (
                  <ListItem listName={column.listName} tasks={column.task} />
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Board;
