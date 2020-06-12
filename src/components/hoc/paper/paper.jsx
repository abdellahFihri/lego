import React,{Component} from 'react';
import styles from './paper.module.scss';
import {getAssetByIdAsync}from '../../../data';








class  Paper extends Component{
    constructor(props){
        super(props)
            this.state={
                 path:'',
                
            }
        
    }
   
    // let id=parseInt(masterAssetId)
    componentDidMount(){
       
        getAssetByIdAsync(this.props.masterAssetId).then(result => 
           this.setState({path:result.path}) 

    
       
        
        
        
        )
        // this.setState({masterPath:this.props.masterPath})
         if(this.props.masterPath){
            this.setState({path:this.props.masterPath}) 
         }
    }
        render(){
            console.log('masterpath in paper',this.props.masterPath)
                return(
                    <div className={styles.paper}>
                        <div className="image">
                            <img src={`images/${
                            
                            this.state.path}`} alt=""/>
            {this.props.name}  
                        </div>
                        {this.props.children}
                    </div>
                )
        }
   
   
}
export default Paper;