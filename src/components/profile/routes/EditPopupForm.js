import React, {  useEffect, useRef, useState } from 'react'
import './Routes.css';
import AutoComplete from '../autocomplete/AutoComplete';

const EditPopupForm= (props) => {
  
  const {setShowAdd} = props;

  

  
  const [waypoint,setWaypoint] = useState(0);
  const [placeObj,setPlaceObj] = useState({
    origin:"",
    destination:"",
    waypoints:[]
  });

  //Limit user to input up to 16 exta waypoints for their route
  function generateField(){
    if (waypoint<16){
      setWaypoint(waypoint+1);
      let prevArr = [...placeObj.waypoints];
      prevArr.push("");
     
      setPlaceObj((prev)=>({
        ...prev,
        waypoints:prevArr
      }));
     
    }
  }

  function removeField(){
    if (waypoint>0){
      setWaypoint(waypoint-1);
      let prevArr = [...placeObj["waypoints"]]
      prevArr.pop();
      setPlaceObj({
        ...placeObj,
        waypoints:prevArr
      });
    }
  }


  const handleSubmit = () =>{

  }


  //useRef to prevent undefined errors and wait for the placeObj to be set with a useable value where placeObj is the entire address_component array ready to be parsed 
  const preInitialize = useRef(false);
  useEffect(() => {
    if (preInitialize.current){
      console.log(placeObj)
    }
    preInitialize.current = true;
  }, [placeObj])
    


  //Using the keys of an arbitrary array to use as an id, in order to update the correct waypoint form fields
  const waypointFields = [...Array(waypoint).keys()].map(num=>{
    return(
      <AutoComplete objId={num} placeholder="Waypoint" setPlaceObj={setPlaceObj} placeObj={placeObj}/>      
    )
  });

    return (
      <div className="addPopup d-flex flex-column align-items-center">
        <button onClick={generateField}>Add waypoint field</button>
        <button onClick={removeField}>Remove waypoint field</button>
        <div className="mt-5">

          <form className="d-flex flex-column" onSubmit={handleSubmit} >
            <AutoComplete objId={"origin"} placeholder="Origin" setPlaceObj={setPlaceObj} placeObj={placeObj}/>
            {waypointFields}
            <AutoComplete objId={"destination"} placeholder="Destination" setPlaceObj={setPlaceObj} placeObj={placeObj}/>
            <button type="submit">Submit</button>
          </form>
         
        </div>
        <div className="d-flex flex-end align-items-end h-100 mb-3">
          <button onClick={()=>{setShowAdd(false);}}>Close</button>
        </div>
      </div> 
    )
  

 
}
export default EditPopupForm