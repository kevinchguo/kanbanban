import React from "react";

import styles from "./ListPosition.module.scss";

const ListPositions = props => {
  return <option className={styles.position}>{props.position}</option>;
};

export default ListPositions;
