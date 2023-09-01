import React, { useState } from 'react'
import CreateForm from './CreateForm'
import axios from 'axios';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';



function CreateFormContainer() {
  const {setUserInfo, userInfo, setIsLoggedIn, isLoggedIn} = useUser();

  const URL = 'http://localhost:8080/';
  const [valid,setValid] = useState(false);


  const [profile,setProfile] = useState({
    firstName:"",
    lastName:"",
    email:"",
    username:"",
    password:""
  })




  const handleSubmit = async(e)=>{
    
    let validation = axios.post(URL + 'api/v1/verify/creation', profile)
      .then(validation=>setValid(validation.data))
      .catch(error=>console.log(error));
    
    const createUser = async ()=> {
      let response = axios.post(URL + 'api/v1/users',profile)
      .then(response=> 
        {
          setUserInfo(response.data);
          console.log(response);
        })
      .catch(error=>{
        alert("Invalid username or email");
        console.log(error)});
      
    }

    if (valid){
      createUser();
      setIsLoggedIn(true);
    } 
    
  }

  const handleChange = ({target})=>{
    const {name, value} = target;
    setProfile((prev) => ({...prev, [name]: value}));
  }



  return (
    <>
      <CreateForm handleSubmit={handleSubmit} 
                  handleChange={handleChange} 
                  firstName={profile.firstName}
                  lastName={profile.lastName}
                  email={profile.email}
                  username={profile.username}
                  password={profile.password} />
        
        {isLoggedIn && <Navigate to={"/profile/"+userInfo.username}/>}
    </>
  )
}

export default CreateFormContainer