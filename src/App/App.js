import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Header from "../components/Header";
import Board from "../components/Board";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { loadUserBoards } from "../actions";

import "./App.scss";

function App({ ...props }) {
  useEffect(() => {
    props.loadUserBoards();
  }, []);

  const [currentBoard, setCurrentBoard] = useState(0);
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Header currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
        <Board
          boards={props.boards}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
        />
      </DndProvider>
    </div>
  );
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
)(App);
