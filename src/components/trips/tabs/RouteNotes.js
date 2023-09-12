import React, { useEffect, useState } from 'react'
import { useUser } from '../../UserContext';
import '../Trips.css'
import axios from 'axios';
import EditRoutesNotes from './editing/EditRoutesNotes';

function RouteNotes(props) {
  
  const {waypoints} = props;
  
  const [waypointInfo,setWaypointInfo] = useState({});
  const [isEditing,setIsEditing] = useState(false);
  const [note,setNote] = useState("");

  const handleChange = (e)=>{
    if (e.target.value!=="1")
    { 
    axios.get('http://localhost:8080/api/v1/waypoint/'+e.target.value)
    .then(response=>{
      setWaypointInfo(response.data);
      setIsLoaded(true);
      setNote(response.data.notes);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
  }
  }

  function onEditClick(){
    setIsEditing(true);
  }

  function handleFormChange({target}){
    const {value} = target;
    setNote(value);
  }

  let listWaypoints = waypoints.map(waypoint=>{
    return(
      <option value={waypoint.id}>{waypoint.address}</option>
    )
  })

  function handleSaveNote(e){
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/waypoint/edit/note',{id:waypointInfo.id,note:note})
    .then(response=>{
      setWaypointInfo(response.data);
      setNote(response.data.notes);
      setIsEditing(false);
    })
    .catch(error=>console.log(error));
    
  }

 
  return (
    <>
      <select className="dropdownMenu form-select form-select-lg mt-5 d-flex justify-content-center" onChange={(e)=>handleChange(e)} >
        <option value={"1"}>Select</option>
        {listWaypoints}
      </select>
      
      {!isEditing 

        ? <EditRoutesNotes waypoint={waypointInfo} onEditClick={onEditClick}/>
        : <>
            <form>
              <textarea onChange={handleFormChange}>
                {waypointInfo.notes}
              </textarea>
              <br/>
              <button type="submit" onClick={(e)=>handleSaveNote(e)}>Save</button>
            </form>
            <button onClick={()=>setIsEditing(false)}>Cancel</button>
          </>
      }
      
    </> 
  )
}

export {RouteNotes}