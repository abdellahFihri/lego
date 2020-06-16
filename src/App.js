import React, { Component } from "react";
import Navbar from "./components/navbar/navbar";
import fav from "./assets/master.png";
import {
  getCollectionsAsync,
  getAssetByIdAsync,
  getAssetsByCollectionAsync,
} from "./data";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import _ from "lodash";
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
      masterPath: "",

      masterAssets: [],
    };
  }
  componentDidMount() {
    getCollectionsAsync().then((result) =>
      this.setState({ collection: result })
    );
  }

  handleSort(sortBy) {
    const { collectionAssets } = this.state;
    const sortedAssests = collectionAssets.sort(function (a, b) {
      switch (sortBy) {
        case "asc":
          return a.name === b.name ? 0 : +(a.name > b.name) || -1;

        case "desc":
          return a.name === b.name ? 0 : +(a.name < b.name) || -1;
        case "idAsc":
          return a.id === b.id ? 0 : +(a.id > b.id) || -1;
        case "idDesc":
          return a.id === b.id ? 0 : +(a.id < b.id) || -1;

        default:
          return "";
      }
    });
    this.setState({ collectionAssets: sortedAssests });
  }

  handleMasterAsset = (id, collectionId) => {
    const { collection, masterAssets } = this.state;
    let collections = collection;
    let mastersArray = masterAssets;
    mastersArray.push({ collectionId: collectionId, assetId: id });

    let filteredMasters = _.uniqBy(
      _.map(mastersArray, function (a) {
        return a.collectionId === collectionId
          ? { collectionId: collectionId, assetId: id }
          : a;
      }),
      "collectionId"
    );

    const newArray = collections.map((obj) =>
      obj.id === collectionId ? { ...obj, masterAssetId: id } : obj
    );
    this.setState({ collection: newArray });
    getAssetByIdAsync(id).then((result) =>
      this.setState({
        masterPath: result.path,
        masterAssets: filteredMasters,
      })
    );
  };

  getCollectionAssets = (collectionId, masterId) => {
    let id = collectionId;
    this.handleMasterAsset(masterId, id);
    getAssetsByCollectionAsync(id).then((result) =>
      this.setState({ collectionAssets: result })
    );
  };

  render() {
    const {
      collection,
      masterPath,
      collectionAssets,
      masterAssets,
    } = this.state;

    return (
      <div className="App">
        <Navbar />

        <Container className="container">
          <Container className="row">
            <div className="col-lg-4">
              {collection.map((collection) => (
                <CollectionItem
                  name={collection.name}
                  key={collection.masterAssetId}
                  masterAssetId={collection.masterAssetId}
                  masterPath={masterPath}
                  tags={collection.tags}
                >
                  <Button
                    btnText="View collection"
                    id={collection.id}
                    onClick={() =>
                      this.getCollectionAssets(
                        collection.id,
                        collection.masterAssetId
                      )
                    }
                  />
                </CollectionItem>
              ))}
            </div>

            <div className="col-lg-8">
              {collectionAssets.length ? (
                <DropdownButton id="dropdown-basic-button" title="Sort by...">
                  {[
                    { action: "asc", label: "Sort by name A-Z" },
                    { action: "desc", label: "Sort by name Z-A" },
                    { action: "idAsc", label: "Sort by id asc" },
                    { action: "idDesc", label: "Sort by id desc" },
                  ].map((item) => (
                    <Dropdown.Item
                      href=""
                      key={item.action}
                      onSelect={() => this.handleSort(item.action)}
                    >
                      {item.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              ) : (
                ""
              )}
              <Container className="row">
                {collectionAssets.map((asset) => (
                  <Container key={asset.id} className="col-lg-4">
                    <Paper
                      key={asset.id}
                      name={asset.name}
                      masterAssetId={asset.id}
                    >
                      {!_.find(masterAssets, { assetId: asset.id }) ? (
                        <Button
                          btnText="Make master"
                          onClick={() =>
                            this.handleMasterAsset(asset.id, asset.collectionId)
                          }
                        />
                      ) : (
                        <img className="star" src={fav} alt="fav" />
                      )}
                    </Paper>
                  </Container>
                ))}
              </Container>
            </div>
          </Container>
        </Container>
      </div>
    );
  }
}

export default App;
