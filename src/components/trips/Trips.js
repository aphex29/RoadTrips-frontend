import React from 'react'

function Trips(props) {
  const {waypointInfo} = props;


  return (
    <div>{waypointInfo[0].address}</div>
  )
}

export default Trips