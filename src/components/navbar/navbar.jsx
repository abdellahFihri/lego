import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/favicon.png';

const navbar=()=>{


    return(
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="">
      <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Abdellah Fihri
    </Navbar.Brand>
  </Navbar>
    )
}
export default navbar;
