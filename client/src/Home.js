import React, {useRef, useState} from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl, WebMercatorViewport, FlyToInterpolator} from "react-map-gl";
import { Link } from 'react-router-dom';
import {getNinjas} from './apiCore';

const Home = (props) => {
 
    const [ninjas, setNinjas] = useState({
        ninjas: [],
        lat: '',
        lng: '',
        ninja: '',
        error: ''
      });
  
      const handleChange = e => {
        setNinjas({ ...ninjas, [e.target.name]: e.target.value })
    }
  
    const handleSubmit =  e => {
        e.preventDefault();
        getNinjas(ninjas.lng, ninjas.lat )
        .then(data => { data.error 
        ? setNinjas({...ninjas, error: data.error})       
        : setNinjas({...ninjas, ninjas: data})
          getBoundsForPoints(data)    
    })
  
      }

    

    const getBoundsForPoints = (points) => {
            
            const applyToArray = (func, array) => func.apply(Math, array)
            // Calculate corner values of bounds
            const pointsLong = points.map(point => point.geometry.coordinates[0])
            const pointsLat = points.map(point => point.geometry.coordinates[1])
            const cornersLongLat = [
              [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
              [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)]
            ]
            // Use WebMercatorViewport to get center longitude/latitude and zoom
            const viewport = new WebMercatorViewport({ width: 800, height: 600 })
              .fitBounds(cornersLongLat, { padding: 200 }) 
            // Can also use option: offset: [0, -100]
            console.log(viewport)
            const { longitude, latitude, zoom } = viewport
            console.log( longitude+': '+typeof longitude+', '+latitude+': '+typeof latitude+', '+zoom+': '+typeof zoom)
            setViewport(viewport => ({ ...viewport, longitude: longitude, latitude: latitude, zoom: zoom  }))
           
          }
          
        const [viewport, setViewport] = useState({
              longitude: 2.173404,
              latitude: 41.385063,
              width: "70vw",
              height: "70vh",
              zoom: 9
        })

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
          (<Marker key={ninja._id} latitude={ninja.geometry.coordinates[1]}
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

        const mapRef = useRef()

        return (
            <> 
                <br/>       
                <h1 className="title">NinjaGo - a Ninja REST API</h1>
                <div id="homepage">
                    <h1>Hire a ninja in your area!</h1>
                     <div id="ninjas"></div>
                </div>
                     <div id="ninja-container">
                        <form id="search" onSubmit={handleSubmit}>
                        <label>Enter your Longitude:</label>
                            <input type="text" name="lng" placeholder="longitude"  onChange={handleChange} required />
                            <label>Enter your Latitude:</label>
                            <input type="text" name="lat" placeholder="latitude"  onChange={handleChange}  required />
                            <input type="submit" value="Find Ninjas" />
                        </form>
                        <ul>{ninjasList}</ul>
                </div>
                <div className='map'>
                    <  ReactMapGL  {...viewport} maxZoom={20}
                    onViewportChange={newViewport => { setViewport ({...newViewport})}}
                    mapStyle="mapbox://styles/mapbox/streets-v11"  
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}  
                    ref={mapRef}
                    >
                    Mapa aqui  {ninjasMarkers }
                    <div className='map-controlls'>
                    <NavigationControl  />
                    </div>
                    {ninjaPopup }
                </ReactMapGL>   
                </div>
         </>
        )
    }

   
  export default Home 
  
