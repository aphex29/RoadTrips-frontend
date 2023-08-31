import React, { useState, useEffect} from 'react';
import LoginForm from './LoginForm';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';




function LoginFormContainer(props) {

  const URL = 'http://localhost:8080/';

  const {userInfo,setUserInfo} = useUser();

  const{setIsLoggedIn, isLoggedIn} = props;



  const[login,setLogin] = useState({
    username:"",
    password:""
  });

 


  const [accountVerified, setAccountVerified] = useState(null)
  // useEffect(() => {
  //     const getPerson = async () => {
  //         let response = await axios.get('http://localhost:8080/api/users/'+login.username)
  //           .then((response) => response.json())
  //           .then(result => console.log(result))
  //           .catch(error => console.log(error));
  //         console.log(response);
  //     }
  //     if (accountVerified){
  //       getPerson();
  //     }
    
  // }, [accountVerified]);
  
  
  const[isValid,setIsValid] = useState(false)
  const handleSubmit = async(e) =>{
    e.preventDefault();
    let response = axios.post(URL + 'api/v1/verify', login)
      .then(response => {
        console.log(response);
        setUserInfo(response.data);
        setAccountVerified(true);
        setIsValid(true);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.log(error);
        setAccountVerified(false);
        setIsValid(false);
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
      {accountVerified && <Navigate to={"/profile/"+userInfo.username}/>}

      {!accountVerified && <p>Invalid Credentials</p>}
    </div>
  )
  
}





export default LoginFormContainer