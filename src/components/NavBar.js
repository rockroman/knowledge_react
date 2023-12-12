import React from 'react'
import  Navbar  from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import logo from '../assets/favicon.png'
import { IoIosChatboxes } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom/';
const NavBar = () => {
  return (
    <Navbar bg="dark" expand="md" fixed='top'>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink to="/" className='text-white m-1 py-1'>Home</NavLink>
        <NavLink to="/signin" className='text-white m-2'>
        <IoMdLogIn /> Log in</NavLink>
        <NavLink to="/signup" className='text-white m-2'>
        <FaUserPlus />Register</NavLink>


        <NavLink to="/lessons" className='text-white m-2'>
        <FaBook />lessons</NavLink>
        <NavLink to="inbox" className='text-white m-2'>
        <IoIosChatboxes />inbox</NavLink>
        <NavLink to="/profile" className='text-white m-2'>
        <FaUserCircle />Profile</NavLink>



      </Nav>

    </Navbar.Collapse>
    <NavLink to="/">
    <Navbar.Brand >
        <img src={logo} height={45} alt='logo'/>
        
    </Navbar.Brand>

    </NavLink>

  </Navbar>
  )
}

export default NavBar