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
      <div className="">   
        <h4>{name}</h4>
        <p>{rank}</p>
        <p>{available ? 'Available' : 'Not available'}</p>
        <p>{`Longitud: ${lng}, Latitungd: ${lat}`}</p>
       
      </div>
    </div>
  )
}

export default Card;


//<ShowImage className="img" item={videogame} url="videogame"/>

