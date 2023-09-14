import React from 'react'
import '../Trips.css'
import { selectListHelper } from './helper/selectListHelper';

function PointsOfInterest(props) {
  const {waypoints} = props;

  let listWaypoints = selectListHelper(waypoints);


  return (
    <select className="dropdownMenu form-select form-select-sm mt-5 d-flex justify-content-center" onChange={(e)=>handleChange(e)} >
        <option value={"1"}>Select</option>
        {listWaypoints}
      </select>
   
  )
}

export {PointsOfInterest}