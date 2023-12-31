import React from 'react';

function Route(props) {
  const {listRoutes} = props;
  return (
    <div className="mt-5">
      <div className="d-flex flex-row justify-content-around h-100"  style={{"flexWrap":"wrap","rowGap":"10vh"}}>                
        {listRoutes}             
      </div>
    </div>    
  )
}

export default Route