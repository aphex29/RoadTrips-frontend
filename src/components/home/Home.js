import {React,useState} from 'react';
import LoginForm from '../loginform/LoginForm';

function Home(props){

  const { isLoggedIn, setIsLoggedIn, setUserInfo, userInfo } = props;
  
  return (

      <div>
        {userInfo}
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