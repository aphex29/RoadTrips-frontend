import {React,useState, useEffect} from 'react';
import { useUser } from '../UserContext';


function Home(props){
  
  const {userInfo,isLoggedIn} = useUser();

  return (
 
      <div>  
        {!isLoggedIn 
          ?<div>
            Please <a href="/login">Login</a> to continue
          </div>
          :<div>Welcome, {userInfo.firstName}</div>
        }
                
      </div>
    
    

  )
}

export default Home;