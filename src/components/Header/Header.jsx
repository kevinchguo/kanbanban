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
    const { user } = this.props;
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
            {user
              ? user.board.map((title, index) => {
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
              : ""}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

const mapDispachToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Header);
