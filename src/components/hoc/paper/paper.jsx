import React, { Component } from "react";
import styles from "./paper.module.scss";
import { getAssetByIdAsync } from "../../../data";

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "",
    };
  }

  componentDidMount() {
    getAssetByIdAsync(this.props.masterAssetId).then((result) =>
      this.setState({ path: result.path })
    );
  }
  render() {
    const { path } = this.state;
    const { name, masterAssetId, children } = this.props;
    return (
      <div className={styles.paper}>
        <div className={styles.image}>
          <img src={`images/${path}`} alt="" />
        </div>
        <div className={styles.name}>
          <span> {name}</span> <span>Id:{masterAssetId}</span>
        </div>
        <div className={styles.button}>{children}</div>
      </div>
    );
  }
}
export default Paper;
