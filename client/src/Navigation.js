import React from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import reactLogo from './logo.svg'

const Navibar = props => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
             
      <NavLink className="navbar-brand" to="/">
          <img
          alt=""
          src={reactLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          />
          {' '}
          MERN Ninjas
      </NavLink>
     
     
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
              <NavLink className="navlink" to="/">Home</NavLink>
              <NavLink className="navlink" to="/signup">Signup</NavLink>
              <NavLink className="navlink" to="/login">Login</NavLink>
              <NavLink className="navlink" to="/students">Students</NavLink>
              <NavLink className="navlink" to="/addninja">Add</NavLink>
              <NavLink className="navlink" to="/logout">Logout</NavLink>
          </Nav>
      </Navbar.Collapse>
      
</Navbar>
    )
}

Navibar.propTypes = {

}

export default Navibar
