import React, { Component } from "react";
import {
  getCollectionsAsync,
  getAssetByIdAsync,
  getAssetsByCollectionAsync,
} from "./data";
import Paper from "./components/hoc/paper/paper";
import Button from "./components/hoc/button/button";
import Container from "./components/hoc/container/container";
import CollectionItem from "./components/hoc/collection-container/collection-container";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      collection: [],
      collectionAssets: [],
      masterCollectionId: "",
      masterPath: "",
      uniqueId: "",
      masterAssets:[]
    };
  }
  componentDidMount() {
    getCollectionsAsync().then((result) =>
      this.setState({ collection: result })
    );
  }

  handleMasterAsset = (id, collectionId) => {
    let collections = this.state.collection;
    console.log("collections", collections);
    let mastersArray=[];
    mastersArray.push(id)
    const newArray = collections.map((obj) =>
      obj.id === collectionId ? { ...obj, masterAssetId: id } : obj
    );
    console.log("col id in function", id, collectionId, collections, newArray);
    this.setState({ collection: newArray });
    getAssetByIdAsync(id).then((result) =>
      this.setState({
        uniqueId: id,
        masterCollectionId: result.collectionId,
        masterPath: result.path,
        masterAssets:mastersArray
       
      })
    );
  };

  getCollectionAssets = (e) => {
    let id = parseInt(e.target.id);
    getAssetsByCollectionAsync(id).then((result) =>
      this.setState({ collectionAssets: result })
    );
  };

  render() {
    console.log("state in app", this.state);
    return (
      <div className="App">
        <h1>Sitecore app</h1>
        <Container className="container">
          <Container className="row">
            <div className="col-md-4">
              {this.state.collection.map((collection) => (
                <CollectionItem
                  name={collection.name}
                  key={collection.masterAssetId}
                  mainCollectionId={collection.id}
                  masterAssetId={collection.masterAssetId}
                  masterCollectionId={this.state.masterCollectionId}
                  masterPath={this.state.masterPath}
                  uniqueId={this.state.uniqueId}
                >
                  <Button
                    btnText="View collection"
                    id={collection.id}
                    onClick={this.getCollectionAssets}
                  />
                </CollectionItem>
              ))}
            </div>

            <div className="col-md-8">
              the collection
              <Container className="row">
                {this.state.collectionAssets.map((asset) => (
                  <Container key={asset.id} className="col-md-4">
                    <Paper
                      key={asset.id}
                      name={asset.name}
                      number={asset.collectionId}
                      masterAssetId={asset.id}
                    >
                      {this.state.masterPath !== asset.path ? (
                        <Button
                          btnText="Set as master"
                          key={asset.id}
                          name={asset.collectionId}
                          onClick={() =>
                            this.handleMasterAsset(asset.id, asset.collectionId)
                          }
                        />
                      ) : (
                        ""
                      )}
                    </Paper>
                  </Container>
                ))}
              </Container>
            </div>
          </Container>
        </Container>
        <img src="/images/Bart.jpg" alt="img" />
      </div>
    );
  }
}

export default App;
