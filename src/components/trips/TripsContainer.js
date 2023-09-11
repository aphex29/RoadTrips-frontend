import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios';
import Gmaps from './mapgen';
import './Trips.css';
import ProfileTabsContainer from './tabs/ProfileTabsContainer';

function TripsContainer() {
  const {routeId} = useParams();

  const [routeInfo,setRouteInfo] = useState();
  

  useEffect(()=>{   
    let response = axios.get("http://localhost:8080/api/v1/route/"+routeId)
    .then(response=>{
      console.log(response);
      setRouteInfo(response.data);
      
    })
    .catch(error=>console.log(error));
  },[]);



  return (
    <>
    
    {routeInfo &&
    <>
      <Gmaps/>
    
      <ProfileTabsContainer routeInfo={routeInfo}/>
    </>
    }
    </>
  )
}

export default TripsContainer