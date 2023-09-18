import React, { useEffect, useState } from 'react'
import './Routes.css'
import { useUser } from '../../UserContext';
import Route from './Route';
import { Button } from 'react-bootstrap';
import EditPopupForm from './EditPopupForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AutoComplete from '../autocomplete/AutoComplete';



function RoutesContainer() {
  
  const {userInfo, setUserInfo} = useUser();
  const[routes,setRoutes] = useState(userInfo.routes);
  const[showAdd,setShowAdd]= useState(false);
  const[isEditing,setIsEditing] = useState(false);

  const[routeObj,setRouteObj] = useState({
    userId:userInfo.id,
    origin:"",
    destination:"",
    waypoints:[]
  });


  
  //Update local storage to store the new routes array, whether a user creates or deletes a route
  useEffect(()=>{
    let userObj = {...userInfo};
    userObj.routes=routes;
    setUserInfo(userObj);
  },[routes])
 
  const createRoute = () => {
    //In case user adds a waypoint but does not fill out the waypoint field to keep a clean array with just values and no empty strings/undefined values
    let cleanedArr = routeObj.waypoints.filter((waypoint)=>waypoint!=="" && waypoint!==undefined);
    setRouteObj((prev) => ({...prev,["waypoints"]:[...cleanedArr]}));;
    axios.post('http://localhost:8080/api/v1/route',routeObj)
    .then(response=>{
      console.log(response);
      let routeArray = [...routes];
      routeArray.push(response.data);
      setRoutes(routeArray);
      setShowAdd(false);
    })
    .catch(error=>{
      console.log(error);
    });
  }

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

  function handleChange(e){
    const {id,value} = e.target;
    setRouteObj((prev) => ({...prev, [id]: value}));
  }

  function handleEditTrip(){
    setIsEditing(!isEditing);
    if (isEditing) setBtnMsg("Edit Trip");
    else setBtnMsg("Cancel Edit");
  }

  function handleAddSubmit(e){
    e.preventDefault();
    createRoute();
  }

  function handleDelete(id){
    deleteRoute(id);
  }

  //Special case for handling waypoint form fields, where the amount of waypoint fields that a user can generate is 0<=n<=16
  function waypointHandler({target}){
    const {id,value} = target;
    let change = value;
    let newArr = [...routeObj.waypoints]
    newArr[id]=change;
    setRouteObj({...routeObj,waypoints:newArr});
  }



 
    
  
  //Redirect user when route card is clicked
  let navigate = useNavigate();
  function routeToTrip(id){
    navigate("/trip/"+id);
  }



  const listRoutes = routes.map(route=>{
      let origin = route.waypoints[0].address;
      let destination = route.waypoints[route.waypoints.length-1].address;
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
      <EditPopupForm setShowAdd={setShowAdd}/>           
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