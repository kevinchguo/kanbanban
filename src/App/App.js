import React, { useState } from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import "./App.scss";

function App() {
  const [currentBoard, setCurrentBoard] = useState(0);

  return (
    <div className="App">
      <Header currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
      <Board currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
    </div>
  );
}

export default App;
