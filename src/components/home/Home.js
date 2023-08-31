import {React,useState, useEffect} from 'react';


function Home(props){

  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } = props;
  
  return (
 
      <div>  
        {
          !isLoggedIn &&
          <div>
            Please <a href="/login">Login</a> to continue
          </div>
        }        
      </div>
    
    

  )
}

export default Home;