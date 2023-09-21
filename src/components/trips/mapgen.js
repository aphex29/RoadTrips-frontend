import React, { useEffect, useState } from 'react'
import './Trips.css'
import { GoogleMap, useJsApiLoader, Polyline } from "@react-google-maps/api"
import polyline from '@mapbox/polyline';

function Gmaps(props) {
  const {routeInfo, map, setMap} = props;
  

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA8rt9LCZJB6uOyzTOOCeUwF7YSbOd9MCE",
    libraries: ['geometry', 'places'],
  });


  let waypoints = routeInfo.waypoints;

  

  const center = {
    lat: waypoints[0].latitude,
    lng: waypoints[0].longitude
  }

  const decodedPolyline = polyline.decode(routeInfo.polyline).map(point=>({lat: point[0], lng: point[1]}));
  
  return (
    <div className="mapContainer pt-5 d-flex justify-content-center"> 
      <div className="mapBorder" id="map">      
          {isLoaded &&
          <GoogleMap          
            center={center}
            mapContainerStyle={{width:"100%", height:"100%"}}
            zoom={10}
            options={{
              streetViewControl:false,
              mapTypeControl:false,
              fullscreenControl:false,
              zoomControl:false,
            }}
            onLoad={(map)=> setMap(map)}
            >

              <Polyline
              path={decodedPolyline}
              options={
                { strokeColor: "#FF0000 ",
                  strokeWeight:2,
                strokeOpacity:0.7}
              }
              />

          </GoogleMap>
        
          }
      </div>
    </div>
  )
}

export default Gmaps