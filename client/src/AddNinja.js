import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {addNinja} from './apiCore'

const AddNinja = () => {

  const [ninja, setNinja] = useState({
    name: '',
    rank: '',
    available: '',
    lng: '',
    lat: '',
  })

  const {
    name,
    rank,
    available,
    lng,
    lat
  } = ninja


  const handleChange = e => {
    setNinja({ ...ninja, [e.target.name]: e.target.value })
}

const handleSubmit = e => {
  e.preventDefault();
  addNinja(name, rank, JSON.parse(available), lng, lat)
  window.history.back()
}

    return (
        <>
        <form className='mb-3' onSubmit={handleSubmit}>
            <h4>Add Ninja</h4>
            <div className='form-group'>
            <label className='text-muted'>Name</label>
            <input className='form-control'
                type='text'
                name = 'name'
                onChange={handleChange}
            />
            </div>
            <div className='form-group'>
            <label className='text-muted'>Rank</label>
            <input className='form-control'
                type='text'
                name = 'rank'
                onChange={handleChange}
            />
            </div>
            <div className='form-group'>
                <div className="form-check-inline">
                <input className="form-check-input" type="radio" name='available'  onChange={handleChange} value='false' />
                <label className="form-check-label" >
                    Not available</label>
                </div>
                <div className="form-check-inline">
                <input className="form-check-input" type="radio" name='available'  onChange={handleChange} value='true' />
                <label className="form-check-label" >
                    Available</label>
                </div>
            </div>

            <div className='form-group'>
            <label className='text-muted'>Lng</label>
            <input className='form-control'
                type='number'
                name='lng'
                onChange={handleChange}
            />
            </div>
            <div className='form-group'>
            <label className='text-muted'>Lat</label>
            <input className='form-control'
                type='number'
                name='lat'
                onChange={handleChange}
            />
            </div>
            <div className='form-group'>
            <button className='btn btn-success' onClick={handleSubmit}>Add ninja</button> <Link className="btn btn-danger" to={'/'}>Cancel</Link>
            </div>
        </form>
        </>
    )
}

export default AddNinja
