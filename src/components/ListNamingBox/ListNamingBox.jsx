import React from "react";

import styles from "./ListNamingBox.module.scss";

const ListNamingBox = props => {
  return (
    <textarea className={styles.listNamingBox}>{this.props.listName}</textarea>
  );
};
