import React, { Component } from 'react'

class Ninjas extends Component {
    
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
       
        fetch('/api/ninjas/near?lng='+this.state.lng+'&lat='+this.state.lat)
        .then(response =>{ 
            console.log(response)
            return response.json()
          })
          .catch(err => console.log(err))
            .then(data => { data.error ? this.setState( {error:  data.error}) : this.setState({ ninjas:  data})
             })
          
        /* .then(function(data){
            return data.json();
        }).then( json => {
            this.setState({
                ninjas: json
            });
            console.log(json);
        });
 */
      }
    
    render() {
        const ninjas = this.state.ninjas;
        ninjasList = ninjas.map((ninja, i) => {
            (<li key={i}>
                    <span className={ninja.available}></span>
                    <span className="name">{ninja.name}</span>
                    <span className="rank">{ninja.rank}</span>
                    <span className="dist">{Math.floor(ninja.dis / 1000)} km</span>
            </li>);
        });
        return (
            <>
                <h1 class="title">Ninjago - a Ninja REST API</h1>
                <div id="homepage">
                    <h1>Hire a ninja in your area!</h1>
                     <div id="ninjas"></div>
                </div>
                <div id="ninja-container">
                        <form id="search" onSubmit={this.handleSubmit}>
                            <label>Enter your Latitude:</label>
                            <input type="text" name="lat" placeholder="latitude" onChange={this.handleChange}  required />
                            <label>Enter your Longitude:</label>
                            <input type="text" name="lng" placeholder="longitude" required />
                            <input type="submit" value="Find Ninjas" />
                        </form>
                        <ul>{ninjasList}</ul>
                </div>        
         </>
        )
    }
}


export default Ninjas

