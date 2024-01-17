import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useCurrentUser } from "../context/CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  useCurrentUserProfile,
  useSetCurrentUserProfile,
} from "../context/CurrentUserProfileContext";
import Asset from "../components/Asset";

const SetProfileRole = () => {
  const currentUser = useCurrentUser();
  const currentUserprofile = useCurrentUserProfile();
  const setCurrentUserProfile = useSetCurrentUserProfile();
  const [isLoading, setIsLoading] = useState(true);

  const [currentRole, setCurrentRole] = useState(null);

  const history = useHistory();

  const getProfileRole = async () => {
    try {
      const { data } = await axiosRes.get(`/set_role/`);
      console.log(data);
      setCurrentRole(data.role);
      setIsLoading(false);
    } catch (error) {
      if (error.response?.status === 403) {
        console.log("user has role");
      } else {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  const setProfileRole = async (role) => {
    try {
      console.log("curr profile before put", currentUserprofile);
      await axiosReq.put(`/set_role/`, {
        role,
      });

      setCurrentRole(role);
      // make another call to update context
      const { data } = await axiosReq(`/profile/${currentUser?.profile_id}`);

      console.log("data after calling profile in set role:", data);
      setCurrentUserProfile(data);

      console.log("curr profile after put", currentUserprofile);

      history.push(`/profile/${currentUser?.profile_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    console.log(currentUserprofile?.role_selected);
    try {
      if (
        currentUserprofile?.role_selected === false ||
        currentUserprofile?.role === undefined
      ) {
        console.log("calling get profile");
        await getProfileRole();
      } else {
        console.log("Role is already set:", currentUserprofile.role);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log("useEffect is running");
    // Ensure that currentUserprofile is not undefined or null
    if (currentUser && currentUserprofile) {
      // Call fetchData function
      fetchData();
    }
    console.log(currentUserprofile?.role_selected);
  }, [currentUserprofile]);

  return (
    <Container>
      {!isLoading && currentUser && currentUserprofile ? (
        <>
          <Button
            className="btn-secondary mx-2"
            onClick={() => setProfileRole("Mentor")}
          >
            Mentor
          </Button>
          <Button className="mx-2" onClick={() => setProfileRole("Student")}>
            Student
          </Button>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default SetProfileRole;
