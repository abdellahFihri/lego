import React,{Component} from 'react';
import styles from './collection-container.module.scss';
import {getAssetByIdAsync} from '../../../data';

class collectionItem extends Component{
    // uniqueId,masterPath,name,children,masterAssetId
    constructor(props){
        super(props)
        this.state={
            masterAssetId:this.props.masterAssetId,
path:'',
masterPath:''
        }
    }
    // let path=masterPath;
    componentDidMount(){
        console.log('main col id ',this.props.mainCollectionId)
        console.log('log in masterid',this.props.masterAssetId)
        console.log('masterCollection id',this.props.masterCollectionId)
        console.log('log in unique id ',this.props.uniqueId)
        console.log('masterpath ',this.props.masterPath)
        
       this.setState({masterPath:this.props.masterPath,masterAssetId:this.props.masterAssetId})

getAssetByIdAsync(this.state.masterAssetId).then(result => 
    this.setState({path:result.path})
    )

        // getAssetByIdAsync(this.props.masterAssetId).then(result => 
        //     this.setState({path:result.path})
        // )
        // switch(this.props.masterAssetId){
            //     case this.props.masterAssetId!==this.props.uniqueId :
        //         getAssetByIdAsync(this.props.uniqueId).then(result => 
        //             this.setState({path:result.path})
        //         )
        //         break;
        //     case this.props.masterAssetId:
        //         getAssetByIdAsync(this.props.masterAssetId).then(result => 
        //             this.setState({path:result.path})
        //         )
        //         break;
        //             case this.props.uniqueId===this.props.masterAssetId :
        //                 return
                        
        //                 default:
        //                     return;
            
        // }
        // if(this.props.uniqueId){
        // console.log('log in collection item ',this.props.uniqueId)
        // }
        // getAssetByIdAsync(this.props.masterAssetId ||this.props.uniqueId).then(result => 
        //     this.setState({path:result.path})
        // )
        // if(this.props.uniqueId && this.props.uniqueId!==this.props.masterAssetId ){
            //     getAssetByIdAsync(this.props.uniqueId).then(result => 
            //         this.setState({path:result.path})
            //     )
            // }
           
                // this.setState({path:this.props.masterPath})
        //         if( !this.props.uniqueId){
                    
        // getAssetByIdAsync(this.props.masterAssetId).then(result => 
        //     this.setState({path:result.path})
        // )
        //         }
        //         else{
        //             getAssetByIdAsync(this.props.uniqueId).then(result => 
        //                 this.setState({path:result.path})
        //             )
        //         }
 
        }
    



    // if(uniqueId){
    // getAssetByIdAsync(uniqueId).then(result => 
    //     path=result.path
    // )
    // }
    render(){
        console.log('main col id ',this.props.mainCollectionId)
        console.log('log in masterid',this.props.masterAssetId)
        console.log('masterCollection id',this.props.masterCollectionId)
        console.log('log in unique id ',this.props.uniqueId)
        console.log('masterpath ',this.props.masterPath)
        console.log('state masterpath',this.state.masterPath)
        console.log(this.state)
    return(
        <div className={styles.paper}>
        <div className="image">
            <img src={`images/${this.state.path}`} alt=""/>
            {/* <img src={`images/${this.props.masterPath!==this.state.path?this.props.masterPath:this.state.path}`} alt=""/> */}
             {/* <img src={`images/${this.props.masterPath && this.props.masterPath!==this.state.path&&
                this.props.mainCollectionId===this.props.masterCollectionId?this.props.masterPath:this.state.path}`} alt=""/> */}
{this.props.name} 
        </div>
        {/* {this.props.number} */}
        {this.props.children}
    </div>
    )
    }
}

export default collectionItem;