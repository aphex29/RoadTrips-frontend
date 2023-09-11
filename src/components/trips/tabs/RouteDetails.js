import React from 'react'
import '../Trips.css'
function RouteDetails(props) {
  var totalMiles = 0;
  var totalTime = [0,0];
  const {waypoints} = props;


  function convertMeterstoMi(meter){
    //Rounding to the nearest 100ths of a mile
    let ret = Math.round((meter*0.000621371)*100)/100;
    totalMiles+=ret;
    return ret;
  }

  function convertSecondsToMin(seconds){
    //Storing the hour in the 0th index of an array and the left over minutes in the 1st index
    let timeArr = [0,0]
    let totalMinutes = Math.round(seconds/60);
    timeArr[0] = Math.floor(totalMinutes/60);
    timeArr[1] = totalMinutes%60;
    totalTime[0] += timeArr[0];
    totalTime[1] += timeArr[1];
    return timeArr;
  }




  const listWaypoints = waypoints.map((waypoint,index)=>{
    if (index>0){
      let miles = convertMeterstoMi(waypoint.distance);
      let timeArr = convertSecondsToMin(waypoint.duration);
      return(
        <div className="infoBox mt-5" style={{"flexBasis":"30%"}}>
          <p>
            {waypoints[index-1].address} --&gt; {waypoint.address}:
          </p>
          <p>
            {miles}mi
          </p>
          <p>
            {timeArr[0]}h {timeArr[1]}m
          </p>
        </div>
      )
    }
  });

  
  
  return (
    <>
      <div className="d-flex mt-5 gap-5 justify-content-center" >
        {listWaypoints}
      </div>
      <div className="mt-3">
        <p>
          Total distance: {totalMiles}mi
        </p>
        <p>
          Total time: {totalTime[0]}h {totalTime[1]}m
        </p>
      </div>
    </>
  )
}

export {RouteDetails};