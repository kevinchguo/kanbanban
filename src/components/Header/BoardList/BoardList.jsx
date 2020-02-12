import React, { setState } from "react";
import styles from "./BoardList.module.scss";

const BoardList = props => {
  const handleCurrentBoard = () => {
    props.setCurrentBoard(props.id);
  };

  const firstLetter = props.title[0].toUpperCase();
  return (
    <div className={styles.boardList} onClick={handleCurrentBoard}>
      {firstLetter}
    </div>
  );
};

export default BoardList;
