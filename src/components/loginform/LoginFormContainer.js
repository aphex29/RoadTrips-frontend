import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { convertArrayToObject } from '../response/Helpers';
import { Navigate } from 'react-router-dom';
import axios from 'axios';




function LoginFormContainer(props) {

  const{setIsLoggedIn,setUserInfo} = props;

  const[login,setLogin] = useState({
    username:"",
    password:""
  });

 


  const [accountVerified, setAccountVerified] = useState(null)
  useEffect(() => {
      const getPerson = async () => {
          let response = await axios.post('http://localhost:8080/api/get/person', {username:login.username})
            .catch(error => console.log(error));
          console.log(response);
          if (response.data !== null) {
              setUserInfo(response.data);
              setIsLoggedIn(true);
          }

      }
      if (accountVerified){
        getPerson();
      }
    getEducation()
  }, []);
  
  
  const[isValid,setIsValid] = useState(false)
  const handleSubmit = async(e) =>{
    e.preventDefault();
    let response = axios.post('http://localhost:8080/api/v1/verify', login)
      .catch(error => console.log(error));
      if (response!==null){
        setAccountVerified(true)

      }
      else{
        setAccountVerified(false)
      }
      if (!accountVerified){
        setIsValid(false)
      }
  }

  const handleChange = ({target}) => {
    const {name,value} = target;
    if (name==="username"){
      setLogin((prev) => ({...prev, [name]: value.replace(/\s/g, '')}));
    }
    else{
      setLogin((prev) => ({...prev, [name]: value}));
    }
  }



  return(
    <div>
      <LoginForm  handleSubmit={handleSubmit}
                  handleChange={handleChange} 
                  username={login.username} 
                  password={login.password}/>
      {accountVerified && <Navigate to={"/"}/>}
    </div>
  )
  
}





export default LoginFormContainer