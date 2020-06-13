import React,{Component} from 'react';
import styles from './paper.module.scss';
import {getAssetByIdAsync}from '../../../data';








class  Paper extends Component{
    constructor(props){
        super(props)
            this.state={
                masterId:'',
                mainCollectionId:'',
                uniqueId:'',
                assetCollectionId:'',
                 path:'',
                
            }
        
    }
   
    // let id=parseInt(masterAssetId)
    componentDidMount(){
        getAssetByIdAsync(this.props.masterAssetId).then(result => 
            this.setState({path:result.path}) 
         )
        
        // this.props.masterAssetId?
        // this.setState({masterId:this.props.masterAssetId}):
        // this.setState({masterId:this.state.masterAssetId})
        // this.props.mainCollectionId?
        // this.setState({mainCollectionId:this.props.mainCollectionId}):
        // this.setState({mainCollectionId:this.state.mainCollectionId})
        // this.props.uniqueId?
        // this.setState({uniqueId:this.props.uniqueId}):
        // this.setState({uniqueId:this.state.uniqueId})
        // this.props.number?
        // this.setState({assetCollectionId:this.props.number}):
        // this.setState({assetCollectionId:this.state.assetCollectionId})

        // if(this.state.mainCollectionId===this.state.assetCollectionId && this.state.mainCollectionId!==){
        //     console.table('THEY MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATCH',this.state.mainCollectionId,this.state.assetCollectionId)
        // }
    // if( this.state.mainCollectionId===this.state.assetCollectionId && this.props.masterAssetId!==this.state.masterId)
    //    {
    //     getAssetByIdAsync(this.props.masterId).then(result => 
    //        this.setState({path:result.path}) 
    //     )
        // this.setState({masterPath:this.props.masterPath})
        //  if(this.props.masterPath){
        //     this.setState({path:this.props.masterPath}) 
        //  }
        // }
      
    }
        render(){
        //     console.log('state in paper',this.state)
             
        // console.log('in paper master id',this.props.masterAssetId)
        // // console.log('in paper asset collection id',this.props.assetCollectionId)
        //     console.log(' main collection id',this.props.mainCollectionId)
        //     console.log('in paper unique id',this.props.uniqueId)
        //     console.log('in paper assetCollection id',this.props.number)
                return(
                    <div className={styles.paper}>
                        <div className="image">
                            <img src={`images/${
                            
                            this.state.path}`} alt=""/>
            {this.props.name} 
                        </div>
                        {this.props.number}
                        {this.props.children}
                    </div>
                )
        }
   
   
}
export default Paper;