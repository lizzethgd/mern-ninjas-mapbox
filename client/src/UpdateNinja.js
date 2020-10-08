import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getNinja, updateNinja } from './apiCore';

const UpdateNinja = (props) => {

  const [ninja, setNinja] = useState({
    name: '',
    rank: '',
    available: false,
    lng: 0,
    lat: 0,
    error: ''
  });

  const {
    name,
    rank,
    available,
    lng,
    lat,
    error
  } = ninja


  useEffect(() => {
    const ninjaId = props.match.params.id
    loadSingleNinja(ninjaId);
  }, [props])

  const loadSingleNinja = ninjaId => {
    getNinja(ninjaId).then(data => {
      if (data.error) {
        setNinja({...ninja, error: data.error})
        console.log(error)
      } else {
        setNinja({...ninja, name: data.name, rank: data.rank, available: data.available,
        lng: data.geometry.coordinates[0], lat: data.geometry.coordinates[1] })
      }
    });
  }

  const handleChange = e => {
    setNinja({ ...ninja, [e.target.name]: e.target.value })
}

  const handleSubmit = e => {
    e.preventDefault();
    const ninjaId = props.match.params.id
    const availableF= typeof available == Boolean ? available : JSON.parse(available)
    updateNinja(ninjaId, name, rank, availableF, lng, lat)
    console.log(available+' '+typeof available)
    console.log('f: '+availableF+' '+typeof availableF)
    window.history.back()
  }

  return (
    <>
    {console.log(available)}
    <form className='mb-3' onSubmit={handleSubmit}>
      <h4>Update Ninja</h4>
      <div className='form-group'>
      <label className='text-muted'>Name</label>
      <input className='form-control'
          type='text'
          name = 'name'
          value= {name}
          onChange={handleChange}
      />
      </div>
      <div className='form-group'>
      <label className='text-muted'>Rank</label>
      <input className='form-control'
          type='text'
          name = 'rank'
          value= {rank}
          onChange={handleChange}
      />
      </div>
      <div className='form-group'>
      <div className="form-check-inline">
      <input className="form-check-input" type="radio" name='available' value='false' onChange={handleChange}  checked={available==false | available=='false'}/>
      <label className="form-check-label" >
          Not available</label>
      </div>
      <div className="form-check-inline">
      <input className="form-check-input" type="radio" name='available' value='true'  onChange={handleChange}  checked={available==true | available=='true'}/>
      <label className="form-check-label" >
          Available</label>
      </div>
      </div> 
      <div className='form-group'>
      <label className='text-muted'>Lng</label>
      <input className='form-control'
          type='number'
          name='lng'
          value= {lng}
          onChange={handleChange}      
      />
      </div>
      <div className='form-group'> 
      <label className='text-muted'>Lat</label>
      <input className='form-control'
          type='number'
          name='lat'
          value= {lat}
          onChange={handleChange}
      />
      </div>
      <div className='form-group'>
      <button className='btn btn-success' onClick={handleSubmit}>Update ninja</button> <Link className="btn btn-danger" to={'/'}>Cancel</Link>
      </div>
  </form>
    </>
  ) 
}

export default UpdateNinja


