import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import LoginForm from './components/loginform/LoginForm';

function App() {
  const URL = "http://localhost:8080"

  const [userInfo,setUserInfo] = useState();

  const [isLoggedIn,setIsLoggedIn] = useState(false);

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

      <Header/>
      <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} userInfo={userInfo}/>}></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
          <Route path="/createAccount" element={<></>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
