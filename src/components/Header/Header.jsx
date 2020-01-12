import React, { Component } from "react";

import styles from "./Header.module.scss";

class Header extends Component {
  state = {};
  render() {
    return (
      <>
        <div className={styles.header}>This is header</div>
      </>
    );
  }
}

export default Header;
