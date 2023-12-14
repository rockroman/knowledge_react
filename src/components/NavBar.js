import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import logo from "../assets/favicon.png";
import { IoIosChatboxes } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom/";
import { MdPostAdd } from "react-icons/md";
import { ImExit } from "react-icons/im";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import { axiosReq } from "../api/axiosDefault";
const NavBar = () => {
  const currentUser = useCurrentUser();

  // logout functionality
  const setCurrentUser = useSetCurrentUser();
  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const addLessonIcon = (
    <NavLink to="/lesson/add" className="text-white mx-5 ">
      <MdPostAdd />
      Add lesson
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink to="inbox" className="text-white m-2">
        <IoIosChatboxes />
        inbox
      </NavLink>
      <NavLink
        to={`/profile/${currentUser?.profile_id}`}
        className="text-white m-2"
      >
        {currentUser?.username}
        <Avatar src={currentUser?.profile_image} text="Profile" height={30} />
      </NavLink>
      <NavLink to="/" className="text-white m-2" onClick={handleSignOut}>
        <ImExit /> Sign out
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink to="/signin" className="text-white m-2">
        <IoMdLogIn /> Log in
      </NavLink>
      <NavLink to="/signup" className="text-white m-2">
        <FaUserPlus />
        Register
      </NavLink>
    </>
  );

  return (
    <Navbar bg="dark" expand="md" fixed="top">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="text-white m-1 py-1">
            Home
          </NavLink>

          <NavLink to="/lessons" className="text-white m-2">
            <FaBook />
            lessons
          </NavLink>

          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Navbar.Collapse>
      {currentUser && addLessonIcon}
      <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} height={45} alt="logo" />
        </Navbar.Brand>
      </NavLink>
    </Navbar>
  );
};

export default NavBar;
