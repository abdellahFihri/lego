import React from 'react';
import  './container.scss';

  const container=({className,children})=>{
    return(
        
            <div id="container" className={className}>
                {children}
            </div>
    )
};
export default container;