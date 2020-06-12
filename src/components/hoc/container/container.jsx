import React from 'react';

  const container=({className,children})=>{
    return(
        
            <div className={className}>
                {children}
            </div>
    )
};
export default container;