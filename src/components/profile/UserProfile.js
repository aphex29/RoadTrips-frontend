import {React, useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';


function UserProfile() {
  const URL = 'http://localhost:8080/';

  const {userInfo,setUserInfo,isLoggedIn, setIsLoggedIn} = useUser();
  const [routes,setRoutes] = useState(null);
  
  const listRoutes = userInfo.routes.map(route=>
    {
      return <div key={route.id} style={{"flexBasis":"30%"}} >Origin: {route.origin} --&#62; Destination: {route.destination}</div>;
    });



  return (
    <div className="vh-100" style={{"width":"99vw","background":"rgb(61, 61, 61)","color":"white"}}>
      Here are your currents routes:
      <div className="d-flex flex-row justify-content-around align-items-center h-100" style={{"flexWrap":"wrap"}}>                    
          {listRoutes}        
      </div>
    </div>
  )
}

export default UserProfile