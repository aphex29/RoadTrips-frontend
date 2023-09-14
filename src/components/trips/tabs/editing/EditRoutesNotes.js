
import React from 'react';

function EditRoutesNotes(props) {
  const {waypoint,onEditClick} = props;

  return (
    <>
      <button onClick={onEditClick} className='mb-4'>Edit</button>
      <div>{waypoint.notes}</div>
    </>
  )
}

export default EditRoutesNotes