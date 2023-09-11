import React, { useEffect, useState } from 'react'
import './Routes.css';





function EditPopupForm(props) {
  const {submitHandler,changeHandler,origin,destination,setShowAdd} = props;

  const [waypoint,setWaypoint] = useState(0);

  const generateField = () =>{
    setWaypoint(waypoint+1);

  }

  useEffect(()=>{
    
  },[waypoint])



  return (
    <div className="addPopup">
      <button onClick={()=>generateField}>Add waypoint field</button>
      <div className="d-flex justify-content-end p-2 position-fixed">
        
            <form onSubmit={submitHandler} className="editingForm">
              <label>
              
              <input type="text" placeholder="Origin" id="origin" onChange={changeHandler} value={origin} required></input>
              </label>
              <br/>


              {waypoint>0 &&
              <></>
              
              }

              <label>
                <input type="text" placeholder="Destination" id="destination" onChange={changeHandler} value={destination} required></input>
              </label> 
              
              <br/> 
              <label>          
                <button type="submit">Add</button>
                <button onClick={()=>{setShowAdd(false);}}>Close</button>
              </label>
            </form>          
        </div>
      </div>
      
  )
}

export default EditPopupForm