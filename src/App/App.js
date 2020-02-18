import React, { useState } from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import "./App.scss";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const [currentBoard, setCurrentBoard] = useState(0);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Header currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
        <Board currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
      </DndProvider>
    </div>
  );
}

export default App;
