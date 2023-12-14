import axios from "axios";
import React, { useState } from "react";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

import { useSetCurrentUser } from "../../context/CurrentUserContext";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      console.log(data);
      setCurrentUser(data.user);
      console.log(data.user);
      // history.push("/");
      history.push("/set_role");
    } catch (error) {
      console.log(errors);
      setErrors(error.response?.data);
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Log in
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="username">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Username"
                          name="username"
                          value={username}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      {errors.username?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                          {message}
                        </Alert>
                      ))}

                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      {errors.password?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                          {message}
                        </Alert>
                      ))}

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Log In
                        </Button>
                      </div>
                      {errors.non_field_errors?.map((message, idx) => (
                        <Alert variant="warning" key={idx} className="mt-3">
                          {message}
                        </Alert>
                      ))}
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Dont have an account??{" "}
                        <Link to="/signup" className="text-primary fw-bold">
                          Register
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignInForm;
