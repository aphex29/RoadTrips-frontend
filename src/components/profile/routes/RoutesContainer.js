import React, { useEffect, useState } from 'react'
import './Routes.css'
import { useUser } from '../../UserContext';
import Route from './Route';
import { Button } from 'react-bootstrap';
import EditPopupForm from './EditPopupForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AutoComplete from '../autocomplete/AutoComplete';
import { formatAddress } from './helper/formatAddress';



function RoutesContainer() {
  
  const {userInfo, setUserInfo} = useUser();
  const[routes,setRoutes] = useState(userInfo.routes);
  const[showAdd,setShowAdd]= useState(false);
  const[isEditing,setIsEditing] = useState(false);
  
  //Update local storage to store the new routes array, whether a user creates or deletes a route
  useEffect(()=>{
    let userObj = {...userInfo};
    userObj.routes=routes;
    setUserInfo(userObj);
  },[routes])

  const deleteRoute =(id) =>{
    const body = {
      userId:userInfo.id,
      routeId:id
    }
    axios.post('http://localhost:8080/api/v1/route/delete',body)
    .then(()=>{
      let routeArray = [...routes];
      let index = routes.findIndex((route)=>route.id===id);
      routeArray.splice(index,1);
      setRoutes(routeArray);
    })
    .catch(error=>console.log(error));
  }

  //To dynamically update UI when the user presses  the Edit Trip button
  const [btnMsg,setBtnMsg]=useState("Edit Trip");

  function handleEditTrip(){
    setIsEditing(!isEditing);
    if (isEditing) setBtnMsg("Edit Trip");
    else setBtnMsg("Cancel Edit");
  }

  function handleDelete(id){
    deleteRoute(id);
  }

  
  //Redirect user when route card is clicked
  let navigate = useNavigate();
  function routeToTrip(id){
    navigate("/trip/"+id);
  }

  const listRoutes = routes.map(route=>{
      let origin = formatAddress(route.waypoints[0].address);
      let destination = formatAddress(route.waypoints[route.waypoints.length-1].address);
      if(!isEditing){
      return <div key={route.id} onClick={()=>routeToTrip(route.id)}className ="routeBorders routeInteract" style={{"flexBasis":"30%"}}>
          Your trip from {origin} to {destination}
        </div>;
      }
      else{
        return (
        <div key={route.id} className ="routeBorders routeInteract" style={{"flexBasis":"30%"}}>
          <div className="d-inline-block">
          Your trip from {origin} to {destination}
          </div>
          <div className="d-inline-block position-absolute end-0" >
          <Button onClick={()=>handleDelete(route.id)}className="btn-dark btn-sm">&minus;</Button>
          </div>
        </div>)
      }
    });

  return (
    <>
    {showAdd &&
      <EditPopupForm setShowAdd={setShowAdd} setRoutes={setRoutes} routes={routes}/>           
    }

    <div className="d-inline-block p-2">
      <Button className="btn btn-dark btn-md" onClick={()=>setShowAdd(true)}>Add Trip</Button>
    </div>
    <div className="d-inline-block p-2">
      <Button className="btn btn-dark btn-md" onClick={()=>handleEditTrip()}>{btnMsg}</Button>
    </div>
    <div className="routeContainer pt-3">
      <Route listRoutes={listRoutes}/>    
    </div>
    </>
  )
}
export default RoutesContainer