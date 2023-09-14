import React, { useEffect } from 'react'
import '../Trips.css'
function RouteDetails(props) {
  var totalMiles = 0;
  var totalMin = 0;
  const {waypoints} = props;

  function convertMeterstoMi(meters){
    //Rounding to the nearest hundredths of a mile
    let ret = Math.round((meters*0.000621371)*100)/100;
    totalMiles+=ret;
    return ret;
  }

  function convertSecondsToMin(seconds){
    //Storing the hour in the 0th index of an array and the left over minutes in the 1st index
    let timeArr = [0,0]
    let minutes = Math.round(seconds/60);

    //Add duration to global variable to display totals
    totalMin+=minutes;
    return minutes;
  }

  function convertMintoHrsMin(minutes){
    //Storing the hour in the 0th index of an array and the left over minutes in the 1st index
    let timeArr = [0,0];
    timeArr[0] = Math.floor(minutes/60);
    timeArr[1] = minutes%60;
    return timeArr;
  }




  const listWaypoints = waypoints.map((waypoint,index)=>{
    if (index>0){
      let miles = convertMeterstoMi(waypoint.distance);
      let minutes = convertSecondsToMin(waypoint.duration);
      let timeArr = convertMintoHrsMin(minutes);
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

  
  let totalTime = convertMintoHrsMin(totalMin);
  return (
    <>
      <div className="d-flex mt-5 gap-5 justify-content-center" >
        {listWaypoints}
      </div>
      <div className="mt-3">
        <p>
          Total distance: {Math.round(totalMiles*100)/100}mi
        </p>
        <p>
          Total time: {totalTime[0]}h {totalTime[1]}m
        </p>
      </div>
    </>
  )
}

export {RouteDetails};