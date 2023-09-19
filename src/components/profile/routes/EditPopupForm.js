import React, { useState } from 'react'
import './Routes.css';
import AutoComplete from '../autocomplete/AutoComplete';
import axios from 'axios';
import { useUser } from '../../UserContext';

const EditPopupForm= (props) => {
  
  const {setShowAdd,setRoutes,routes} = props;
  const {userInfo} = useUser();
  
  const [waypoint,setWaypoint] = useState(0);
  const [placeObj,setPlaceObj] = useState({
    userId:userInfo.id,
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


  const handleSubmit = (e) =>{
    e.preventDefault();
    //In case user adds a waypoint but does not fill out the waypoint field to keep a clean array with just values and no empty strings/undefined values
    let cleanedArr = placeObj.waypoints.filter((waypoint)=>waypoint!=="");
    setPlaceObj((prev) => ({...prev,["waypoints"]:[...cleanedArr]}));;
    axios.post('http://localhost:8080/api/v1/route',placeObj)
    .then(response=>{
      console.log(response);
      let routeArray = [...routes];
      routeArray.push(response.data);
      setRoutes(routeArray);
      setShowAdd(false);
    })
    .catch(error=>{
      console.log(error);
    });
  }

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