// import React from "react";
import React, { useEffect, useRef, useState } from "react";
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
import {
  useCurrentUserProfile,
  useSetCurrentUserProfile,
} from "../context/CurrentUserProfileContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { removeTokenTimestamp } from "../utils/utils";
const NavBar = () => {
  console.log("mounting");
  const currentUser = useCurrentUser();
  const currentUserProfile = useCurrentUserProfile();
  const [showLessonIcon, setShowLessonIcon] = useState(false);
  const history = useHistory();

  // navbar toggler
  const [isOpen, setIsOpen] = useState(false);
  // const navMenu = useRef();

  // logout functionality
  const setCurrentUser = useSetCurrentUser();

  const setCurrentUserProfile = useSetCurrentUserProfile();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      setCurrentUserProfile(null);
      removeTokenTimestamp();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // handling clicks to collapse navbar if its clicked inside
    // or outside of it
    const handleMenu = (e) => {
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleMenu);

    // The effect will run whenever currentUserProfile changes
    console.log("navbar useefect");
    console.log("currentUserProfile in navbar:", currentUserProfile);
    if (currentUserProfile && currentUserProfile?.role === "Mentor") {
      // Set state to trigger a re-render and display the addLessonIcon
      setShowLessonIcon(true);
    } else {
      setShowLessonIcon(false);
    }

    return () => {
      document.removeEventListener("mousedown", handleMenu);
    };
  }, [currentUserProfile]);

  console.log(isOpen);

  const addLessonIcon = (
    <NavLink to="/lesson/create" className="text-white mx-5 ">
      <MdPostAdd />
      Add lesson
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink to="/inbox" className="text-white m-2">
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
      <Navbar.Toggle
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
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
      {showLessonIcon && currentUserProfile?.role === "Mentor" && addLessonIcon}
      <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} height={45} alt="logo" />
        </Navbar.Brand>
      </NavLink>
    </Navbar>
  );
};

export default NavBar;
