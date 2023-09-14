import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function LoginFormContainer() {
  const URL = 'http://localhost:8080/';
  const {userInfo,setUserInfo,isLoggedIn,setIsLoggedIn} = useUser();
  const[login,setLogin] = useState({
    username:"",
    password:""
  });

  const handleSubmit = async(e) =>{
    e.preventDefault();
    let response = axios.post(URL + 'api/v1/verify', login)
      .then(response => {
        console.log(response);
        setUserInfo(response.data);      
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.log(error);
        alert("Invalid credentials");
      });     
  }

  const handleChange = ({target}) => {
    const {name,value} = target;
    setLogin((prev) => ({...prev, [name]: value}));
  }

  return(
    <div>
      <LoginForm  handleSubmit={handleSubmit}
                  handleChange={handleChange} 
                  username={login.username} 
                  password={login.password}/>
      {isLoggedIn && <Navigate to={"/profile/"+userInfo.username}/>}
      <div>No account? Create one <a href="/create" >here</a>.</div>    
    </div>
  )
}

export default LoginFormContainer;