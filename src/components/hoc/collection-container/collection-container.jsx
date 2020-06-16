import React, { Component } from "react";
import styles from "./collection-container.module.scss";
import flatten from "flat";
import { getAssetByIdAsync } from "../../../data";

class collectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masterAssetId: this.props.masterAssetId,
      path: "",
      masterPath: "",
    };
  }

  componentDidMount() {
    const { masterPath, masterAssetId } = this.props;
    this.setState({
      masterPath: masterPath,
      masterAssetId: masterAssetId,
    });

    getAssetByIdAsync(this.state.masterAssetId).then((result) =>
      this.setState({ path: result.path })
    );
  }

  render() {
    const { tags, children, name } = this.props;
    const { path } = this.state;
    const breadCrumps = flatten(tags);
    let breadCrumpsTags = [];
    for (let [key, value] of Object.entries(breadCrumps)) {
      breadCrumpsTags.push(value);
    }
    breadCrumpsTags = breadCrumpsTags.map((tag) => `${tag} >`);
    let sliced = breadCrumpsTags[breadCrumpsTags.length - 1].slice(0, -1);
    breadCrumpsTags.pop();
    breadCrumpsTags.push(sliced);

    return (
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={`images/${path}`} alt="img" />
        </div>

        <div className={styles.title}>{name}</div>
        <div className={styles.button}>
          {children} <span className={styles.crumps}>{breadCrumpsTags}</span>
        </div>
      </div>
    );
  }
}

export default collectionItem;
