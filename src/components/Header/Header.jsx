import React, { Component } from "react";

import styles from "./Header.module.scss";

class Header extends Component {
  state = {};
  render() {
    return (
      <>
        <div className={styles.header}>Toodoo App</div>
      </>
    );
  }
}

export default Header;
