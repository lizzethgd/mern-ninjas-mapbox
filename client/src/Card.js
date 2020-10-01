import React from 'react';
import './Card.css';

const Card = ({ninja, coordinates}) => {
 
 //console.log()
 
  return (
    <div className="card m-10 card-cont">
      <div className="">   
        <p>{ninja.name}</p>
        <p>{ninja.rank}</p>
        <p>{ninja.available ? 'Available' : 'Not available'}</p>
        <p>{`Longitud: ${coordinates[0]}, Latitud: ${coordinates[1]}`}</p>
       
      </div>
    </div>
  )
}

export default Card;


//<ShowImage className="img" item={videogame} url="videogame"/>

