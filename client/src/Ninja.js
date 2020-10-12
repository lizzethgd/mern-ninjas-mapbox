import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getNinja, deleteNinja } from './apiCore';
import Card from './Card';

const Ninja = (props) => {

  const [ninja, setNinja] = useState({
    id: props.match.params.id,
    name: '',
    rank: '',
    available: false,
    lng: 0,
    lat: 0,
    error: ''
  });

  useEffect(() => {
    loadSingleNinja();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadSingleNinja = () => {
    getNinja(ninja.id).then(data => {
      if (data.error) {
        setNinja({...ninja, error: data.error})
        console.log(ninja.error)
      } else {
        setNinja({ ...ninja, name: data.name, rank: data.rank, 
          available: data.available,
          lng: data.geometry.coordinates[0], lat: data.geometry.coordinates[1] })
      }
    });
  }



 const delNinja =  async () => {
      await deleteNinja(ninja.id)
      window.history.back()
   }

  return (
    <>
    <div className="container">
        <Card ninja={ninja} />
        <Link className="btn btn-success" to={`/updateninja/${ninja.id}`}>Update</Link> <button className="btn btn-danger" onClick={delNinja}>Delete</button>
        
    </div>
    </>
  )
}

export default Ninja