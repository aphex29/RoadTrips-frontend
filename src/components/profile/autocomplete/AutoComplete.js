import React, { useEffect, useRef } from 'react'
import './autocomplete.css'

const AutoComplete=(props)=> {
  const {objId,placeholder,setPlaceObj,placeObj} = props;
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  //Filter results by locality/cities only, with their address components
  const options = {
    fields: ["formatted_address"],
    types: ["locality"]
   };

  useEffect(()=>{
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options);
    autoCompleteRef.current.addListener("place_changed", async()=> {
      const place = await autoCompleteRef.current.getPlace()["formatted_address"];
     
      setPlaceObj((prevPlaceObj) => {
        //For when the id passed in is a number, meaning the arbitrary x amount of waypoint fields
        if (!isNaN(objId)){
          let prevArray = [...prevPlaceObj.waypoints];
          prevArray[objId] = place;
          return {
            ...prevPlaceObj,
            waypoints: prevArray
          };
        } 
        else {
          return {
            ...prevPlaceObj,
            [objId]: place};
        }
      });
      }
    );
  },[]);

  return (    
      <input placeholder={placeholder} ref={inputRef}/>      
  )
}

export default AutoComplete