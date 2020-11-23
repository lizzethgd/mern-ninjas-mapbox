import React, {useRef, useState, useCallback} from 'react';
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from 'react-map-gl-geocoder'
import ReactMapGL, { Marker, Popup, NavigationControl, WebMercatorViewport, FlyToInterpolator} from "react-map-gl";
import { Link } from 'react-router-dom';
import {getNinjas} from './apiCore';

const Home = (props) => {
 
const [ninjas, setNinjas] = useState({
    ninjas: [],
    ninja: '',
    viewportWithBonus: {},
    error: ''
  });

  
const [viewport, setViewport] = useState({
    longitude: 2.173404,
    latitude: 41.385063,
    width: "70vw",
    height: "70vh",
    zoom: 9
  })  

const token = process.env.REACT_APP_MAPBOX_TOKEN 
const mapRef = useRef()
const geocoderContainerRef = useRef()

const getBoundsForPoints = (points) => {
        
  const applyToArray = (func, array) => func.apply(Math, array)
  // Calculate corner values of bounds
  const pointsLong = points.map(point => point.geometry.coordinates[0])
  const pointsLat = points.map(point => point.geometry.coordinates[1])
  const cornersLongLat = [
    [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
    [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)]
  ]
  const viewport = new WebMercatorViewport({ width: 800, height: 600 })
  .fitBounds(cornersLongLat, { padding: 200 })
  const { longitude, latitude, zoom } = viewport

  const geocoderDefaultOverrides = {longitude: longitude, latitude: latitude, zoom: zoom, transitionDuration: 1000 } 
  
  setNinjas({...ninjas, ninjas: points, viewportWithBonus: geocoderDefaultOverrides})

  
  
  //return cornersLongLat 
}  

const handleData = async (long,lat) => {
    getNinjas(long, lat)
    .then( data => { data.error 
      ? setNinjas({...ninjas, error: data.error})
      : getBoundsForPoints(data)
      console.log('changedata made')
  
    })
}

const handleViewportChange = useCallback(
  (newViewport) => setViewport(newViewport)
);

const handleGeocoderViewportChange = useCallback(  
  async (newViewport) => {
    console.log(newViewport)
    
    handleData(newViewport.longitude, newViewport.latitude)
    //const geocoderDefaultOverrides = ninjas.viewportWithBonus
    await handleViewportChange({
      ...newViewport,
      ...ninjas.viewportWithBonus
    });
  }
)

const ninjasList= ninjas.ninjas.map(ninja=> 
    ( <Link to={`/ninja/${ninja._id}`} key={ninja._id}><li >
            <span className={ ninja.available ? 'true' : 'false'}></span>
            <span className="name">{ninja.name}</span>
            <span className="rank">{ninja.rank}</span>
            <span className="dist">{Math.floor(ninja.dis / 1000)} km</span>
    </li></Link> 
    )
  ) 

  const ninjasMarkers= ninjas.ninjas.map(ninja=> 
    (<Marker key={ninja._id} 
      latitude={ninja.geometry.coordinates[1]}
      longitude={ninja.geometry.coordinates[0]}
      offsetLeft={-20}
        offsetTop={-10}>
          <button className='ninja-marker'
            onMouseOver={() =>  {setNinjas({...ninjas, ninja: ninja})} } 
            onClick={e => {
              e.preventDefault()
                setViewport({
                  ...viewport,
                  longitude: ninjas.ninja.geometry.coordinates[0],
                  latitude: ninjas.ninja.geometry.coordinates[1],
                  zoom: 14,
                  transitionInterpolator: new FlyToInterpolator({speed: 2 }),
                  transitionDuration: "auto"
                })  
                }} 
              >
              <img src='pin2.png' alt='#' />
          </button>
      </Marker>))

    const ninjaPopup  = ninjas.ninja 
    ? 
      (<Popup 
        latitude={ninjas.ninja.geometry.coordinates[1]}
        longitude={ninjas.ninja.geometry.coordinates[0]}
        onClose={() => {
            setNinjas({...ninjas, ninja: null})
        }}
      >
        <div>
          <h2>{ninjas.ninja.name}</h2>
          <p>{ninjas.ninja.rank}</p>
        </div>
      </Popup>)
    : null  


console.log(ninjas.viewportWithBonus)
console.log(viewport)

return (
    <> 
        <br/>       
        <h1 className="title">NinjaGo - a Ninja REST API</h1>
        <div id="homepage">
            <h1>Hire a ninja in your area!</h1>
              <div id="ninjas"></div>
        </div>
        <div id="ninja-container">
           <form id="search" >
                  <label>Enter your address:</label>
                  <div ref={geocoderContainerRef}></div> 
            </form>
        </div>
        <div className='map'>
        <  ReactMapGL  
              ref={mapRef}
            {...viewport} maxZoom={20}
            onViewportChange={handleViewportChange}
            mapStyle="mapbox://styles/mapbox/streets-v11"  
            mapboxApiAccessToken={token}  
            >
            Mapa aqui  {ninjasMarkers }
          <div className='map-controlls'>
            <NavigationControl  />
            <Geocoder
            mapRef={mapRef}
            containerRef={geocoderContainerRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={token}
            position="top-left"
            />
          </div>
            {ninjaPopup }
        </ReactMapGL>   
        </div>
        <div> <ul>{ninjasList}</ul> </div>
  </>
        )
    }
  
  
  export default Home;
  
//{newViewport => { setViewport ({...newViewport},[])}}

//newViewport => { setViewport ({...newViewport})}
//console.log(newViewport.longitude+'. '+newViewport.latitude)
//console.log(newViewport)

/* bbox0= cornersLongLat
  console.log(bbox0)
  setNinjas({...ninjas, bbox: cornersLongLat})
  setBbox(cornersLongLat)
  console.log(bbox)
  console.log(ninjas.bbox) */