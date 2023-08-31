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

function App() {
  const URL = "http://localhost:8080"

  const {userInfo,setUserInfo} = useUser();
//const {userInfo,setUserInfo} = useState({});

  const [isLoggedIn,setIsLoggedIn] = useState(false);


  useEffect(()=>{
    const user = localStorage.getItem('user');
    setUserInfo(user);
  },[]);
  
  
  useEffect(()=>{
    localStorage.setItem('user', userInfo);
  },[userInfo]);


  // const getUsers = async() => {

  //   try{
  //     const response = await axios.get(URL+"/api/v1/users");
  //     console.log(response.data);
  //     setUser(response.data);
  //   }
  //   catch(err){
  //     console.log(err);
  //   }

    
  // }

  return (

    <div className="App">

      <Header isLoggedIn={isLoggedIn}/>
      <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
          <Route path="/login" element={<LoginFormContainer setUserInfo={setUserInfo} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} userInfo={userInfo}/>}></Route>
          <Route path="/profile/" element={<UserProfile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
          <Route path="/createAccount" element={<></>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
