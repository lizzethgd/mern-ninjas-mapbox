import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {getNinjas} from './apiCore';

const Home = (props) => {
 
    const [ninjas, setNinjas] = useState({
        ninjas: [],
        lat: '',
        lng: '',
        error: ''
      });
  
      const handleChange = e => {
        setNinjas({ ...ninjas, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = e => {
        e.preventDefault();
        getNinjas(ninjas.lng, ninjas.lat )
        .then(data => { data.error ?  setNinjas({...ninjas, error: data.error}): setNinjas({...ninjas, ninjas: data}) })
      }
    

      let ninjasList= ninjas.ninjas.map((ninja, i) => 
            ( <Link to={`/ninja/${ninja._id}`} key={i}><li >
                    <span className={ ninja.available ? 'true' : 'false'}></span>
                    <span className="name">{ninja.name}</span>
                    <span className="rank">{ninja.rank}</span>
                    <span className="dist">{Math.floor(ninja.dis / 1000)} km</span>
            </li></Link>)
        )
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
         </>
        )
    }
  
  
  export default Home;
  