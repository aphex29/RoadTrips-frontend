import {React, useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';


function UserProfile(props) {

  const {isLoggedIn,  setIsLoggedIn} = props;
  const {userInfo,setUserInfo} = useUser();
  

  return (
    

    
    <div>           
      {userInfo.id}
      <br/>
      {userInfo.email}
      <br/>
      {userInfo.username}
      <br/>
      {userInfo.firstName}
      <br/>
      {userInfo.lastName}           
    </div>


  )
}

export default UserProfile