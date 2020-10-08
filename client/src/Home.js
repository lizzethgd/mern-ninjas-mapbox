import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {getNinjas} from './apiCore';

class Home extends Component {
    
    state = { 
        ninjas: [],
        lat: '',
        lng: '',
        error: ''
    }
  
    handleChange= e => {
        this.setState({[e.target.name]: e.target.value })
    }
  
    handleSubmit = e => {
        e.preventDefault();
        getNinjas(this.state.lng,this.state.lat )
        .then(data => { data.error ? this.setState({error: data.error}): this.setState({ninjas: data}) })
      }
    
    render() {
        let ninjas = this.state.ninjas;
        ninjas= ninjas.map((ninja, i) => 
            ( <Link to={`/ninja/${ninja._id}`} key={i}><li >
                    <span className={ ninja.available ? 'true' : 'false'}></span>
                    <span className="name">{ninja.name}</span>
                    <span className="rank">{ninja.rank}</span>
                    <span className="dist">{Math.floor(ninja.dis / 1000)} km</span>
            </li></Link>)
        )
        return (
            <>        
                <h1 className="title">NinjaGo - a Ninja REST API</h1>
                <div id="homepage">
                    <h1>Hire a ninja in your area!</h1>
                     <div id="ninjas"></div>
                </div>
                     <div id="ninja-container">
                        <form id="search" onSubmit={this.handleSubmit}>
                        <label>Enter your Longitude:</label>
                            <input type="text" name="lng" placeholder="longitude"  onChange={this.handleChange} required />
                            <label>Enter your Latitude:</label>
                            <input type="text" name="lat" placeholder="latitude"  onChange={this.handleChange}  required />
                            <input type="submit" value="Find Ninjas" />
                        </form>
                        <ul>{ninjas}</ul>
                </div>        
         </>
        )
    }
  }
  
  export default Home;
  

  /*  <Link to={`/videogame/${videogame._id}`}>
<button className="btn btn-success">Ver Mas</button>
</Link> */