import React from 'react'
import './Trips.css'
import axios from 'axios';


function Gmaps(props) {
  const {routeInfo} = props;
  let api= process.env.REACT_APP_API_KEY;
  
  let waypoints = routeInfo.waypoints;

  let waypointAddr = [...waypoints].map((waypoint)=>waypoint.address);
  waypointAddr.pop();
  waypointAddr.shift();
  let waypointStr = [...waypointAddr].join("|");

 

  let URL = "https://www.google.com/maps/embed/v1/directions?key=" + api + "&zoom=8" + "&origin=" + waypoints[0].address + "&destination=" + waypoints[waypoints.length-1].address + "&avoid=tolls";
  if (waypointStr!==""){
    URL = URL+"&waypoints="+waypointStr;
  }

  
  return (
    <div className="mapContainer mt-5 d-flex justify-content-center"> 
      <div className="mapBorder">
        <iframe
        width="100%"
        height="100%"
        src={URL}>
      </iframe>
      </div>
    </div>
  )
}

export default Gmaps