import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getNinja, deleteNinja } from './apiCore';
import Card from './Card';

const Ninja = (props) => {
  const [ninja, setNinja] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const ninjaId = props.match.params.id;
    loadSingleNinja(ninjaId);
  }, [props])

  const loadSingleNinja = ninjaId => {
    getNinja(ninjaId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setNinja(data);
        setCoordinates(data.geometry.coordinates)
        console.log(data.geometry.coordinates)
      }
    });
  }

  
 const delNinja =  async () => {
      await deleteNinja(ninja._id)
      window.history.back()
   }

  return (
    <>
    <div className="container">
        <Card ninja={ninja} coordinates={coordinates}/>
        <Link className="btn btn-success" to={`/updateninja/${ninja._id}`}>Update</Link> <button className="btn btn-danger" onClick={delNinja}>Delete</button>
        
    </div>
    </>
  )
}

export default Ninja