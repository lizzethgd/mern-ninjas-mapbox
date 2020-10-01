import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {addNinja} from './apiCore'

class AddNinja extends Component {

  state = { 
    name: '',
    rank: '',
    available: false,
    lng: '',
    lat: '',
    error: '',
    addedNinja: ''
}

handleChange =  e => {
  this.setState({[e.target.name]: e.target.value })
}

handleSubmit = e => {
  e.preventDefault();
  addNinja(this.state.name, this.state.rank, parseFloat(this.state.lng), parseFloat(this.state.lat))
  .then(data => { data.error ? this.setState({error: data.error}): this.setState({ninjas: data}) })
  window.history.back()
}

showError = () => (
  <div className='alert alert-danger' style={{ display: this.error ? this.error : 'none' }} >
    {this.error}
  </div>
)

render() {



    return (
        <>
            {this.showError()}
        <form className='mb-3' onSubmit={this.handleSubmit}>
            <h4>Add Ninja</h4>
            <div className='form-group'>
            <label className='text-muted'>Name</label>
            <input className='form-control'
                onChange={this.handleChange}
                type='text'
                name = 'name'
            />
            </div>
            <div className='form-group'>
            <label className='text-muted'>Rank</label>
            <input className='form-control'
                onChange={this.handleChange}
                type='text'
                name = 'rank'
            />
            </div>
            <div className='form-group'>
            <label className='text-muted'>Available</label>
            <input className='form-control'
                onChange={this.handleChange}
                type='text'
                name = 'available'
            />
            </div>
            <div className='form-group'>
            <label className='text-muted'>Lng</label>
            <input
                onChange={this.handleChange}
                type='number'
                className='form-control'
                name='lng'
            />
            </div>
            <div className='form-group'>
            <label className='text-muted'>Lat</label>
            <input
                onChange={this.handleChange}
                type='number'
                className='form-control'
                name='lat'
            />
            </div>
            <button className='btn btn-outline-primary' onClick={this.handleSubmit}>Create ninjas</button>
        </form>
        <div className="mt-5">
          <Link to="/" className="text-warning">
            Back to Dashboard
          </Link>
        </div>
        </>
    )
}

}

export default AddNinja
