import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import LoginForm from './components/loginform/LoginForm';
import LoginFormContainer from './components/loginform/LoginFormContainer';
import UserProfile from './components/profile/UserProfile';
import { useUser } from './components/UserContext';
import CreateFormContainer from './components/createform/CreateFormContainer';
import TripsContainer from './components/trips/TripsContainer';

function App() {
  const URL = "http://localhost:8080"

  const {userInfo,setUserInfo,isLoggedIn,setIsLoggedIn} = useUser();


  useEffect(()=>{
    const user = localStorage.getItem('user');
    setUserInfo(JSON.parse(user));
    const bool = localStorage.getItem('logged');
    setIsLoggedIn(JSON.parse(bool));
  },[]);
  
  
  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(userInfo));
  },[userInfo]);

  useEffect(()=>{
    localStorage.setItem('logged', JSON.stringify(isLoggedIn));
  },[isLoggedIn]);

  return (

    <div className="App">

      <Header isLoggedIn={isLoggedIn}/>
      <Routes>
          <Route path="/" 
                element={<Home/>}/>

          <Route path="/login" 
                element={<LoginFormContainer/>}/>

          <Route path={"/profile/"+userInfo.username} 
                element={<UserProfile/>}/>  
                          
          <Route path="/create" 
                element={<CreateFormContainer/>}/>

          <Route path="/trip/:routeId"
                element={<TripsContainer/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
