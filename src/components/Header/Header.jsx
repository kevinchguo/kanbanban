import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Header.module.scss";
import BoardList from "./BoardList";
import Board from "../Board/Board";
import { changeBoards } from "../../actions";

class Header extends Component {
  render() {
    console.log("Header: ", this.props.boards);
    return (
      <>
        <div className={styles.header}>
          Toodoo App
          <div className={styles.boardList}>
            {this.props.boards
              ? this.props.boards.map((title, index) => {
                  console.log(title);
                  return <BoardList key={index} title={title.title} />;
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
