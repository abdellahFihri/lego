import React,{Component} from 'react';
import {getCollectionsAsync,getAssetByIdAsync,getAssetsByCollectionAsync}  from './data';
import Paper from './components/hoc/paper/paper';
import Button from './components/hoc/button/button';
import Container from './components/hoc/container/container';
// import bart from './images/Bart.jpg';
import './App.css';

class App extends Component {
  // const collection=getCollectionsAsync();
  constructor(){
    super()
    this.state={
      collection:[],
      collectionAssets:[],
      masterIds:[],
      uniqueId:'',
      MasterPath:''
    }
  }
  componentDidMount(){

    getCollectionsAsync().then(result => 
      this.setState({collection:result,masterIds:result.map(collection=>collection.masterAssetId)})
      // this.setState({masterIds:result.map(collection=>collection.masterAssetId)})
      )
    //  let MasterAssetsIds=this.state.collection.map(collection=>collection.masterAssetId);
    //  this.setState({masterIds:MasterAssetsIds})
    //  console.log('master ids',MasterAssetsIds);
    
    
    //     getAssetByIdAsync().then(result => 
    // console.log(result))
  
    // getAssetByIdAsync(12).then(result => 
    //   console.log(result))
    
  }
  handleMasterAsset=(e)=>{
    this.setState({MasterPath:''})
    let id=parseInt(e.target.id)
    getAssetByIdAsync(id).then(result => 
     this.setState({MasterPath:result.path})
      )
     
  }
  
  // console.log(collection)
  // console.log(collection)
  // console.log(getAssetByIdAsync(14))
  // getAssetByIdAsync(14).then(result => 
  //   console.log(result))
  // console.log(getAssetsByCollectionAsync(1))
   getCollectionAssets=(event)=>{
    let id=parseInt(event.target.id);
    // console.log('fired',id);
    getAssetsByCollectionAsync(id).then(result => 
  this.setState({collectionAssets:result})
  )
  // console.log(this.state.collectionAssets,id)
  }


  render(){
  // console.log('collection in state ',this.state.collection)
// console.log('collection assets ',this.state.collectionAssets)
console.log(this.state)
  return (
    <div className="App">
     <h1>Sitecore app</h1>
<Container className="container">


       <Container className="row">
     <div className="col-md-4">
  {this.state.collection.map(collection=>
  <Paper name={collection.name}
  key={collection.id}
  masterAssetId={collection.masterAssetId}
  masterPath={this.state.MasterPath}
 >
 <Button
 btnText="View collection"
 id={collection.id}
 onClick={this.getCollectionAssets}/>
 </Paper>)}
 </div>

 
 <div className="col-md-8">
   the collection
   <Container className="row">
   
   {this.state.collectionAssets.map(asset=>
    <Container key={asset.id} className="col-md-4">
      <Paper key={asset.id}
      name={asset.name}
      // imgPath={asset.path}
      masterAssetId={asset.id}
      >
    <Button btnText="Set as master"
    id={asset.id}
    onClick={this.handleMasterAsset}
    />
      </Paper>
    </Container>)}
    </Container>
 </div>
 </Container>
 </Container>
 <img src="/images/Bart.jpg" alt="img"/>
    </div>
  );
}

}

export default App;
