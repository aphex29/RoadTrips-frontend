
import React, { useState } from 'react'

function EditRoutesNotes(props) {
  const {waypoint,onEditClick} = props;

 

  return (
    <>
      <button onClick={onEditClick}>Edit</button>
      <div>{waypoint.notes}</div>
    </>
  )
}

export default EditRoutesNotes