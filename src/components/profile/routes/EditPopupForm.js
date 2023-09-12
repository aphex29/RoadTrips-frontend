import React, { useEffect, useState } from 'react'
import './Routes.css';





function EditPopupForm(props) {
  const {submitHandler,changeHandler,origin,destination,setShowAdd,waypointHandler} = props;

  const [waypoint,setWaypoint] = useState(0);

  function generateField(){
    if (waypoint<16){
      setWaypoint(waypoint+1);
    }
    
  }

  function handleChange(){

  }

  useEffect(()=>{

  },[waypoint])


  const waypointFields = [...Array(waypoint).keys()].map(num=>{
    return(
      <input type="text" placeholder="waypoint" id={num} key={num} onChange={waypointHandler}></input>   
    )
  });

  return (
    <div className="addPopup d-flex flex-column align-items-center">
      <button onClick={generateField}>Add waypoint field</button>
      <div className="mt-5">
        
            <form onSubmit={submitHandler} className="editingForm">
              <label>
              
              <input type="text" placeholder="Origin" id="origin" onChange={changeHandler} value={origin} required></input>
              </label>
              <br/>


              {waypoint>0 &&
              <label>
                {waypointFields}
              </label>
              
              }
              <br/>
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