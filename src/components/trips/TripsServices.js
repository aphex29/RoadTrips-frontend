import axios from "axios";

export const getByWaypoint =  (val) => {
  const response = axios.get('http://localhost:8080/api/v1/waypoint/'+val);
  return response;
}
