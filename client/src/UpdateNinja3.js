import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getNinja, updateNinja } from './apiCore';

const UpdateNinja = (props) => {
  
  const [ninja, setNinja] = useState({});

  const [coordinates, setCoordinates] = useState({});

  const [lng,lat] = [coordinates[0], coordinates[1]]

  const [error, setError] = useState(false);

  useEffect(() => {
    const ninjaId = props.match.params.id
    loadSingleNinja(ninjaId);
  }, [props])

  const loadSingleNinja = ninjaId => {
    getNinja(ninjaId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setNinja(data);
        console.log(data)
        setCoordinates(data.geometry.coordinates)
        console.log(coordinates)
        console.log(ninja.available)
      }
    });
  }

  const handleChange =  e => {
    const { name, value } = e.target
    const lgnF = lgn
    setNinja({ ...ninja, [name]: value })
    setCoordinates({...coordinates, [name]: value })
    console.log(ninja.available)

}

  const handleSubmit = e => {
    e.preventDefault();
    updateNinja(ninja._id, ninja.name, ninja.rank, JSON.parse(ninja.available), lng, lat)
    window.history.back()
  }

 
const radios = i =>{
  if (i==true)
      return <div className='form-group'>
      <div className="form-check-inline">
      <input className="form-check-input" type="radio" name='available'  onChange={handleChange} value='false'  />
      <label className="form-check-label" >
          Not available</label>
      </div>
      <div className="form-check-inline">
      <input className="form-check-input" type="radio" name='available'  onChange={handleChange} value='true' defaultChecked/>
      <label className="form-check-label" >
          Available</label>
      </div>
      </div> 
  
   else 
        return <div className='form-group'>
        <div className="form-check-inline">
        <input className="form-check-input" type="radio" name='available'  onChange={handleChange} value='false' defaultChecked/>
        <label className="form-check-label" >
            Not available</label>
        </div>
        <div className="form-check-inline">
        <input className="form-check-input" type="radio" name='available'  onChange={handleChange} value='true' />
        <label className="form-check-label" >
            Available</label>
        </div>
        </div> 
    }
   
  

  return (
    <>
    <form className='mb-3' onSubmit={handleSubmit}>
        <h4>Update Ninja</h4>
        <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input className='form-control'
            onChange={handleChange}
            type='text'
            name = 'name'
            defaultValue= {ninja.name}
        />
        </div>
        <div className='form-group'>
        <label className='text-muted'>Rank</label>
        <input className='form-control'
            onChange={handleChange}
            type='text'
            name = 'rank'
            defaultValue= {ninja.rank}
        />
        </div>
        {radios(ninja.available)}
        <div className='form-group'>
        <label className='text-muted'>Lng</label>
        <input
            onChange={handleChange}
            type='number'
            className='form-control'
            name='lng'
            defaultValue= {lng}
        />
        </div>
        <div className='form-group'>
        <label className='text-muted'>Lat</label>
        <input
            onChange={handleChange}
            type='number'
            className='form-control'
            name='lat'
            defaultValue= {lat}
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


/* {<div className='form-group'>
<label className='text-muted'>Available</label>
<input className='form-control'
    type='text'
    name = 'available'
    value= {ninja.available}
      onChange={handleChange}
/>
</div> } */

/* {<div className='form-group'>
<div className="form-check-inline">
<input className="form-check-input" type="radio" name='available'  onChange={handleChange} value={'false' ? ninja.available=false : ninja.available=true}  />
<label className="form-check-label" >
    Not available</label>
</div>
<div className="form-check-inline">
<input className="form-check-input" type="radio" name='available'  onChange={handleChange} value={'true' ? ninja.available=true : ninja.available=false} />
<label className="form-check-label" >
    Available</label>
</div>
</div> } */


  //const [coordinates, setCoordinates] = useState({});

/*  const radioChecked =i=>{
    i ? checked='checked' : checked=''
  } */ 