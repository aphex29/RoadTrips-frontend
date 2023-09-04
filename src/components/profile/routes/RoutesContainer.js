import React, { useEffect, useState } from 'react'
import './Routes.css'
import { useUser } from '../../UserContext';
import Route from './Route';
import { Button } from 'react-bootstrap';
import EditPopup from './EditPopup';
import axios from 'axios';


function RoutesContainer() {
  
  const {userInfo, setUserInfo} = useUser();

  const[routes,setRoutes] = useState(userInfo.routes);
  const[showAdd,setShowAdd]= useState(false);
  const[isEditing,setIsEditing] = useState(false);




  const[addForm,setAddForm] = useState({
    origin:"",
    destination:""
  });

  function handleChange(e){
    const {id,value} = e.target;
    setAddForm((prev) => ({...prev, [id]: value}));
  }

  function handleAddSubmit(e){
    e.preventDefault();
    createRoute();
  }

  useEffect(()=>{
    let userObj = JSON.parse(JSON.stringify(userInfo));
    userObj.routes=routes;
    setUserInfo(userObj);
  },[routes])
 
  const createRoute = () => {
    axios.post('http://localhost:8080/api/v1/route',{userId:userInfo.id,...addForm})
    .then(response=>{
      console.log(response);
      let routeArray = [...routes];
      routeArray.push(response.data);
      setRoutes(routeArray);
    })
    .catch(error=>console.log(error));
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

  const [btnMsg,setBtnMsg]=useState("Edit Trip");
  function handleEditTrip(){
    setIsEditing(!isEditing);
    if (isEditing) setBtnMsg("Edit Trip");
    else setBtnMsg("Cancel Edit");
  }

  function handleDelete(id){
    deleteRoute(id);
  }


  const listRoutes = routes.map(route=>
    {
      if(!isEditing){
      return <div key={route.id} className ="routeBorders" style={{"flexBasis":"30%"}}>{route.destination}</div>;
      }
      else{
        return (
        <div key={route.id} className ="routeBorders" style={{"flexBasis":"30%"}}>
          <div className="d-inline-block">
          {route.destination}
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
      <EditPopup submitHandler={handleAddSubmit} changeHandler={handleChange} origin={addForm.origin} destination={addForm.destination} setShowAdd={setShowAdd}/>           
    }

    <div className="d-inline-block p-2">
      <Button className="btn btn-dark btn-md" onClick={()=>setShowAdd(true)}>Add Trip</Button>
    </div>
    <div className="d-inline-block p-2">
      <Button className="btn btn-dark btn-md" onClick={()=>handleEditTrip()}>{btnMsg}</Button>
    </div>
      <Route listRoutes={listRoutes}/>    
    </>
  )
}
export default RoutesContainer