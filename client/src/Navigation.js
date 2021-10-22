import React from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import logo from './ninja.png'

const Navibar = props => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
             
      <NavLink className="navbar-brand" to="/">
          <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          />
          {' '}
          Ninjas Locator App
      </NavLink>
     
     
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
              <NavLink className="navlink" to="/addninja">Add a ninja</NavLink>     
          </Nav>
      </Navbar.Collapse>
      
</Navbar>
    )
}

Navibar.propTypes = {

}

export default Navibar

/* <NavLink className="navlink" to="/signup">Signup</NavLink>
<NavLink className="navlink" to="/login">Login</NavLink>
<NavLink className="navlink" to="/ninjas">Ninjas</NavLink>
<NavLink className="navlink" to="/addninja">Add</NavLink>
<NavLink className="navlink" to="/logout">Logout</NavLink> */
