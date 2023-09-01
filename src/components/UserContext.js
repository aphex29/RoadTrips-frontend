import {React,createContext, useContext, useState} from 'react'


const UserContext = createContext();

export const UserProvider =({children}) =>{
  const [userInfo,setUserInfo] = useState({});
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  return(
    <UserContext.Provider value={{userInfo,setUserInfo,isLoggedIn,setIsLoggedIn}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser=()=>useContext(UserContext);