import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import styles from "./Header.module.scss";
import BoardList from "./BoardList";

class Header extends Component {
  handleAddNewBoard = e => {
    console.log("opening newboard modal");
  };

  render() {
    return (
      <>
        <div className={styles.header}>
          Toodoo App
          <div className={styles.boardList}>
            <button
              className={styles.addBoards}
              onClick={this.handleAddNewBoard}
            >
              <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
            </button>
            {this.props.boards
              ? this.props.boards.map((title, index) => {
                  return (
                    <BoardList
                      key={index}
                      id={index}
                      currentBoard={this.props.currentBoard}
                      setCurrentBoard={this.props.setCurrentBoard}
                      title={title.title}
                    />
                  );
                })
              : "No boards"}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { boards: state.boards.board };
};

const mapDispachToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Header);
