import React, {useRef, useState, useCallback} from 'react';
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from 'react-map-gl-geocoder'
import ReactMapGL, { Marker, Popup, NavigationControl, WebMercatorViewport, FlyToInterpolator} from "react-map-gl";
import { Link } from 'react-router-dom';
import {getNinjas} from './apiCore';

const navStyle = {
  padding: 0
};

const geocoderContainerStyle = {
  color: '#0000'
}
 
const Home = (props) => {
 
const [ninjas, setNinjas] = useState({
    ninjas: [],
    ninja: '',
    viewportWithBounds: {},
    error: ''
  });
  
const [viewport, setViewport] = useState({
    longitude: 24.916528,
    latitude:  60.205091,
    width: "70vw",
    height: "70vh",
    zoom: 9
  })  

const [radius, setRadius] =useState(25)

const token = process.env.REACT_APP_MAPBOX_TOKEN 
const mapRef = useRef()
const geocoderContainerRef = useRef()

const radiusChange = e => {
  const newRadius = e.target.value
  setRadius(newRadius)
  console.log(radius)
}  

const applyToArray = (func, array) => func.apply(Math, array)

const handleViewportChange = useCallback(
  (newViewport) => setViewport(newViewport),[]
);

const getBoundsForPoints = useCallback( (points) => {
  
  if (points.length >=1) {
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
 
  const geocoderDefaultOverrides = {longitude: longitude, latitude: latitude, zoom: points.length >1 ? zoom : 14.76, transitionDuration: 1000 } 
  
  setNinjas(ninjas => ({...ninjas, error: ''}))
  
  return handleViewportChange({
    ...geocoderDefaultOverrides
  });

}else {
  setNinjas(ninjas => ({...ninjas, error: 'There is not ninjas available in that point'}))}  
}
,[handleViewportChange]
)
  
const handleData =  useCallback(  (long,lat, rad) => {
    getNinjas(long, lat, rad)
    .then( data => { data.error 
      ? setNinjas({...ninjas, error: data.error})
      : setNinjas({...ninjas, ninjas: data})
       getBoundsForPoints(data)
    })
},[getBoundsForPoints, ninjas]
)


const  handleGeocoderViewportChange = useCallback(   
  async (newViewport) => {
    console.log(newViewport)
    handleData(newViewport.longitude, newViewport.latitude, radius)
  },[handleData, radius]
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
              <img src='ninja.png' alt='#' />
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
        className='popupStyle'
      >
        <div className='popupInfo'>
          <h4>{ninjas.ninja.name}</h4>
          <p>{ninjas.ninja.rank} belt</p>
        </div>
      </Popup>)
    : null  

const ninjasList= ninjas.ninjas.map(ninja=> 
      ( <Link to={`/ninja/${ninja._id}`} key={ninja._id}><li className='liColumn'>
              <span className={ ninja.available ? 'true' : 'false'}></span>
              <span >{ninja.name}</span>
              <span>{ninja.rank} belt</span>
              <span>{Math.floor(ninja.dis / 1000)} Km</span>
      </li></Link> 
      )
) 

return (
    <div className='wrapContainer'> 
        <form className='formContainer'>
          <div className='selectGroup'>
            <label>Radio: </label>
            <select value={radius} onChange={radiusChange}>
                  <option value={25}>25 Km</option>
                  <option value={45}>45 Km</option>
                  <option value={100}>100 Km</option>
            </select>
        </div>
        <div ref={geocoderContainerRef} ></div>  
        </form>
        <span id='error'>{ninjas.error}</span> 
        <ReactMapGL  
              ref={mapRef}
            {...viewport} maxZoom={20}
            onViewportChange={handleViewportChange}
            mapStyle="mapbox://styles/mapbox/streets-v11"  
            mapboxApiAccessToken={token}
            >
            {ninjasMarkers }
            <NavigationControl className='navControl'/>
          <Geocoder
            mapRef={mapRef}
            containerRef={geocoderContainerRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={token}
            countries={'fi'}
            marker={false}
            placeholder={'  Find a ninja in your area!'}
          />
            {ninjaPopup }
        </ReactMapGL>   
        <div className='ninjasList'> <ul>{ninjasList}</ul> </div>
  </div>
        )
    }
  
  export default Home;

  // onResults={geoViewport ? handleData(geoViewport.longitude, geoViewport.latitude) : null}