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
    return (
      <div className={styles.paper}>
        <div className={styles.image}>
          <img src={`images/${this.state.path}`} alt="" />
        </div>
        <div className={styles.name}>
          <span> {this.props.name}</span>{" "}
          <span>Id:{this.props.masterAssetId}</span>
        </div>
        <div className={styles.button}>{this.props.children}</div>
      </div>
    );
  }
}
export default Paper;
