export const selectListHelper = (waypoints) => {
  return waypoints.map(waypoint=>{
    return(
      <option value={waypoint.id}>{waypoint.address}</option>
    )
  });
}
