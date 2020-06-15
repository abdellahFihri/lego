import React, { Component } from "react";
import styles from "./collection-container.module.scss";
import flatten from 'flat';
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
    this.setState({
      masterPath: this.props.masterPath,
      masterAssetId: this.props.masterAssetId,
    });

    getAssetByIdAsync(this.state.masterAssetId).then((result) =>
      this.setState({ path: result.path })
    );
  }

  render() {
  const breadCrumps=flatten(this.props.tags)
  let breadCrumpsTags=[];
  for (let [key, value] of Object.entries(breadCrumps)) {
    console.log('flatened',`${key}: ${value}`);
    breadCrumpsTags.push(value);
    
  }
  breadCrumpsTags=breadCrumpsTags.map(tag=>`${tag} >`)
  let sliced=breadCrumpsTags[breadCrumpsTags.length - 1].slice(0,-1);
  breadCrumpsTags.pop()
  breadCrumpsTags.push(sliced)
    console.log('bread',breadCrumpsTags)
   
    return (
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={`images/${this.state.path}`} alt="img" />
        </div>

        <div className={styles.title}>{this.props.name}</div>
    <div className={styles.button}>{this.props.children} <span className={styles.crumps}>{breadCrumpsTags}</span></div>
      </div>
    );
  }
}

export default collectionItem;
