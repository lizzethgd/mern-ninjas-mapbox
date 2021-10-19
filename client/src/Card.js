import React from 'react';
import './Card.css';

const Card = ({ninja}) => {
  const {
    name,
    rank,
    available,
    lng,
    lat
  } = ninja
 
  return (
    <div className="card m-10 card-cont">   
        <h4>{name}</h4>
        <p>Rank: {rank} belt</p>
        <p>{available ? 'Available' : 'Not available'}</p>
        <p>Latitud: {lat}</p>
        <p>Longitud: {lng}</p>
    </div>
  )
}

export default Card;


//<ShowImage className="img" item={videogame} url="videogame"/>

