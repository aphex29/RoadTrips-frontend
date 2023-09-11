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


  const handleChange = ({target})=>{
    const {name, value} = target;
    setProfile((prev) => ({...prev, [name]: value}));
  }

  const handleSubmit = async (e)=>{
    setValid(false);
    e.preventDefault();
    setMsg("");
    dataCheck();

    if (valid){
      createUser();
    }
  }

  function createUser(){
    axios.post(URL + 'api/v1/users',profile)
      .then(response=>{
        console.log(response.data);
        setUserInfo(response.data);
        setIsLoggedIn(true);
      })
      .catch(error=>console.log(error));
  }

  
  const [msg,setMsg]=useState("");
  function dataCheck(){
    const regex = /\W|\d/;
    let found = regex.test(profile.firstName);
    if (found){
      setMsg("No special characters or numbers in first name allowed");
      return;
    }
    found = regex.test(profile.lastName);
    if (found){
      setMsg("No special characters or numbers in last name allowed");
      return;
    }

    try{
      const res = axios.post(URL + 'api/v1/verify/creation', profile)
      .then(res=>{
        console.log(res);
        if (!res.data){
          setMsg("Username or email in use");
          return;
        }
        
        setValid(true);
      })   
    }
    catch(error){
      console.log(error);
      return;
    }

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

        <><span style={{"color":"red"}} >{msg}</span></>

        {isLoggedIn && <Navigate to={"/profile/"+userInfo.username}/>}
    </>
  )
}

export default CreateFormContainer