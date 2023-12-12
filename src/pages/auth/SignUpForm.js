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

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      console.log(signUpData);
      history.push("/signin");
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data);
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-3 text-center text-uppercase ">
                    Register
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3 mt-3" controlId="username">
                        <Form.Label className="">username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="username"
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

                      <Form.Group className="mb-3" controlId="password1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password1"
                          value={password1}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      {errors.password1?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                          {message}
                        </Alert>
                      ))}
                      <Form.Group className="mb-3" controlId="password2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm Password"
                          name="password2"
                          value={password2}
                          onChange={handleChange}
                        />
                        {errors.password2?.map((message, idx) => (
                          <Alert variant="warning" key={idx}>
                            {message}
                          </Alert>
                        ))}
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
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
                        Already have an account??{" "}
                        <Link to="/signin" className="text-primary fw-bold">
                          Sign In
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

export default SignUpForm;
