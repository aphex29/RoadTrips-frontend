import React, { useEffect, useState } from 'react'
import '../Trips.css'
import {RouteDetails} from './RouteDetails';
import {RouteNotes} from './RouteNotes';
import {PointsOfInterest} from './PointsOfInterest';
function ProfileTabsContainer(props) {

  const {routeInfo,map} = props;

  const [isDetails,setIsDetails] = useState(true);
  const [isNotes,setIsNotes] = useState(false);
  const [isPOI,setIsPOI] = useState(false);

  function onClickRouteDetails(){
    setIsDetails(true);
    setIsNotes(false);
    setIsPOI(false);
    
  }

  function onClickNotes(){
    setIsNotes(true);
    setIsDetails(false);
    setIsPOI(false);
  }

  function onClickShowPOI(){
    setIsPOI(true);
    setIsDetails(false);
    setIsNotes(false);
  }
  

  return (
    <>
    <div className="tabs d-flex justify-content-center mt-5">
      <ul className="tabContainer nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active"  onClick={onClickRouteDetails} style={{"cursor":"pointer"}}> 
            <div>Route Details</div>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" onClick={onClickNotes} style={{"cursor":"pointer"}}> 
          <div>Notes</div>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" onClick={onClickShowPOI} style={{"cursor":"pointer"}}> 
          <div>Points of Interest</div>
          </a>
        </li>

      </ul>
    </div>

    <>
      {isDetails &&
        <RouteDetails waypoints={routeInfo.waypoints}/>
      }

      {isNotes &&
        <RouteNotes waypoints={routeInfo.waypoints} map={map}/>
      }
      {isPOI &&
        <PointsOfInterest waypoints={routeInfo.waypoints} map={map}/>
      }

    </>
  </>
  )
}

export default ProfileTabsContainer