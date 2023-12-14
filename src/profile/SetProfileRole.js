import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useCurrentUser } from "../context/CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SetProfileRole = () => {
  const currentUser = useCurrentUser();
  const [currentRole, setCurrentRole] = useState(null);
  // const [newRole, setNewRole] = useState("");
  const history = useHistory();

  const getProfileRole = async () => {
    try {
      const { data } = await axiosRes.get(`/set_role/`);
      console.log(data);
      setCurrentRole(data.role);
    } catch (error) {
      console.log(error);
    }
  };

  const setProfileRole = async (role) => {
    try {
      await axiosReq.put(`/set_role/`, { role });
      setCurrentRole(role);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileRole();
    if (currentRole === null) {
      history.push("/");
    }
  }, [currentRole]);
  return (
    <Container>
      <Button
        className="btn-secondary mx-2"
        onClick={() => setProfileRole("Mentor")}
      >
        Mentor
      </Button>
      <Button className="mx-2" onClick={() => setProfileRole("Student")}>
        Student
      </Button>
    </Container>
  );
};

export default SetProfileRole;
