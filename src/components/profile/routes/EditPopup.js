import React from 'react'
import './Routes.css';





function EditPopup(props) {
  const {submitHandler,changeHandler,origin,destination,setShowAdd} = props;
  return (
    <div className="addPopup d-flex flex-column justify-content-around p-2 position-fixed">

          <form onSubmit={submitHandler}>
            <label>
              Origin:
            <input type="text" placeholder="Origin" id="origin" onChange={changeHandler} value={origin} required></input>
            </label>
            
            <label>
              Destination:
              <input type="text" placeholder="Destination" id="destination" onChange={changeHandler} value={destination} required></input>
            </label> 
            <br/> 
            <label>          
              <button type="submit">Add</button>
              <button onClick={()=>{setShowAdd(false);}}>Close</button>
            </label>
          </form>          
      </div>
  )
}

export default EditPopup