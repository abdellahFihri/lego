import React, { Component } from "react";
import Navbar from './components/navbar/navbar';
import fav from './assets/master.png';
import {
  getCollectionsAsync,
  getAssetByIdAsync,
  getAssetsByCollectionAsync,
} from "./data";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import _ from 'lodash';
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

  handleSort(sortBy){
    console.log('sort fired',sortBy)
    const sortedAssests=
    this.state.collectionAssets.sort(function(a, b){
      switch(sortBy){
        case 'asc':
      return a.name === b.name ? 0 : +(a.name > b.name) || -1;
  
      case 'desc':
        return a.name === b.name ? 0 : +(a.name < b.name) || -1;
        case 'idAsc':
          return a.id === b.id ? 0 : +(a.id > b.id) || -1;
          case 'idDesc':
            return a.id === b.id ? 0 : +(a.id < b.id) || -1;
    
      default:
        return'';
      }
    });
    console.log('sorted obj',sortedAssests)
    this.setState({collectionAssets:sortedAssests})
  }

  handleMasterAsset = (id, collectionId) => {
    let collections = this.state.collection;
    console.log("collections", collections);
    let mastersArray=this.state.masterAssets;
    mastersArray.push({collectionId:collectionId,assetId:id})

    let filteredMasters = _.uniqBy( _.map(mastersArray, function(a) {
      return a.collectionId === collectionId ? {collectionId: collectionId, assetId: id} : a;
    }),'collectionId')
    
    console.log('masters array push ',filteredMasters)
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
        masterAssets:filteredMasters
       
      })
    );
  };

  getCollectionAssets = (collectionId,masterId) => {
    let id =collectionId;
    this.handleMasterAsset(masterId,id)
    getAssetsByCollectionAsync(id).then((result) =>
      this.setState({ collectionAssets: result })
    );
  };

  render() {
    console.log("state in app", this.state);

    return (
      <div className="App">
        <Navbar/>
        
        <Container className="container">
          <Container className="row">
            <div className="col-lg-4">
              
              {this.state.collection.map((collection) => (
                <CollectionItem
                  name={collection.name}
                  key={collection.masterAssetId}
                  mainCollectionId={collection.id}
                  masterAssetId={collection.masterAssetId}
                  masterCollectionId={this.state.masterCollectionId}
                  masterPath={this.state.masterPath}
                  uniqueId={this.state.uniqueId}
                  tags={collection.tags}
                >
                  <Button
                    btnText="View collection"
                    id={collection.id}
                    name={collection.masterAssetId}
                    
                    onClick={()=>this.getCollectionAssets(collection.id,collection.masterAssetId)}
                    
                    
                  />
                </CollectionItem>
              ))}
            </div>

            <div className="col-lg-8">
              {this.state.collectionAssets.length?
             
              <DropdownButton id="dropdown-basic-button" title="Sort by...">
          {[{action:'asc',
    label:'Sort by name A-Z'
  },
  {action:'desc',
    label:'Sort by name Z-A'
  },
  {action:'idAsc',
    label:'Sort by id asc'
  },
  {action:'idDesc',
    label:'Sort by id desc'
  }
  ].map(item=>
          <Dropdown.Item href="" onSelect={()=>this.handleSort(item.action)}>{item.label}</Dropdown.Item>
            )}

</DropdownButton>
             :'' 
             }
                  <Container className="row">

                {this.state.collectionAssets.map((asset) => (
                  <Container key={asset.id} className="col-lg-4">
                    <Paper
                      key={asset.id}
                      name={asset.name}
                      number={asset.collectionId}
                      masterAssetId={asset.id}
                    >
                      { !_.find(this.state.masterAssets,{assetId:asset.id})
                     ?   (
                        <Button
                          btnText="Make master"
                          key={asset.id}
                          name={asset.collectionId}
                          onClick={() =>
                            this.handleMasterAsset(asset.id, asset.collectionId)
                          }
                        />
                      ) : (
                        <img className="star" src={fav} alt="fav"/>
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
