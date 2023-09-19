import React, { useEffect, useState } from 'react'
import '../Trips.css'
import { selectListHelper } from './helper/selectListHelper';
import { getByWaypoint } from '../TripsServices';
import axios from 'axios';

function PointsOfInterest(props) {
  const {waypoints,map} = props;
  const [currWaypoint,setCurrWaypoint] = useState(waypoints[0])
  let listWaypoints = selectListHelper(waypoints);

  console.log(currWaypoint);
  
  useEffect(()=>{
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currWaypoint.latitude},${currWaypoint.longitude}&radius=${10000}&key=AIzaSyA8rt9LCZJB6uOyzTOOCeUwF7YSbOd9MCE`;
    
    axios.get(url,{headers: {
      'Access-Control-Allow-Origin': '*',
    }})
    .then(response=>{
      console.log(response)
    })
    .catch(error=>console.log(error));

  },[currWaypoint])


  const handleChange = (e)=>{
    if (e.target.value!=="1")
    { 
      getByWaypoint(e.target.value)
      .then(response=>{
        console.log(response);
        map.panTo({lat: response.data.latitude, lng:response.data.longitude})
        setCurrWaypoint(response.data);
      });
    }
  }

  return (
    <select className="dropdownMenu form-select form-select-sm mt-5 d-flex justify-content-center" onChange={(e)=>handleChange(e)} >
        <option value={"1"}>Select</option>
        {listWaypoints}
      </select>
   
  )
}

export {PointsOfInterest}