import React from "react";
import styles from "./BoardList.module.scss";

const BoardList = props => {
  const firstLetter = props.title[0].toUpperCase();
  return <div className={styles.boardList}>{firstLetter}</div>;
};

export default BoardList;
