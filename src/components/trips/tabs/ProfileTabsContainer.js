import React, { useEffect, useState } from 'react'
import '../Trips.css'
import {RouteDetails} from './RouteDetails';
import {RouteNotes} from './RouteNotes';
import {PointsOfInterest} from './PointsOfInterest';
function ProfileTabsContainer(props) {

  const {routeInfo} = props;

  const [isDetails,setIsDetails] = useState(true);
  const [isNotes,setIsNotes] = useState(false);
  const [isPOI,setIsPOI] = useState(false);



 


  function onClickRouteDetails(){
    setIsDetails(!isDetails);
    setIsNotes(false);
    setIsPOI(false);
    
  }

  function onClickNotes(){
    setIsNotes(!isNotes);
    setIsDetails(false);
    setIsPOI(false);
  }

  function onClickShowPOI(){
    setIsPOI(!isPOI);
    setIsDetails(false);
    setIsNotes(false);
  }
  

  return (
    <>
    <div className="tabs d-flex justify-content-center mt-5 ">
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
          <div>Interested Points</div>
          </a>
        </li>

      </ul>
    </div>

    <>
      {isDetails &&
        <RouteDetails waypoints={routeInfo.waypoints}/>
      }

      {isNotes &&
        <RouteNotes/>
      }
      {isPOI &&
        <PointsOfInterest/>
      }

    </>
  </>
  )
}

export default ProfileTabsContainer